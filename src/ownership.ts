import type { ISessions } from '@deepseek-ai/dsh-api-session-controller/client';
import type { SessionId } from '@deepseek-ai/dsh-session/types';
import type { SideChatHistory } from './history.ts';

/** Deduplicate blank-session creation during React remounts and keep late completions recoverable. */
export class SideChatCreator {
  private pending = new Map<string, Promise<SessionId>>();
  constructor(private sessions: ISessions, private history: SideChatHistory) {}
  open(parentId: SessionId, contentId: string): Promise<SessionId> {
    const existing = this.history.selected(parentId, contentId);
    if (existing) return Promise.resolve(existing);
    const key = JSON.stringify([parentId, contentId]);
    const pending = this.pending.get(key);
    if (pending) return pending;
    const task = this.create(parentId, contentId).finally(() => this.pending.delete(key));
    this.pending.set(key, task);
    return task;
  }
  async create(parentId: SessionId, contentId: string, fork = false): Promise<SessionId> {
    const cwd = this.sessions.list.getSnapshot().byId[parentId]?.cwd;
    const id = fork
      ? await this.sessions.fork({ sessionId: parentId })
      : await this.sessions.create(cwd ? { cwd } : undefined);
    this.history.select(parentId, contentId, id);
    return id;
  }
}
