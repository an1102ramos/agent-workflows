# Implementation Plan: @rioagentflow/workflows

> Created: 2026-03-11 10:15:00
> Status: Draft

## Objective

Build and publish `@rioagentflow/workflows` — a zero-dependency Node.js CLI package that installs pre-built AI agent workflow files for tools like Antigravity (and future tools like Cursor, Codex). Users run a single `npx` command to install, list, or uninstall workflows.

## Scope

### In scope
- CLI with 3 commands: `install`, `list`, `uninstall`
- Adapter pattern for multi-tool support (start with Antigravity)
- 9 workflow `.md` files bundled in package
- `--force` flag for overwrite behavior
- `--tool` flag for tool selection
- `--help` flag and usage output
- Zero external dependencies
- Public npm publish under `@rioagentflow` org
- README, LICENSE
- Unit tests with `node:test`

### Out of scope
- Interactive prompts (no inquirer/prompts)
- Custom workflow authoring/templating
- Auto-update mechanism
- Web UI / dashboard
- Cursor/Codex adapter implementation (future)

## Architecture & Approach

### Pure Node.js CLI (zero-dep)
- Entry point: `bin/cli.js` with `#!/usr/bin/env node`
- Arg parsing: manual `process.argv` parsing (3 commands + 3 flags is simple enough)
- File operations: `node:fs` and `node:path`
- Console output: raw ANSI escape codes for colors (no chalk dependency)

### Adapter Pattern
Each AI tool is an adapter object with: `name`, `displayName`, `targetDir`, `workflowsDir`. Adding a new tool = 1 new adapter file + 1 new workflows directory.

### Tool Selection Logic
- 1 adapter available → auto-pick (no flag needed)
- N adapters available → require `--tool <name>` flag, show available tools if missing

## Phases

- [x] **Phase 1: Project Scaffold** — Goal: Initialize npm project with directory structure
- [x] **Phase 2: Core Utilities** — Goal: Logger and FS helpers
- [x] **Phase 3: Adapter System** — Goal: Adapter interface, Antigravity adapter, registry
- [x] **Phase 4: CLI Commands** — Goal: install, list, uninstall commands + entry point
- [x] **Phase 5: Workflow Content** — Goal: Bundle the 9 Antigravity workflow files
- [x] **Phase 6: Documentation** — Goal: README.md, LICENSE, help output
- [x] **Phase 7: Testing** — Goal: Unit tests + integration test
- [x] **Phase 8: Publish Prep** — Goal: Verify package, publish checklist

## Key Changes

- New project: `/Users/rio/project/antigravity-workflows/`
- Files created from scratch (no existing code to modify)
- Workflow content sourced from `/Users/rio/.gemini/antigravity/global_workflows/`

## Verification Strategy

- `node --test` — Run all unit tests
- `node bin/cli.js --help` — Verify CLI entry point
- `node bin/cli.js install` — E2E verify install to temp dir
- `node bin/cli.js list` — Verify listing
- `node bin/cli.js uninstall` — Verify cleanup
- `npm pack --dry-run` — Verify published files

## Dependencies

- **None** — Zero external dependencies. Uses only Node.js built-in modules.
- Node.js >= 18 (for `node:test`, `node:fs`, `fs.cpSync`)

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| `@rioagentflow` npm org might be taken | Check availability before publish; have fallback names ready |
| `~` not expanded by Node.js | Use `os.homedir()` for path resolution |
| npx caching stale versions | Document `npx @rioagentflow/workflows@latest` usage |
| Windows path separators | Use `path.join()` consistently, never hardcode `/` |
| Future adapter additions may need different file formats | Adapter pattern isolates tool-specific logic |

## Open Questions

- None — all requirements clarified during brainstorm session.
