# Phase 6: Documentation

## Objective

Create README.md and LICENSE file for the package.

## Preconditions

- Phase 4 complete (CLI works end-to-end)

## Tasks

### Task 6.1: Create README.md

Structure:
```markdown
# @rioagentflow/workflows

> Ready-to-use AI agent workflows for Antigravity, Cursor, and more.

## Features
- One-command install
- Multi-tool support (Antigravity, Cursor, Codex coming soon)
- Safe by default (won't overwrite your customizations)
- Zero dependencies

## Quick Start

npx @rioagentflow/workflows install

## Commands

### Install
npx @rioagentflow/workflows install [--tool <name>] [--force]

### List
npx @rioagentflow/workflows list

### Uninstall
npx @rioagentflow/workflows uninstall [--tool <name>]

## Supported Tools
| Tool | Status | Target Directory |
|---|---|---|
| Antigravity | ✅ Available | ~/.gemini/antigravity/global_workflows/ |
| Cursor | 🔜 Coming Soon | — |
| Codex | 🔜 Coming Soon | — |

## Available Workflows
(list all 9 with short descriptions from frontmatter)

## Contributing
How to add workflows or new tool adapters.

## License
MIT
```

### Task 6.2: Create LICENSE

MIT License with current year and author "rio".

## Verification

- Commands:
  - `cat README.md` — verify content
  - `cat LICENSE` — verify MIT license
- Expected results:
  - README is comprehensive and well-formatted
  - LICENSE has correct year and author

## Exit Criteria

- [x] README.md created with full documentation
- [x] LICENSE created (MIT)
