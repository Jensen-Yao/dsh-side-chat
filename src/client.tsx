import type { Context } from '@deepseek-ai/cordis';
import type { ISessions, SessionReference } from '@deepseek-ai/dsh-api-session-controller/client';
import type { SessionId } from '@deepseek-ai/dsh-session/types';
import type { IconProps } from '@deepseek-ai/dsh-client-ui-primitives';
import type { PropsRuntime, PropsRenderSlots, PropsRenderFactories } from '@deepseek-ai/dsh-client-ui-slots';
import type {} from '@deepseek-ai/dsh-client-ui-sidebar-right/client';
import type { ConversationViewsProps } from '@deepseek-ai/dsh-client-ui-conversation/client';
import type {} from '@deepseek-ai/dsh-client-ui-session/client';
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client';
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { MessageCirclePlus, Plus, History, GitFork, Pin, PinOff, X, Pencil, Check, Search, RotateCw, LoaderCircle } from 'lucide-react';
import { SideChatHistory } from './history.ts';
import { SideChatCreator } from './ownership.ts';
import css from './styles.css';

declare module '@deepseek-ai/dsh-api-session-controller/client' {
  interface SessionReferenceSourceMap { sideChat: unknown; }
}
declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface SlotMap {
    'dsh.sideChat.content': { kind: 'single'; scope: 'session' };
  }
}

interface Services { sessions: ISessions; history: SideChatHistory; creator: SideChatCreator }
type TabProps = PropsRuntime<'sidebar.right.pane.tab'> & PropsRenderSlots<'dsh.sideChat.content'> & Services;
type ContentProps = PropsRuntime<'dsh.sideChat.content'> & PropsRenderFactories;
type TitleProps = PropsRuntime<'sidebar.right.pane.tab.title'> & Pick<Services, 'history'>;
const ID = 'dsh-side-chat';
const GuideIcon = (props: IconProps) => <MessageCirclePlus {...props} />;

function IconButton({ label, children, onClick, disabled, active }: {
  label: string; children: ReactNode; onClick: () => void; disabled?: boolean; active?: boolean;
}) {
  return <button className="dsc-icon" type="button" title={label} aria-label={label}
    aria-pressed={active} onClick={onClick} disabled={disabled}>{children}</button>;
}

/** Render the public native content factory under the independently retained session, never the main view's selection. */
function SideChatContent({ renderFactorySlot }: ContentProps) {
  return <div className="dsc-content">{renderFactorySlot('conversation.content', {
    variant: 'embedded', phase: 'active', hero: false,
  }, { slots: { views: SideChatViews }, fallback: <div className="dsc-state" role="alert">当前 DSH 尚未提供可嵌入的聊天界面，请使用 0.2.1-rc.2 或更新版本。</div> })}</div>;
}

function SideChatViews({ useSession, renderSlot }: ConversationViewsProps) {
  const blank = useSession((session) => session.blank && !session.promptAttempted && !session.running);
  return <div className="dsc-views">{blank && <div className="dsc-empty"><MessageCirclePlus size={32} strokeWidth={1.5} aria-hidden="true" /><h2>侧边聊天</h2></div>}
    {renderSlot('conversation.session', {})}</div>;
}

function SideChatTitle({ sessionId, useTabInfo, useSessions, history }: TitleProps) {
  const { tab } = useTabInfo();
  useSyncExternalStore(history.subscribe, history.getSnapshot);
  const id = history.selected(sessionId, tab.contentId);
  const summary = useSessions((state) => id === undefined ? undefined : state.byId[id]);
  return <>{summary && !summary.blank ? summary.displayTitle : '侧边聊天'}</>;
}

/** Each keyed mount owns one immutable reference; an old provider unmounts before its reference is released. */
function RetainedConversation({ id, sessions, SessionProvider, renderSlot, onReady, onError }: {
  id: SessionId;
  onReady: (id: SessionId) => void;
  onError: (message: string) => void;
} & Pick<TabProps, 'sessions' | 'SessionProvider' | 'renderSlot'>) {
  const [reference, setReference] = useState<SessionReference>();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let disposed = false;
    let owned: SessionReference | undefined;
    const fail = (cause: unknown) => {
      if (!disposed) { setFailed(true); onError(String(cause)); }
    };
    try {
      owned = sessions.retain(id, { source: 'sideChat' });
      const handle = owned;
      handle.ready.then(() => {
        if (disposed) return;
        const snapshot = handle.binding.session.getSnapshot();
        if (snapshot.openState === 'error') throw new Error(snapshot.openError?.message ?? '无法读取会话记录');
        setReference(handle);
        onReady(id);
      }).catch(fail);
    } catch (cause) { fail(cause); }
    return () => { disposed = true; owned?.release(); };
  }, [id, sessions, onReady, onError]);
  if (failed) return null;
  return reference ? <SessionProvider session={reference}>{renderSlot('dsh.sideChat.content', {})}</SessionProvider>
    : <div className="dsc-state" role="status"><LoaderCircle className="dsc-spin" size={20} />正在打开聊天…</div>;
}

function SideChatBody(props: TabProps) {
  const { sessionId: parentId, sessions, history, creator, SessionProvider, renderSlot, useTabInfo, useSessions } = props;
  const { tab } = useTabInfo();
  const catalog = useSessions((state) => state);
  const navigation = useSyncExternalStore(history.subscribe, history.getSnapshot);
  const [id, setId] = useState<SessionId | undefined>(() => history.selected(parentId, tab.contentId));
  const [readyId, setReadyId] = useState<SessionId>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [historyOpen, setHistoryOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [rename, setRename] = useState(false);
  const [title, setTitle] = useState('');
  const [attempt, setAttempt] = useState(0);
  const alive = useRef(true);
  const operation = useRef(0);
  const current = id === undefined ? undefined : catalog.byId[id];
  const displayTitle = current?.blank ? '新聊天' : current?.displayTitle ?? '侧边聊天';

  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; operation.current++; };
  }, []);

  useEffect(() => {
    let disposed = false;
    setError('');
    if (id) return;
    setBusy(true);
    creator.open(parentId, tab.contentId).then((created) => {
      if (!disposed) setId(created);
    }).catch((cause: unknown) => {
      if (!disposed) setError(String(cause));
    }).finally(() => { if (!disposed) setBusy(false); });
    return () => { disposed = true; };
  }, [creator, parentId, tab.contentId, id, attempt]);

  async function create(fork = false) {
    if (busy) return;
    const ticket = ++operation.current;
    setBusy(true);
    setError('');
    try {
      const created = await creator.create(parentId, tab.contentId, fork);
      if (alive.current && ticket === operation.current) { setId(created); setHistoryOpen(false); setRename(false); }
    } catch (cause) {
      if (alive.current && ticket === operation.current) setError(String(cause));
    } finally {
      if (alive.current && ticket === operation.current) setBusy(false);
    }
  }

  function select(next: SessionId) {
    operation.current++;
    history.select(parentId, tab.contentId, next);
    setId(next);
    setHistoryOpen(false);
    setRename(false);
    setError('');
  }

  async function saveTitle() {
    if (!id || readyId !== id || !title.trim() || busy) return;
    setBusy(true);
    try {
      const result = await sessions.using(id, { source: 'sideChat' }, async (reference) => {
        await reference.ready;
        return reference.binding.session.rename(title.trim());
      });
      if (!result.ok) throw new Error(result.error.message);
      if (alive.current) setRename(false);
    } catch (cause) {
      if (alive.current) setError(String(cause));
    } finally { if (alive.current) setBusy(false); }
  }

  const entries = [...navigation.entries].filter((entry) => {
    const summary = catalog.byId[entry.id];
    return !query || `${summary?.displayTitle ?? ''} ${summary?.cwd ?? ''}`.toLocaleLowerCase().includes(query.toLocaleLowerCase());
  }).sort((a, b) => Number(b.pinned) - Number(a.pinned) ||
    (catalog.byId[b.id]?.updatedAt ?? b.createdAt) - (catalog.byId[a.id]?.updatedAt ?? a.createdAt));

  return <section className="dsc-root" aria-label="侧边聊天">
    <header className="dsc-toolbar">
      <MessageCirclePlus size={17} className="dsc-mark" aria-hidden="true" />
      <div className="dsc-heading"><span title={displayTitle}>{displayTitle}</span>
        <small><i data-running={current?.running || undefined} />{current?.running ? '正在运行' : '独立会话'}</small></div>
      <div className="dsc-tools">
        <IconButton label="重命名聊天" disabled={readyId !== id || !id || busy} onClick={() => { setTitle(current?.title ?? ''); setRename(!rename); }}><Pencil size={15} /></IconButton>
        <IconButton label="从主聊天分支（复制已完成的上下文）" disabled={busy} onClick={() => void create(true)}><GitFork size={16} /></IconButton>
        <IconButton label="会话历史" active={historyOpen} onClick={() => setHistoryOpen(!historyOpen)}><History size={17} /></IconButton>
        <IconButton label="新建侧边聊天" disabled={busy} onClick={() => void create()}><Plus size={19} /></IconButton>
      </div>
    </header>
    {rename && <form className="dsc-rename" onSubmit={(event) => { event.preventDefault(); void saveTitle(); }}>
      <input aria-label="聊天名称" autoFocus value={title} maxLength={200} placeholder="聊天名称" onChange={(event) => setTitle(event.target.value)}
        onKeyDown={(event) => { if (event.key === 'Escape') setRename(false); }} />
      <IconButton label="保存名称" disabled={!title.trim() || busy} onClick={() => void saveTitle()}><Check size={17} /></IconButton>
      <IconButton label="取消重命名" onClick={() => setRename(false)}><X size={17} /></IconButton>
    </form>}
    {navigation.warning && <div className="dsc-notice" role="status">{navigation.warning}</div>}
    {error && <div className="dsc-error" role="alert"><span>{error}</span>
      <IconButton label="重试打开聊天" onClick={() => setAttempt((n) => n + 1)}><RotateCw size={16} /></IconButton></div>}
    {historyOpen && <div className="dsc-history">
      <div className="dsc-history-title"><strong>侧边聊天记录</strong><span>{entries.length}</span>
        <IconButton label="关闭历史" onClick={() => setHistoryOpen(false)}><X size={17} /></IconButton></div>
      <label className="dsc-search"><Search size={16} /><input autoFocus placeholder="搜索聊天" aria-label="搜索聊天" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <div className="dsc-history-list">{entries.length === 0 ? <div className="dsc-state">没有匹配的聊天</div> : entries.map((entry) => {
        const summary = catalog.byId[entry.id];
        return <div key={entry.id} className="dsc-history-row" data-selected={entry.id === id || undefined}>
          <button className="dsc-history-pick" type="button" disabled={busy} onClick={() => select(entry.id)} aria-current={entry.id === id ? 'true' : undefined}>
            <span>{summary?.blank ? '新聊天' : summary?.displayTitle ?? '未载入的聊天'}{summary?.running && <i className="dsc-running" aria-label="正在运行" />}</span>
            <small title={summary?.cwd}>{summary?.cwd ?? 'DSH 会话'} · {new Date(summary?.updatedAt ?? entry.createdAt).toLocaleDateString()}</small>
          </button>
          <IconButton label={entry.pinned ? '取消置顶' : '置顶聊天'} onClick={() => history.pin(entry.id)}>{entry.pinned ? <PinOff size={15} /> : <Pin size={15} />}</IconButton>
          <IconButton label="仅从侧边历史移除，不删除聊天记录" disabled={entry.id === id} onClick={() => history.forget(entry.id)}><X size={15} /></IconButton>
        </div>;
      })}</div>
    </div>}
    <div className="dsc-chat-host" hidden={historyOpen}>{id ? <RetainedConversation key={`${id}:${attempt}`} id={id} sessions={sessions}
      SessionProvider={SessionProvider} renderSlot={renderSlot} onReady={setReadyId} onError={setError} />
      : !error && <div className="dsc-state" role="status"><LoaderCircle className="dsc-spin" size={20} />正在打开聊天…</div>}</div>
  </section>;
}

/** Register native sidebar navigation and an independently scoped conversation without touching core UI or global selection. */
export function apply(ctx: Context): void {
  let storage: Storage | undefined;
  try { storage = window.localStorage; } catch { /* Browser policy may deny storage; history exposes a persistence notice on first write. */ }
  const history = new SideChatHistory(storage);
  const creator = new SideChatCreator(ctx.sessions, history);
  ctx.effect(() => {
    const style = document.createElement('style');
    style.dataset.plugin = ID;
    style.textContent = css;
    document.head.appendChild(style);
    const reload = (event: StorageEvent) => { if (event.storageArea === storage) history.reload(); };
    window.addEventListener('storage', reload);
    return () => { style.remove(); window.removeEventListener('storage', reload); };
  });
  ctx.effect(() => ctx.sidebarRightTabs.register({
    id: ID, kind: ID, multiple: true, keepMounted: true, title: () => '侧边聊天',
    guide: [{ id: 'new', order: -20, title: () => '侧边聊天',
      description: () => '独立聊天', icon: GuideIcon }],
  }));
  ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab', () => ctx.slots.register({
    name: 'sidebar.right.pane.tab', key: ID,
    children: { 'dsh.sideChat.content': { kind: 'single', scope: 'session' } },
    inject: () => ({ sessions: ctx.sessions, history, creator }),
  }, SideChatBody)));
  ctx.effect(() => ctx.slots.inject('dsh.sideChat.content', () => ctx.slots.register({
    name: 'dsh.sideChat.content',
  }, SideChatContent)));
  ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab.title', () => ctx.slots.register({
    name: 'sidebar.right.pane.tab.title', key: ID, inject: () => ({ history }),
  }, SideChatTitle)));
}

export const inject = ['slots', 'sidebarRightTabs', 'sessions', 'uiSession', 'conversation'];
