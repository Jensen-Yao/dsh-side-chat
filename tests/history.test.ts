import { describe, expect, it } from 'vitest';
import type { SessionId } from '@deepseek-ai/dsh-session/types';
import { SideChatHistory, parseHistory, type HistoryStorage } from '../src/history.ts';

const id = (value: string) => value as SessionId;
function memory(): HistoryStorage {
  const data = new Map<string, string>();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => { data.set(key, value); } };
}

describe('side chat history', () => {
  it('restores each native tab independently without storing message text', () => {
    const storage = memory();
    const history = new SideChatHistory(storage);
    history.select(id('main'), 'tab1', id('chat1'));
    history.select(id('main'), 'tab2', id('chat2'));
    const restored = new SideChatHistory(storage);
    expect(restored.selected(id('main'), 'tab1')).toBe('chat1');
    expect(restored.selected(id('main'), 'tab2')).toBe('chat2');
    expect(restored.getSnapshot().entries).toHaveLength(2);
    expect(Object.keys(restored.getSnapshot().entries[0])).toEqual(['id', 'parentId', 'createdAt', 'pinned']);
  });
  it('merges preceding writes from another window', () => {
    const storage = memory();
    const a = new SideChatHistory(storage);
    const b = new SideChatHistory(storage);
    a.select(id('main'), 'a', id('chat1'));
    b.select(id('main'), 'b', id('chat2'));
    a.reload();
    expect(a.getSnapshot().entries.map((entry) => entry.id)).toEqual(['chat2', 'chat1']);
  });
  it('pins and removes only navigation metadata', () => {
    const history = new SideChatHistory(memory());
    history.select(id('main'), 'tab', id('chat'));
    history.pin(id('chat'));
    expect(history.getSnapshot().entries[0].pinned).toBe(true);
    history.forget(id('chat'));
    expect(history.getSnapshot().entries).toEqual([]);
    expect(history.selected(id('main'), 'tab')).toBeUndefined();
  });
  it('keeps in-memory navigation and exposes denied storage', () => {
    const history = new SideChatHistory({ getItem: () => null, setItem: () => { throw new Error('quota'); } });
    history.select(id('main'), 'tab', id('chat'));
    expect(history.selected(id('main'), 'tab')).toBe('chat');
    expect(history.getSnapshot().warning).toContain('quota');
    history.select(id('main'), 'tab2', id('chat2'));
    history.reload();
    expect(history.getSnapshot().entries).toHaveLength(2);
    expect(history.selected(id('main'), 'tab')).toBe('chat');
  });
  it('rejects unknown versions and invalid persisted identities', () => {
    expect(() => parseHistory('{"version":2,"entries":[],"selected":{}}')).toThrow();
    expect(() => parseHistory('{"version":1,"entries":[{"id":3}],"selected":{}}')).toThrow();
    const history = new SideChatHistory({ getItem: () => '{broken', setItem: () => {} });
    expect(history.getSnapshot().warning).toContain('历史索引');
  });
  it('notifies with stable snapshots and removes subscriptions', () => {
    const history = new SideChatHistory(memory());
    const initial = history.getSnapshot();
    expect(history.getSnapshot()).toBe(initial);
    let count = 0;
    const dispose = history.subscribe(() => count++);
    history.select(id('main'), 'tab', id('chat'));
    dispose();
    history.pin(id('chat'));
    expect(count).toBe(1);
  });
});
