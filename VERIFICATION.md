# Verification: 0.1.0

Validated on Windows using DSH 0.2.1-rc.2 and Node 25.2.1 on 2026-10-19.

- `npm run typecheck`: passed.
- `npm test`: nine focused tests passed across history persistence and independent session creation.
- `npm run build`: passed; the client imports only React/JSX platform modules and bundles its Lucide icons.
- `npm pack --ignore-scripts --pack-destination output`: created a package containing built host/client entries and no test provider or credentials.
- Real isolated DSH Web assembly: streamed replies, cancellation showing “已停止”, untouched main input draft, different main/side session IDs, history search/pin/rename, explicit main-context fork, multiple native tabs, and refresh restoration passed.
- Real browser layouts: desktop and 390 x 844; the sidebar fits and the bottom input remains visible. Screenshots are under `output/playwright/`.
- Production Web: starts on port 3080; the guide entry precedes Workspace Files, the native composer opens, main/side IDs differ, and the side-chat region contains no Slot or Factory error markers. No production model request was sent for this verification.
- Production installation: a built copy outside the checkout serves both Web and desktop profile dependencies. The installed and development client bundle SHA-256 values match. Semantic comparison against the profile backups confirms no existing dependency version, bundle, or lock entry changed.
- Desktop: its profile dependency, bundle selection, lock reference and installed package are configured; native Electron interaction was not tested in this turn. The desktop profile cannot be launched through the external DSH CLI.

A stale-reference error found during the first browser pass was fixed by giving each keyed conversation mount one immutable owned Session reference. Subsequent session switches and refresh tests pass. Connection-reset warnings recorded while intentionally restarting the isolated host are not production startup failures.
