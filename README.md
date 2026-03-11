# @rioagentflow/workflows

> 🚀 Ready-to-use AI agent workflows for Antigravity, Cursor, and more.

Install a curated set of AI agent workflows with a single command. No configuration needed.

## Features

- **One-command install** — `npx @rioagentflow/workflows install` and you're done
- **Multi-tool support** — Antigravity today, Cursor & Codex coming soon
- **Safe by default** — Won't overwrite your customized workflows
- **Zero dependencies** — Pure Node.js, nothing extra to install
- **Easy to extend** — Add new tools via the adapter pattern

## Quick Start

```bash
npx @rioagentflow/workflows install
```

That's it! Your workflows are now installed.

## Commands

### Install

Install all workflow files to your AI tool's configuration directory.

```bash
npx @rioagentflow/workflows install              # Auto-detect tool
npx @rioagentflow/workflows install --tool antigravity   # Specify tool
npx @rioagentflow/workflows install --force       # Overwrite existing files
```

### List

View all available workflows in the package.

```bash
npx @rioagentflow/workflows list
```

### Uninstall

Remove all installed workflow files.

```bash
npx @rioagentflow/workflows uninstall
npx @rioagentflow/workflows uninstall --tool antigravity
```

## Supported Tools

| Tool | Status | Target Directory |
|------|--------|-----------------|
| Antigravity | ✅ Available | `~/.gemini/antigravity/global_workflows/` |
| Cursor | 🔜 Coming Soon | — |
| Codex | 🔜 Coming Soon | — |

## Available Workflows

| Workflow | Description |
|----------|-------------|
| `ask` | Gather information through structured dialogue |
| `bootstrap` | Bootstrap a new project |
| `brainstorm` | Convert rough ideas into clear design outputs |
| `docs` | Generate project documentation |
| `execute-plan` | Execute a pre-approved implementation plan |
| `fix` | Diagnose and fix issues |
| `quick-implement` | Quickly implement small, clear tasks |
| `review` | Review code changes |
| `write-plan` | Produce a complete implementation plan |

## Options

| Option | Description |
|--------|-------------|
| `--tool <name>` | Specify which AI tool to target (required when multiple tools are available) |
| `--force` | Overwrite existing workflow files |
| `--help`, `-h` | Show help message |

## How It Works

1. Workflow files (`.md`) are bundled inside the npm package
2. When you run `install`, the CLI copies them to your AI tool's config directory
3. Existing files are **skipped by default** to preserve your customizations
4. Use `--force` to overwrite with the latest versions

## Contributing

### Adding a new workflow

1. Add your `.md` file to `workflows/antigravity/`
2. Include YAML frontmatter with a `description` field:
   ```yaml
   ---
   description: Short description of the workflow
   ---
   ```
3. Submit a PR!

### Adding a new tool adapter

1. Create `src/adapters/<tool-name>.js`:
   ```js
   module.exports = {
     name: 'tool-name',
     displayName: 'Tool Name',
     targetDir: '~/.config/tool/workflows',
     workflowsDir: 'tool-name',
   };
   ```
2. Create `workflows/<tool-name>/` directory with workflow files
3. Register in `src/adapters/index.js`
4. Submit a PR!

## Requirements

- Node.js >= 18

## License

MIT © rio
