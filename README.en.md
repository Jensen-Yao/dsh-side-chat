# DSH Side Chat

**Keep the main thread moving. Open another space for a thought.** DSH Side Chat adds independent conversations to the native DeepSeek Harness right sidebar while leaving the main conversation untouched.

[![GitHub release](https://img.shields.io/github/v/release/Jensen-Yao/dsh-side-chat?display_name=tag&style=flat-square&color=16845b)](https://github.com/Jensen-Yao/dsh-side-chat/releases)
[![CI](https://img.shields.io/github/actions/workflow/status/Jensen-Yao/dsh-side-chat/ci.yml?branch=main&style=flat-square)](https://github.com/Jensen-Yao/dsh-side-chat/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-31383f?style=flat-square)](LICENSE)

[Website](https://jensen-yao.github.io/dsh-side-chat/) · [简体中文](README.md) · [Releases](https://github.com/Jensen-Yao/dsh-side-chat/releases) · [Report an issue](https://github.com/Jensen-Yao/dsh-side-chat/issues)

![DSH Side Chat desktop demo](docs/assets/desktop.png)

<p align="center"><sub>Fixed demo data from an isolated environment. No real conversations are shown.</sub></p>

## Why

Look something up, organize an idea, or branch off from the current task without interrupting the main conversation. Side Chat lives in DSH's native right sidebar and uses the Harness conversation UI, models, tools, attachments, and permissions.

## Features

| | What it does |
| --- | --- |
| Independent conversations | Create multiple side conversations and switch between tabs without changing the main selection or draft. |
| Native chat UI | Uses DSH's public Conversation Factory and composer, including the controls exposed by the current Harness. |
| History | Search, pin, rename, and restore side-chat tabs after a refresh. |
| Branch from the main chat | Explicitly fork the main conversation using context supported by the official fork interface. |
| Flexible layout | Use DSH's built-in sidebar split, collapse, and fullscreen controls. |

![DSH Side Chat sidebar entry](docs/assets/entry.png)

## Install

Requires DeepSeek Harness `0.2.1-rc.2` or newer with compatible public sidebar and conversation UI interfaces. Install this GitHub Release from the DSH plugin marketplace or plugin settings:

```text
github:Jensen-Yao/dsh-side-chat#v0.1.0
```

Alternatively, download [`dsh-side-chat-0.1.0.tgz`](https://github.com/Jensen-Yao/dsh-side-chat/releases/download/v0.1.0/dsh-side-chat-0.1.0.tgz) and install it through a plugin manager that accepts local packages. Then enable **DSH Side Chat** in the active profile's plugin settings and reload plugins as prompted by the Harness.

When managing a profile from the CLI, `dsh plugin --profile <profile> add <package>` installs the dependency; the existing profile bundle list must also retain its current entries and include `dsh-side-chat`. Let the Harness load that bundle afterward. For the desktop app, use its own plugin manager rather than substituting the Web profile.

Use the plugin manager to update the plugin. Do not delete the profile lockfile, clear `node_modules`, or upgrade unrelated plugins to resolve a single-plugin issue.

## Use

Open **Side Chat** from the start page in the main workspace's right sidebar. Create tabs with the new-tab control. Search, pin, or rename records from history. Use the conversation toolbar's fork action when you want to carry supported context from the main task; context is never copied implicitly.

On narrow screens, the Harness controls the sidebar layout. Closing or collapsing it does not delete a conversation.

![DSH Side Chat narrow-screen demo](docs/assets/mobile.png)

## Data and permissions

- Messages and execution records are stored by DeepSeek Harness's conversation service.
- The browser stores only conversation IDs and tab metadata (title, creation time, and pin state) for restoring tabs. History indexes are scoped to the page origin, so Web and desktop windows do not automatically share them.
- Removing a history index does not delete the Harness conversation. Closing a tab does not cancel a task that is still running; use that conversation's own stop control.
- The plugin has no separate model API key or direct model-request path, and does not expand permissions. The Harness continues to manage models, tools, and authorization.
- It uses public DSH UI and conversation interfaces. It does not patch core files or discover private DOM nodes.

## Compatibility and verification

| Environment | Status |
| --- | --- |
| DSH Web `0.2.1-rc.2`, isolated demo profile | Verified new conversations, streaming, stop, fork, multiple tabs, and refresh restore. |
| Web narrow layout | Checked at a 390 × 844 viewport. |
| DSH desktop app | Profile configured; native desktop-window interactions have not been independently verified. |
| Newer DSH versions | Requires compatible public interfaces. Include the DSH version and exported logs in an issue if loading fails. |

## Build from source

```sh
npm ci
npm run typecheck
npm test
npm run build
```

Build output is in `lib/` and is included in both Git and the release package. See [DEVELOPMENT.md](DEVELOPMENT.md) for development details and [VERIFICATION.md](VERIFICATION.md) for the recorded verification scope.

## Project

- [GitHub Pages](https://jensen-yao.github.io/dsh-side-chat/)
- [Source and releases](https://github.com/Jensen-Yao/dsh-side-chat)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (this is an independent community project, not affiliated with the official project)
- [MIT License](LICENSE)
