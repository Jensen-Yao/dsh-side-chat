# Development And Validation

`npm ci`, `npm run typecheck`, `npm test`, and `npm run build` prepare the standalone plugin. Node 22.19+ or 24+ and DSH 0.2.1-rc.2-compatible public UI APIs are required.

On Windows, `pwsh -File scripts/start-smoke.ps1 -RuntimeBin /absolute/path/to/dsh/lib/bin.js` starts an isolated Web profile on port 3087. This profile has its own DSH_HOME under `output/smoke-home`, disabled telemetry, and a deterministic streaming test adapter. It does not read production credentials. The test adapter is never packaged or enabled in user profiles.

Use a dedicated Playwright CLI session and the authenticated URL printed by the test host. Open the right sidebar and choose Side Chat. Sending `SIDE_CHAT_ISOLATION_2026: 侧边聊天独立性验证` produces a deterministic streaming reply. `STOP_TEST` makes the reply slow enough to exercise the native Stop control. The operations in `scripts/browser-smoke.mjs` run against that assembled UI through Playwright CLI `run-code`; flatten the file's newlines when passing it through Windows command wrappers.

The browser scenarios verify independent main/side Session IDs, preservation of the main draft, completed and cancelled replies, explicit main-context fork, searchable/pinned history, rename, multiple native tabs, reload identity restoration, and visible input at 390 x 844. Screenshots and logs belong under `output/`; they are not published. Validate the ordinary and mobile layouts visually as well as through element geometry.

Production installation uses an unpacked versioned tarball separate from the checkout. Profile dependency, bundle selection, and the matching lockfile importer reference must agree. Do not point a production profile at an unbuilt checkout, install fixture providers there, rewrite unrelated lock entries, or restart a host with active work solely to load this client plugin. The desktop profile is owned by Electron and cannot be launched using the external DSH CLI.
