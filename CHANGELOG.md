# Changelog

## [Unreleased]

---

## [0.1.3] - 2026-10-09

### Fixed

- Load on DSH `0.2.0-rc.2`. Every `@deepseek-ai/dsh-*` peer range still pinned the `0.0.1-rc.2` snapshot, so DSH refused the profile bundle as version-incompatible ("skipping profile bundle … peerDependencies …") and the plugin never mounted. Peers now track `^0.2.0-rc.2`, `@deepseek-ai/dsh-tool-workflow` (used for its event payload types) is declared, and the compatibility pin records the `dsh-v0.2.0-rc.2` release.

### Changed

- Migrate to the `0.2.0-rc.2` Session and message APIs: read child logs through `Session.snapshotEvents()` (`Session.events` is gone), derive successful tool evidence from `ToolResultMessage.toolCallId`/`isError` instead of the removed `tool-result` content block, own background jobs by `Agent.id` (`JobSpec.owner` is a `SessionId`), and declare this plugin's own `MessageSourceMap` kind (`dsh-external-workflow`) because the shared catch-all `plugin` kind no longer exists.
- Point the development checkout at `../deepseek-harness` in `tsconfig.json`, `vitest.config.ts`, and both verification scripts, and drop the tsconfig `paths` block so DSH packages resolve through their published `exports` instead of hardcoded snapshot file paths.
- Run spec files one at a time. The suite's QuickJS fixtures are bounded by short wall-clock budgets, so concurrent worker processes made those budgets measure host scheduling instead of script work and produced random `InternalError: interrupted` failures in `engine.spec.ts`, `author.spec.ts`, and `runtime.spec.ts`. No assertion changed; the suite is small enough that serial execution costs a few seconds.

---

## [0.1.2] - 2026-08-13

### Fixed

- Smoke-validate command-authored inline workflows with the engine's shared child-task and deterministic admission contract before consuming the one-shot handoff grant. Invalid metadata, input schemas, read-only/agent/token limits (including concurrent reservations), provider capabilities/adapters, nested workflows, and concurrency now fail before any child starts, and the current Agent can correct the source in the same turn without falling into a disabled approval prompt.
- Publish dynamic workflow starts as session-scoped native events so a background run remains `running` after its launching tool step or turn closes; only the matching terminal `tool-workflow/run-end` decides completion, failure, or cancellation.
- State the exact `modelHint` values (`fast`, `balanced`, `deep`) in both workflow-authoring prompts.

---

## [0.1.1] - 2026-08-13

### Fixed

- Preserve the original `/workflow` query as a visible human Session message so DSH can render it, generate a session title, and identify the conversation in its Workspace.
- Keep workflow authoring instructions in separate plugin context while retaining exact one-shot approval semantics.
- Document DSH Web's manual-order five-session collapse and the “Last updated” view workaround.

---

## [0.1.0] - 2026-08-13

### Added

- Initial KodaX-parity dynamic workflow layer for DeepSeek Harness.

<!-- last-sync: f6cef1442dca3a47e1b132741b599a2d4bdbc8b8 -->
