import { describe, expect, it, vi } from 'vitest';
import type { ISessions } from '@deepseek-ai/dsh-api-session-controller/client';
import type { SessionId } from '@deepseek-ai/dsh-session/types';
import { SideChatHistory } from '../src/history.ts';
import { SideChatCreator } from '../src/ownership.ts';

const id = (value: string) => value as SessionId;
function fixture(create: () => Promise<SessionId>) {
  const history = new SideChatHistory();
  const fork = vi.fn(async () => id('fork'));
  // Only the creator's catalog/create/fork operations participate in this fixture.
  const sessions = { list: { getSnapshot: () => ({ byId: { main: { cwd: 'F:/work' } } }) }, create: vi.fn(create), fork } as unknown as ISessions;
  return { history, sessions, creator: new SideChatCreator(sessions, history), fork };
}
describe('independent side session creation', () => {
  it('deduplicates an initial tab acquisition across remounts', async () => {
    let finish!: (value: SessionId) => void;
    const { creator, sessions, history } = fixture(() => new Promise((resolve) => { finish = resolve; }));
    const first = creator.open(id('main'), 'tab');
    const second = creator.open(id('main'), 'tab');
    expect(first).toBe(second);
    finish(id('chat'));
    await first;
    expect(sessions.create).toHaveBeenCalledTimes(1);
    expect(sessions.create).toHaveBeenCalledWith({ cwd: 'F:/work' });
    expect(history.selected(id('main'), 'tab')).toBe('chat');
    expect(await creator.open(id('main'), 'tab')).toBe('chat');
  });
  it('retries creation after a failed request', async () => {
    let tries = 0;
    const { creator } = fixture(async () => { if (++tries === 1) throw new Error('offline'); return id('chat'); });
    await expect(creator.open(id('main'), 'tab')).rejects.toThrow('offline');
    await expect(creator.open(id('main'), 'tab')).resolves.toBe('chat');
  });
  it('forks main context only for an explicit fork request', async () => {
    const { creator, fork, sessions } = fixture(async () => id('chat'));
    await creator.create(id('main'), 'first');
    expect(fork).not.toHaveBeenCalled();
    await creator.create(id('main'), 'second', true);
    expect(fork).toHaveBeenCalledWith({ sessionId: 'main' });
    expect(sessions.create).toHaveBeenCalledTimes(1);
  });
});
