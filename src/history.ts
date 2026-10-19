import type { SessionId } from '@deepseek-ai/dsh-session/types';

/** Only navigation metadata is stored here; messages remain in official DSH session logs. */
export interface HistoryEntry {
  id: SessionId;
  parentId: SessionId;
  createdAt: number;
  pinned: boolean;
}

interface HistoryState {
  version: 1;
  entries: HistoryEntry[];
  selected: Record<string, SessionId>;
  warning?: string;
}

export interface HistoryStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const KEY = 'dsh-side-chat.history.v1';
const empty = (): HistoryState => ({ version: 1, entries: [], selected: {} });
const validId = (value: unknown): value is SessionId => typeof value === 'string' && value.length > 0 && value.length <= 512;

/** Validate browser persistence without trusting stored session identities or object properties. */
export function parseHistory(raw: string | null): HistoryState {
  if (raw === null) return empty();
  const data: unknown = JSON.parse(raw);
  if (!data || typeof data !== 'object' || !('version' in data) || data.version !== 1 ||
      !('entries' in data) || !Array.isArray(data.entries) || !('selected' in data) ||
      !data.selected || typeof data.selected !== 'object' || Array.isArray(data.selected)) {
    throw new Error('会话历史索引格式不受支持');
  }
  const entries: HistoryEntry[] = [];
  for (const item of data.entries) {
    if (!item || typeof item !== 'object' || !validId(item.id) || !validId(item.parentId) ||
        typeof item.createdAt !== 'number' || !Number.isFinite(item.createdAt) || typeof item.pinned !== 'boolean') {
      throw new Error('会话历史索引包含无效记录');
    }
    if (!entries.some((entry) => entry.id === item.id)) entries.push({
      id: item.id, parentId: item.parentId, createdAt: item.createdAt, pinned: item.pinned,
    });
  }
  const selected: Record<string, SessionId> = Object.create(null);
  for (const [key, id] of Object.entries(data.selected)) {
    if (validId(id) && entries.some((entry) => entry.id === id)) selected[key] = id;
  }
  return { version: 1, entries, selected };
}

/** Stable observable navigation index with explicit persistence failures and no transcript cache. */
export class SideChatHistory {
  private state: HistoryState;
  private listeners = new Set<() => void>();
  private unsaved = false;
  constructor(private storage?: HistoryStorage) {
    this.state = this.read();
  }
  getSnapshot = (): HistoryState => this.state;
  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  private read(): HistoryState {
    try {
      return parseHistory(this.storage?.getItem(KEY) ?? null);
    } catch (error) {
      return { ...empty(), warning: `历史索引暂不可用：${String(error)}。聊天记录仍保存在 DSH 中。` };
    }
  }
  reload = (): void => {
    if (this.unsaved) return;
    this.state = this.read();
    this.publish();
  };
  private publish(): void {
    for (const listener of this.listeners) listener();
  }
  private update(change: (state: HistoryState) => HistoryState): void {
    // Read before each mutation so another browser tab's navigation is not overwritten by a stale snapshot.
    const base = this.storage && !this.unsaved ? this.read() : this.state;
    this.state = change(base.warning ? this.state : base);
    try {
      if (!this.storage) throw new Error('浏览器存储不可用');
      const { warning: _warning, ...persisted } = this.state;
      this.storage.setItem(KEY, JSON.stringify(persisted));
      this.unsaved = false;
      this.state = persisted;
    } catch (error) {
      this.unsaved = true;
      this.state = { ...this.state, warning: `未能保存侧边聊天索引：${String(error)}。刷新后可能无法自动恢复，DSH 聊天记录不受影响。` };
    }
    this.publish();
  }
  selected(parentId: SessionId, contentId: string): SessionId | undefined {
    return this.state.selected[JSON.stringify([parentId, contentId])];
  }
  select(parentId: SessionId, contentId: string, id: SessionId): void {
    this.update((state) => ({
      ...state,
      entries: state.entries.some((entry) => entry.id === id) ? state.entries : [
        { id, parentId, createdAt: Date.now(), pinned: false }, ...state.entries,
      ],
      selected: { ...state.selected, [JSON.stringify([parentId, contentId])]: id },
    }));
  }
  pin(id: SessionId): void {
    this.update((state) => ({ ...state, entries: state.entries.map((entry) => entry.id === id ? { ...entry, pinned: !entry.pinned } : entry) }));
  }
  forget(id: SessionId): void {
    this.update((state) => ({
      ...state, entries: state.entries.filter((entry) => entry.id !== id),
      selected: Object.fromEntries(Object.entries(state.selected).filter(([, value]) => value !== id)),
    }));
  }
}
