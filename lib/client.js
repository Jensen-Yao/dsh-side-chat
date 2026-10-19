window.__ModuleLoader__.load({id:"dsh-side-chat",factory:(require)=>{var module={exports:{}};var exports=module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.tsx
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(client_exports);
var import_react3 = require("react");

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var import_react2 = require("react");

// node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// node_modules/lucide-react/dist/esm/Icon.js
var import_react = require("react");

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/Icon.js
var Icon = (0, import_react.forwardRef)(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return (0, import_react.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component = (0, import_react2.forwardRef)(
    ({ className, ...props }, ref) => (0, import_react2.createElement)(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};

// node_modules/lucide-react/dist/esm/icons/check.js
var Check = createLucideIcon("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);

// node_modules/lucide-react/dist/esm/icons/git-fork.js
var GitFork = createLucideIcon("GitFork", [
  ["circle", { cx: "12", cy: "18", r: "3", key: "1mpf1b" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["path", { d: "M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9", key: "1uq4wg" }],
  ["path", { d: "M12 12v3", key: "158kv8" }]
]);

// node_modules/lucide-react/dist/esm/icons/history.js
var History = createLucideIcon("History", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
]);

// node_modules/lucide-react/dist/esm/icons/loader-circle.js
var LoaderCircle = createLucideIcon("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);

// node_modules/lucide-react/dist/esm/icons/message-circle-plus.js
var MessageCirclePlus = createLucideIcon("MessageCirclePlus", [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
]);

// node_modules/lucide-react/dist/esm/icons/pencil.js
var Pencil = createLucideIcon("Pencil", [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
]);

// node_modules/lucide-react/dist/esm/icons/pin-off.js
var PinOff = createLucideIcon("PinOff", [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  ["path", { d: "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89", key: "znwnzq" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11",
      key: "c9qhm2"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/pin.js
var Pin = createLucideIcon("Pin", [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  [
    "path",
    {
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
      key: "1nkz8b"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/plus.js
var Plus = createLucideIcon("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);

// node_modules/lucide-react/dist/esm/icons/rotate-cw.js
var RotateCw = createLucideIcon("RotateCw", [
  ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }]
]);

// node_modules/lucide-react/dist/esm/icons/search.js
var Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);

// node_modules/lucide-react/dist/esm/icons/x.js
var X = createLucideIcon("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);

// src/history.ts
var KEY = "dsh-side-chat.history.v1";
var empty = () => ({ version: 1, entries: [], selected: {} });
var validId = (value) => typeof value === "string" && value.length > 0 && value.length <= 512;
function parseHistory(raw) {
  if (raw === null) return empty();
  const data = JSON.parse(raw);
  if (!data || typeof data !== "object" || !("version" in data) || data.version !== 1 || !("entries" in data) || !Array.isArray(data.entries) || !("selected" in data) || !data.selected || typeof data.selected !== "object" || Array.isArray(data.selected)) {
    throw new Error("\u4F1A\u8BDD\u5386\u53F2\u7D22\u5F15\u683C\u5F0F\u4E0D\u53D7\u652F\u6301");
  }
  const entries = [];
  for (const item of data.entries) {
    if (!item || typeof item !== "object" || !validId(item.id) || !validId(item.parentId) || typeof item.createdAt !== "number" || !Number.isFinite(item.createdAt) || typeof item.pinned !== "boolean") {
      throw new Error("\u4F1A\u8BDD\u5386\u53F2\u7D22\u5F15\u5305\u542B\u65E0\u6548\u8BB0\u5F55");
    }
    if (!entries.some((entry) => entry.id === item.id)) entries.push({
      id: item.id,
      parentId: item.parentId,
      createdAt: item.createdAt,
      pinned: item.pinned
    });
  }
  const selected = /* @__PURE__ */ Object.create(null);
  for (const [key, id] of Object.entries(data.selected)) {
    if (validId(id) && entries.some((entry) => entry.id === id)) selected[key] = id;
  }
  return { version: 1, entries, selected };
}
var SideChatHistory = class {
  constructor(storage) {
    this.storage = storage;
    this.state = this.read();
  }
  state;
  listeners = /* @__PURE__ */ new Set();
  unsaved = false;
  getSnapshot = () => this.state;
  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  read() {
    try {
      return parseHistory(this.storage?.getItem(KEY) ?? null);
    } catch (error) {
      return { ...empty(), warning: `\u5386\u53F2\u7D22\u5F15\u6682\u4E0D\u53EF\u7528\uFF1A${String(error)}\u3002\u804A\u5929\u8BB0\u5F55\u4ECD\u4FDD\u5B58\u5728 DSH \u4E2D\u3002` };
    }
  }
  reload = () => {
    if (this.unsaved) return;
    this.state = this.read();
    this.publish();
  };
  publish() {
    for (const listener of this.listeners) listener();
  }
  update(change) {
    const base = this.storage && !this.unsaved ? this.read() : this.state;
    this.state = change(base.warning ? this.state : base);
    try {
      if (!this.storage) throw new Error("\u6D4F\u89C8\u5668\u5B58\u50A8\u4E0D\u53EF\u7528");
      const { warning: _warning, ...persisted } = this.state;
      this.storage.setItem(KEY, JSON.stringify(persisted));
      this.unsaved = false;
      this.state = persisted;
    } catch (error) {
      this.unsaved = true;
      this.state = { ...this.state, warning: `\u672A\u80FD\u4FDD\u5B58\u4FA7\u8FB9\u804A\u5929\u7D22\u5F15\uFF1A${String(error)}\u3002\u5237\u65B0\u540E\u53EF\u80FD\u65E0\u6CD5\u81EA\u52A8\u6062\u590D\uFF0CDSH \u804A\u5929\u8BB0\u5F55\u4E0D\u53D7\u5F71\u54CD\u3002` };
    }
    this.publish();
  }
  selected(parentId, contentId) {
    return this.state.selected[JSON.stringify([parentId, contentId])];
  }
  select(parentId, contentId, id) {
    this.update((state) => ({
      ...state,
      entries: state.entries.some((entry) => entry.id === id) ? state.entries : [
        { id, parentId, createdAt: Date.now(), pinned: false },
        ...state.entries
      ],
      selected: { ...state.selected, [JSON.stringify([parentId, contentId])]: id }
    }));
  }
  pin(id) {
    this.update((state) => ({ ...state, entries: state.entries.map((entry) => entry.id === id ? { ...entry, pinned: !entry.pinned } : entry) }));
  }
  forget(id) {
    this.update((state) => ({
      ...state,
      entries: state.entries.filter((entry) => entry.id !== id),
      selected: Object.fromEntries(Object.entries(state.selected).filter(([, value]) => value !== id))
    }));
  }
};

// src/ownership.ts
var SideChatCreator = class {
  constructor(sessions, history) {
    this.sessions = sessions;
    this.history = history;
  }
  pending = /* @__PURE__ */ new Map();
  open(parentId, contentId) {
    const existing = this.history.selected(parentId, contentId);
    if (existing) return Promise.resolve(existing);
    const key = JSON.stringify([parentId, contentId]);
    const pending = this.pending.get(key);
    if (pending) return pending;
    const task = this.create(parentId, contentId).finally(() => this.pending.delete(key));
    this.pending.set(key, task);
    return task;
  }
  async create(parentId, contentId, fork = false) {
    const cwd = this.sessions.list.getSnapshot().byId[parentId]?.cwd;
    const id = fork ? await this.sessions.fork({ sessionId: parentId }) : await this.sessions.create(cwd ? { cwd } : void 0);
    this.history.select(parentId, contentId, id);
    return id;
  }
};

// src/styles.css
var styles_default = ".dsc-root{--dsc-fg:var(--dsw-alias-label-primary,#202124);--dsc-muted:var(--dsw-alias-label-caption,#73767c);--dsc-line:var(--dsw-alias-border-l4,#e5e7eb);--dsc-hover:var(--dsw-alias-interactive-bg-hover,#eef0f3);display:flex;flex-direction:column;min-width:0;min-height:0;height:100%;color:var(--dsc-fg);font-size:13px;letter-spacing:0;position:relative;overflow:hidden}\n.dsc-root *{box-sizing:border-box;letter-spacing:0}\n.dsc-toolbar{display:flex;align-items:center;gap:9px;min-height:58px;padding:10px 12px;border-bottom:1px solid var(--dsc-line);flex-shrink:0}\n.dsc-mark{flex-shrink:0;color:var(--dsc-muted)}\n.dsc-heading{min-width:0;flex:1;display:flex;flex-direction:column;gap:3px}\n.dsc-heading>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;font-size:13px;line-height:18px}\n.dsc-heading small{display:flex;align-items:center;gap:5px;color:var(--dsc-muted);font-size:11px;line-height:14px}\n.dsc-heading i{width:5px;height:5px;border-radius:50%;background:var(--dsc-muted)}\n.dsc-heading i[data-running],.dsc-running{background:#329b73}\n.dsc-tools{display:flex;gap:2px;flex-shrink:0}\n.dsc-icon{height:30px;width:30px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;border:0;border-radius:6px;background:transparent;color:var(--dsc-muted);cursor:pointer;padding:0}\n.dsc-icon:hover,.dsc-icon[aria-pressed=true]{background:var(--dsc-hover);color:var(--dsc-fg)}\n.dsc-icon:disabled{opacity:.35;cursor:default}\n.dsc-root button:focus-visible,.dsc-root input:focus-visible{outline:2px solid #4486ed;outline-offset:2px}\n.dsc-content{display:flex;flex:1;min-height:0;min-width:0;overflow:hidden;--dsh-conversation-max-width:100%;--dsh-composer-card-max-width:100%}\n.dsc-content>div{flex:1;min-width:0;min-height:0}\n.dsc-chat-host{display:flex;flex:1;min-height:0;min-width:0}\n.dsc-chat-host[hidden]{display:none}\n.dsc-views{display:flex;flex-direction:column;flex:1 0 auto;min-width:0}\n.dsc-empty{display:flex;flex:1;flex-direction:column;align-items:center;justify-content:center;gap:12px;min-height:120px;padding:32px 16px;color:var(--dsc-muted)}\n.dsc-empty h2{font-size:17px;line-height:24px;font-weight:500;margin:0;color:var(--dsc-fg)}\n.dsc-state{display:flex;flex:1;min-height:100px;align-items:center;justify-content:center;gap:9px;padding:24px;color:var(--dsc-muted);text-align:center;line-height:1.6;overflow-wrap:anywhere}\n.dsc-error,.dsc-notice{padding:9px 12px;font-size:12px;line-height:18px;flex-shrink:0;overflow-wrap:anywhere;max-height:130px;overflow:auto}\n.dsc-error{display:flex;align-items:center;gap:8px;background:color-mix(in srgb,#d84d54 9%,transparent);color:var(--dsw-alias-state-error-primary,#b83c44)}\n.dsc-error>span{flex:1;min-width:0}\n.dsc-notice{background:color-mix(in srgb,#d29c35 10%,transparent);color:var(--dsc-fg)}\n.dsc-rename{display:flex;align-items:center;gap:5px;padding:8px 12px;border-bottom:1px solid var(--dsc-line)}\n.dsc-root input{font:inherit;min-width:0;color:inherit;background:transparent;border:0;outline:none}\n.dsc-rename input{flex:1;border:1px solid var(--dsc-line);border-radius:6px;padding:7px 9px}\n.dsc-history{display:flex;flex:1;flex-direction:column;min-height:0;min-width:0;padding:14px 12px 8px}\n.dsc-history-title{display:flex;gap:8px;align-items:center;margin-bottom:12px}\n.dsc-history-title strong{font-size:13px;font-weight:600}\n.dsc-history-title>span{color:var(--dsc-muted);font-size:12px;flex:1}\n.dsc-search{display:flex;align-items:center;gap:8px;padding:9px 10px;border:1px solid var(--dsc-line);border-radius:6px;color:var(--dsc-muted);margin-bottom:10px;flex-shrink:0}\n.dsc-search input{width:100%;color:var(--dsc-fg);line-height:20px}\n.dsc-history-list{min-height:0;overflow:auto;overscroll-behavior:contain}\n.dsc-history-row{display:flex;align-items:center;border-radius:6px;padding:4px;gap:2px;margin-bottom:3px}\n.dsc-history-row:hover,.dsc-history-row[data-selected]{background:var(--dsc-hover)}\n.dsc-history-pick{flex:1;min-width:0;text-align:left;padding:7px 5px;background:transparent;color:inherit;border:0;cursor:pointer;display:flex;flex-direction:column;gap:5px}\n.dsc-history-pick>span{display:flex;align-items:center;gap:6px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;line-height:18px}\n.dsc-history-pick small{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsc-muted);font-size:11px;line-height:16px}\n.dsc-running{width:6px;height:6px;border-radius:50%;display:inline-block;flex-shrink:0}\n@keyframes dsc-spin{to{transform:rotate(360deg)}}\n.dsc-spin{animation:dsc-spin 1s linear infinite}\n@media(prefers-reduced-motion:reduce){.dsc-spin{animation:none}}\n@media(max-width:420px){.dsc-toolbar{padding:9px 8px;gap:6px}.dsc-mark{display:none}.dsc-icon{width:29px;height:32px}}\n";

// src/client.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ID = "dsh-side-chat";
var GuideIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCirclePlus, { ...props });
function IconButton({ label, children, onClick, disabled, active }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      className: "dsc-icon",
      type: "button",
      title: label,
      "aria-label": label,
      "aria-pressed": active,
      onClick,
      disabled,
      children
    }
  );
}
function SideChatContent({ renderFactorySlot }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsc-content", children: renderFactorySlot("conversation.content", {
    variant: "embedded",
    phase: "active",
    hero: false
  }, { slots: { views: SideChatViews }, fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsc-state", role: "alert", children: "\u5F53\u524D DSH \u5C1A\u672A\u63D0\u4F9B\u53EF\u5D4C\u5165\u7684\u804A\u5929\u754C\u9762\uFF0C\u8BF7\u4F7F\u7528 0.2.1-rc.2 \u6216\u66F4\u65B0\u7248\u672C\u3002" }) }) });
}
function SideChatViews({ useSession, renderSlot }) {
  const blank = useSession((session) => session.blank && !session.promptAttempted && !session.running);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsc-views", children: [
    blank && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsc-empty", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCirclePlus, { size: 32, strokeWidth: 1.5, "aria-hidden": "true" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "\u4FA7\u8FB9\u804A\u5929" })
    ] }),
    renderSlot("conversation.session", {})
  ] });
}
function SideChatTitle({ sessionId, useTabInfo, useSessions, history }) {
  const { tab } = useTabInfo();
  (0, import_react3.useSyncExternalStore)(history.subscribe, history.getSnapshot);
  const id = history.selected(sessionId, tab.contentId);
  const summary = useSessions((state) => id === void 0 ? void 0 : state.byId[id]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary && !summary.blank ? summary.displayTitle : "\u4FA7\u8FB9\u804A\u5929" });
}
function RetainedConversation({ id, sessions, SessionProvider, renderSlot, onReady, onError }) {
  const [reference, setReference] = (0, import_react3.useState)();
  const [failed, setFailed] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
    let disposed = false;
    let owned;
    const fail = (cause) => {
      if (!disposed) {
        setFailed(true);
        onError(String(cause));
      }
    };
    try {
      owned = sessions.retain(id, { source: "sideChat" });
      const handle = owned;
      handle.ready.then(() => {
        if (disposed) return;
        const snapshot = handle.binding.session.getSnapshot();
        if (snapshot.openState === "error") throw new Error(snapshot.openError?.message ?? "\u65E0\u6CD5\u8BFB\u53D6\u4F1A\u8BDD\u8BB0\u5F55");
        setReference(handle);
        onReady(id);
      }).catch(fail);
    } catch (cause) {
      fail(cause);
    }
    return () => {
      disposed = true;
      owned?.release();
    };
  }, [id, sessions, onReady, onError]);
  if (failed) return null;
  return reference ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionProvider, { session: reference, children: renderSlot("dsh.sideChat.content", {}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsc-state", role: "status", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "dsc-spin", size: 20 }),
    "\u6B63\u5728\u6253\u5F00\u804A\u5929\u2026"
  ] });
}
function SideChatBody(props) {
  const { sessionId: parentId, sessions, history, creator, SessionProvider, renderSlot, useTabInfo, useSessions } = props;
  const { tab } = useTabInfo();
  const catalog = useSessions((state) => state);
  const navigation = (0, import_react3.useSyncExternalStore)(history.subscribe, history.getSnapshot);
  const [id, setId] = (0, import_react3.useState)(() => history.selected(parentId, tab.contentId));
  const [readyId, setReadyId] = (0, import_react3.useState)();
  const [busy, setBusy] = (0, import_react3.useState)(false);
  const [error, setError] = (0, import_react3.useState)("");
  const [historyOpen, setHistoryOpen] = (0, import_react3.useState)(false);
  const [query, setQuery] = (0, import_react3.useState)("");
  const [rename, setRename] = (0, import_react3.useState)(false);
  const [title, setTitle] = (0, import_react3.useState)("");
  const [attempt, setAttempt] = (0, import_react3.useState)(0);
  const alive = (0, import_react3.useRef)(true);
  const operation = (0, import_react3.useRef)(0);
  const current = id === void 0 ? void 0 : catalog.byId[id];
  const displayTitle = current?.blank ? "\u65B0\u804A\u5929" : current?.displayTitle ?? "\u4FA7\u8FB9\u804A\u5929";
  (0, import_react3.useEffect)(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      operation.current++;
    };
  }, []);
  (0, import_react3.useEffect)(() => {
    let disposed = false;
    setError("");
    if (id) return;
    setBusy(true);
    creator.open(parentId, tab.contentId).then((created) => {
      if (!disposed) setId(created);
    }).catch((cause) => {
      if (!disposed) setError(String(cause));
    }).finally(() => {
      if (!disposed) setBusy(false);
    });
    return () => {
      disposed = true;
    };
  }, [creator, parentId, tab.contentId, id, attempt]);
  async function create(fork = false) {
    if (busy) return;
    const ticket = ++operation.current;
    setBusy(true);
    setError("");
    try {
      const created = await creator.create(parentId, tab.contentId, fork);
      if (alive.current && ticket === operation.current) {
        setId(created);
        setHistoryOpen(false);
        setRename(false);
      }
    } catch (cause) {
      if (alive.current && ticket === operation.current) setError(String(cause));
    } finally {
      if (alive.current && ticket === operation.current) setBusy(false);
    }
  }
  function select(next) {
    operation.current++;
    history.select(parentId, tab.contentId, next);
    setId(next);
    setHistoryOpen(false);
    setRename(false);
    setError("");
  }
  async function saveTitle() {
    if (!id || readyId !== id || !title.trim() || busy) return;
    setBusy(true);
    try {
      const result = await sessions.using(id, { source: "sideChat" }, async (reference) => {
        await reference.ready;
        return reference.binding.session.rename(title.trim());
      });
      if (!result.ok) throw new Error(result.error.message);
      if (alive.current) setRename(false);
    } catch (cause) {
      if (alive.current) setError(String(cause));
    } finally {
      if (alive.current) setBusy(false);
    }
  }
  const entries = [...navigation.entries].filter((entry) => {
    const summary = catalog.byId[entry.id];
    return !query || `${summary?.displayTitle ?? ""} ${summary?.cwd ?? ""}`.toLocaleLowerCase().includes(query.toLocaleLowerCase());
  }).sort((a, b) => Number(b.pinned) - Number(a.pinned) || (catalog.byId[b.id]?.updatedAt ?? b.createdAt) - (catalog.byId[a.id]?.updatedAt ?? a.createdAt));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "dsc-root", "aria-label": "\u4FA7\u8FB9\u804A\u5929", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "dsc-toolbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCirclePlus, { size: 17, className: "dsc-mark", "aria-hidden": "true" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsc-heading", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { title: displayTitle, children: displayTitle }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "data-running": current?.running || void 0 }),
          current?.running ? "\u6B63\u5728\u8FD0\u884C" : "\u72EC\u7ACB\u4F1A\u8BDD"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsc-tools", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, { label: "\u91CD\u547D\u540D\u804A\u5929", disabled: readyId !== id || !id || busy, onClick: () => {
          setTitle(current?.title ?? "");
          setRename(!rename);
        }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 15 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, { label: "\u4ECE\u4E3B\u804A\u5929\u5206\u652F\uFF08\u590D\u5236\u5DF2\u5B8C\u6210\u7684\u4E0A\u4E0B\u6587\uFF09", disabled: busy, onClick: () => void create(true), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitFork, { size: 16 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, { label: "\u4F1A\u8BDD\u5386\u53F2", active: historyOpen, onClick: () => setHistoryOpen(!historyOpen), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { size: 17 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, { label: "\u65B0\u5EFA\u4FA7\u8FB9\u804A\u5929", disabled: busy, onClick: () => void create(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 19 }) })
      ] })
    ] }),
    rename && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { className: "dsc-rename", onSubmit: (event) => {
      event.preventDefault();
      void saveTitle();
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          "aria-label": "\u804A\u5929\u540D\u79F0",
          autoFocus: true,
          value: title,
          maxLength: 200,
          placeholder: "\u804A\u5929\u540D\u79F0",
          onChange: (event) => setTitle(event.target.value),
          onKeyDown: (event) => {
            if (event.key === "Escape") setRename(false);
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, { label: "\u4FDD\u5B58\u540D\u79F0", disabled: !title.trim() || busy, onClick: () => void saveTitle(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, { label: "\u53D6\u6D88\u91CD\u547D\u540D", onClick: () => setRename(false), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 17 }) })
    ] }),
    navigation.warning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsc-notice", role: "status", children: navigation.warning }),
    error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsc-error", role: "alert", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, { label: "\u91CD\u8BD5\u6253\u5F00\u804A\u5929", onClick: () => setAttempt((n) => n + 1), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { size: 16 }) })
    ] }),
    historyOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsc-history", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsc-history-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "\u4FA7\u8FB9\u804A\u5929\u8BB0\u5F55" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entries.length }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, { label: "\u5173\u95ED\u5386\u53F2", onClick: () => setHistoryOpen(false), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 17 }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dsc-search", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { autoFocus: true, placeholder: "\u641C\u7D22\u804A\u5929", "aria-label": "\u641C\u7D22\u804A\u5929", value: query, onChange: (event) => setQuery(event.target.value) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsc-history-list", children: entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsc-state", children: "\u6CA1\u6709\u5339\u914D\u7684\u804A\u5929" }) : entries.map((entry) => {
        const summary = catalog.byId[entry.id];
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsc-history-row", "data-selected": entry.id === id || void 0, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "dsc-history-pick", type: "button", disabled: busy, onClick: () => select(entry.id), "aria-current": entry.id === id ? "true" : void 0, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
              summary?.blank ? "\u65B0\u804A\u5929" : summary?.displayTitle ?? "\u672A\u8F7D\u5165\u7684\u804A\u5929",
              summary?.running && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "dsc-running", "aria-label": "\u6B63\u5728\u8FD0\u884C" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { title: summary?.cwd, children: [
              summary?.cwd ?? "DSH \u4F1A\u8BDD",
              " \xB7 ",
              new Date(summary?.updatedAt ?? entry.createdAt).toLocaleDateString()
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, { label: entry.pinned ? "\u53D6\u6D88\u7F6E\u9876" : "\u7F6E\u9876\u804A\u5929", onClick: () => history.pin(entry.id), children: entry.pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinOff, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { size: 15 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, { label: "\u4EC5\u4ECE\u4FA7\u8FB9\u5386\u53F2\u79FB\u9664\uFF0C\u4E0D\u5220\u9664\u804A\u5929\u8BB0\u5F55", disabled: entry.id === id, onClick: () => history.forget(entry.id), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 }) })
        ] }, entry.id);
      }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsc-chat-host", hidden: historyOpen, children: id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      RetainedConversation,
      {
        id,
        sessions,
        SessionProvider,
        renderSlot,
        onReady: setReadyId,
        onError: setError
      },
      `${id}:${attempt}`
    ) : !error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsc-state", role: "status", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "dsc-spin", size: 20 }),
      "\u6B63\u5728\u6253\u5F00\u804A\u5929\u2026"
    ] }) })
  ] });
}
function apply(ctx) {
  let storage;
  try {
    storage = window.localStorage;
  } catch {
  }
  const history = new SideChatHistory(storage);
  const creator = new SideChatCreator(ctx.sessions, history);
  ctx.effect(() => {
    const style = document.createElement("style");
    style.dataset.plugin = ID;
    style.textContent = styles_default;
    document.head.appendChild(style);
    const reload = (event) => {
      if (event.storageArea === storage) history.reload();
    };
    window.addEventListener("storage", reload);
    return () => {
      style.remove();
      window.removeEventListener("storage", reload);
    };
  });
  ctx.effect(() => ctx.sidebarRightTabs.register({
    id: ID,
    kind: ID,
    multiple: true,
    keepMounted: true,
    title: () => "\u4FA7\u8FB9\u804A\u5929",
    guide: [{
      id: "new",
      order: -20,
      title: () => "\u4FA7\u8FB9\u804A\u5929",
      description: () => "\u72EC\u7ACB\u804A\u5929",
      icon: GuideIcon
    }]
  }));
  ctx.effect(() => ctx.slots.inject("sidebar.right.pane.tab", () => ctx.slots.register({
    name: "sidebar.right.pane.tab",
    key: ID,
    children: { "dsh.sideChat.content": { kind: "single", scope: "session" } },
    inject: () => ({ sessions: ctx.sessions, history, creator })
  }, SideChatBody)));
  ctx.effect(() => ctx.slots.inject("dsh.sideChat.content", () => ctx.slots.register({
    name: "dsh.sideChat.content"
  }, SideChatContent)));
  ctx.effect(() => ctx.slots.inject("sidebar.right.pane.tab.title", () => ctx.slots.register({
    name: "sidebar.right.pane.tab.title",
    key: ID,
    inject: () => ({ history })
  }, SideChatTitle)));
}
var inject = ["slots", "sidebarRightTabs", "sessions", "uiSession", "conversation"];
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/check.js:
lucide-react/dist/esm/icons/git-fork.js:
lucide-react/dist/esm/icons/history.js:
lucide-react/dist/esm/icons/loader-circle.js:
lucide-react/dist/esm/icons/message-circle-plus.js:
lucide-react/dist/esm/icons/pencil.js:
lucide-react/dist/esm/icons/pin-off.js:
lucide-react/dist/esm/icons/pin.js:
lucide-react/dist/esm/icons/plus.js:
lucide-react/dist/esm/icons/rotate-cw.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/

return module.exports;}});
