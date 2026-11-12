import { randomUUID } from 'node:crypto';
import type { Context } from '@deepseek-ai/cordis';
import type { ConnectionFetchRoute } from '@deepseek-ai/dsh-client-connection';
import type { SessionController, SessionPromptRequest, SessionRequestId } from '@deepseek-ai/dsh-api-session-controller';
import type { SessionId } from '@deepseek-ai/dsh-session/types';
import { brandString } from '@deepseek-ai/dsh-brand';
import { defineTool } from '@deepseek-ai/dsh-tools';

interface LinkedAgent {
  ctx?: Context;
}

interface SideChatLink {
  parent: SessionId;
  disposeTool?: () => void;
}

const validId = (value: unknown): value is SessionId => typeof value === 'string' &&
  value.length > 0 && value.length <= 512;

/** Host owns only explicit handoff: ordinary side-chat turns never write to the parent conversation. */
export async function apply(ctx: Context): Promise<void> {
  const links = new Map<SessionId, SideChatLink>();
  const route: ConnectionFetchRoute = {
    path: '/api/side-chat/link',
    methods: ['POST'],
    requestBody: 'buffered',
    fetch: async (request) => {
      try {
        const body: unknown = await request.json();
        if (!body || typeof body !== 'object' || !('parentSessionId' in body) || !('sideSessionId' in body) ||
            !validId(body.parentSessionId) || !validId(body.sideSessionId) ||
            body.parentSessionId === body.sideSessionId) {
          return Response.json({ error: 'invalid-side-chat-link' }, { status: 400 });
        }

        const previous = links.get(body.sideSessionId);
        previous?.disposeTool?.();
        const resolved = await ctx.sessionController.resolveAgent(body.sideSessionId);
        if ('error' in resolved) {
          return Response.json({ error: resolved.error.code }, { status: 409 });
        }

        const scoped = (resolved.agent as LinkedAgent).ctx;
        if (scoped?.tools === undefined) {
          return Response.json({ error: 'side-chat-agent-context-unavailable' }, { status: 409 });
        }

        const side = body.sideSessionId;
        const parent = body.parentSessionId;
        const disposeTool = scoped.tools.register(defineTool({
          name: 'side_chat_report',
          description: 'Send one concise handoff summary to the main conversation that opened this side chat. Call this tool only when the user explicitly asks you to report, hand off, or tell the main conversation what was done. Never call it automatically or for routine progress.',
          parameters: {
            summary: {
              type: 'string',
              required: true,
              description: 'Self-contained handoff summary for the main conversation: outcome, important changes, blockers, and the next action when useful.',
            },
          },
          output: {
            schema: {
              type: 'object',
              additionalProperties: false,
              properties: {
                sent: { type: 'boolean', required: true },
                parentSessionId: { type: 'string', required: true },
              },
            },
            render: (_args, value) => [{
              type: 'text',
              text: value.sent
                ? `已按用户指示把侧边聊天交接摘要发送到主对话 ${value.parentSessionId}。`
                : '交接摘要尚未发送。',
            }],
          },
          timeoutMs: 30_000,
          isConcurrencySafe: () => false,
          async execute(args, exec) {
            const summary = args.summary.trim();
            if (!summary || summary.length > 20_000) throw new Error('side_chat_report: summary must contain 1-20000 characters');
            if (exec.agent?.id !== side) throw new Error('side_chat_report: this tool belongs to another side chat');
            const prompt: SessionPromptRequest = {
              requestId: brandString<SessionRequestId>(`dsh-side-chat:${randomUUID()}`),
              sessionId: parent,
              mode: 'queue',
              content: [{
                type: 'text',
                text: `[Side Chat handoff]\n${summary}\n\nThis note was sent because the user explicitly requested handoff from side chat ${side}.`,
              }],
              clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            };
            const accepted = await ctx.sessionController.prompt(prompt, exec.signal);
            if (!accepted.accepted) throw new Error('side_chat_report: the main conversation rejected the handoff');
            return { sent: true, parentSessionId: parent };
          },
        }));
        links.set(side, { parent, disposeTool });
        return Response.json({ linked: true, sideSessionId: side, parentSessionId: parent });
      } catch (error) {
        return Response.json({ error: String(error) }, { status: 500 });
      }
    },
  };

  const disposeRoute = await ctx.connection.fetch.register(route);
  ctx.effect(() => () => {
    void disposeRoute();
    for (const link of links.values()) link.disposeTool?.();
    links.clear();
  });
}

export const inject = ['connection', 'sessionController'];
