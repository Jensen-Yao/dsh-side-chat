// src/index.ts
import { randomUUID } from "node:crypto";
import { brandString } from "@deepseek-ai/dsh-brand";
import { defineTool } from "@deepseek-ai/dsh-tools";
var validId = (value) => typeof value === "string" && value.length > 0 && value.length <= 512;
async function apply(ctx) {
  const links = /* @__PURE__ */ new Map();
  const route = {
    path: "/api/side-chat/link",
    methods: ["POST"],
    requestBody: "buffered",
    fetch: async (request) => {
      try {
        const body = await request.json();
        if (!body || typeof body !== "object" || !("parentSessionId" in body) || !("sideSessionId" in body) || !validId(body.parentSessionId) || !validId(body.sideSessionId) || body.parentSessionId === body.sideSessionId) {
          return Response.json({ error: "invalid-side-chat-link" }, { status: 400 });
        }
        const previous = links.get(body.sideSessionId);
        previous?.disposeTool?.();
        const resolved = await ctx.sessionController.resolveAgent(body.sideSessionId);
        if ("error" in resolved) {
          return Response.json({ error: resolved.error.code }, { status: 409 });
        }
        const scoped = resolved.agent.ctx;
        if (scoped?.tools === void 0) {
          return Response.json({ error: "side-chat-agent-context-unavailable" }, { status: 409 });
        }
        const side = body.sideSessionId;
        const parent = body.parentSessionId;
        const disposeTool = scoped.tools.register(defineTool({
          name: "side_chat_report",
          description: "Send one concise handoff summary to the main conversation that opened this side chat. Call this tool only when the user explicitly asks you to report, hand off, or tell the main conversation what was done. Never call it automatically or for routine progress.",
          parameters: {
            summary: {
              type: "string",
              required: true,
              description: "Self-contained handoff summary for the main conversation: outcome, important changes, blockers, and the next action when useful."
            }
          },
          output: {
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                sent: { type: "boolean", required: true },
                parentSessionId: { type: "string", required: true }
              }
            },
            render: (_args, value) => [{
              type: "text",
              text: value.sent ? `\u5DF2\u6309\u7528\u6237\u6307\u793A\u628A\u4FA7\u8FB9\u804A\u5929\u4EA4\u63A5\u6458\u8981\u53D1\u9001\u5230\u4E3B\u5BF9\u8BDD ${value.parentSessionId}\u3002` : "\u4EA4\u63A5\u6458\u8981\u5C1A\u672A\u53D1\u9001\u3002"
            }]
          },
          timeoutMs: 3e4,
          isConcurrencySafe: () => false,
          async execute(args, exec) {
            const summary = args.summary.trim();
            if (!summary || summary.length > 2e4) throw new Error("side_chat_report: summary must contain 1-20000 characters");
            if (exec.agent?.id !== side) throw new Error("side_chat_report: this tool belongs to another side chat");
            const prompt = {
              requestId: brandString(`dsh-side-chat:${randomUUID()}`),
              sessionId: parent,
              mode: "queue",
              content: [{
                type: "text",
                text: `[Side Chat handoff]
${summary}

This note was sent because the user explicitly requested handoff from side chat ${side}.`
              }],
              clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };
            const accepted = await ctx.sessionController.prompt(prompt, exec.signal);
            if (!accepted.accepted) throw new Error("side_chat_report: the main conversation rejected the handoff");
            return { sent: true, parentSessionId: parent };
          }
        }));
        links.set(side, { parent, disposeTool });
        return Response.json({ linked: true, sideSessionId: side, parentSessionId: parent });
      } catch (error) {
        return Response.json({ error: String(error) }, { status: 500 });
      }
    }
  };
  const disposeRoute = await ctx.connection.fetch.register(route);
  ctx.effect(() => () => {
    void disposeRoute();
    for (const link of links.values()) link.disposeTool?.();
    links.clear();
  });
}
var inject = ["connection", "sessionController"];
export {
  apply,
  inject
};
