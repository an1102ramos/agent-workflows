# Phase 4: CLI Commands

## Objective

Implement the three CLI commands (`install`, `list`, `uninstall`) and the main CLI entry point with argument parsing.

## Preconditions

- Phase 2 and 3 complete (utilities + adapters exist)

## Tasks

### Task 4.1: Create install command (`src/commands/install.js`)

```js
// install(adapter, options) → void
// options: { force: boolean }

// Logic:
// 1. Resolve source dir: path.join(__dirname, '../../workflows', adapter.workflowsDir)
// 2. Resolve target dir: expandHome(adapter.targetDir)
// 3. Ensure target dir exists
// 4. Get list of workflow files from source
// 5. For each file:
//    - If exists in target and !force → skip
//    - Otherwise → copy
// 6. Print summary: N installed, N skipped
```

### Task 4.2: Create list command (`src/commands/list.js`)

```js
// list() → void

// Logic:
// 1. For each adapter:
//    - Print adapter displayName
//    - Get workflow files from workflows/{adapter.workflowsDir}/
//    - Print each file name with description (from frontmatter)
```

### Task 4.3: Create uninstall command (`src/commands/uninstall.js`)

```js
// uninstall(adapter) → void

// Logic:
// 1. Resolve target dir: expandHome(adapter.targetDir)
// 2. Get list of workflow files from package's workflows dir (only managed files)
// 3. For each file:
//    - If exists in target → delete
//    - If not found → skip
// 4. Print summary: N removed, N skipped
```

### Task 4.4: Create CLI entry point (`bin/cli.js`)

```js
#!/usr/bin/env node

// 1. Parse process.argv:
//    - command: args[0] → 'install' | 'list' | 'uninstall'
//    - flags: --force, --tool <name>, --help
//
// 2. Route to command:
//    - 'install' → resolve adapter → install(adapter, { force })
//    - 'list' → list()
//    - 'uninstall' → resolve adapter → uninstall(adapter)
//    - '--help' or unknown → showHelp()
//
// 3. Error handling:
//    - Catch all errors, print friendly message, exit(1)
```

### Task 4.5: Create help output

```
Usage: @rioagentflow/workflows <command> [options]

Commands:
  install     Install workflow files to your AI tool
  list        List available workflows
  uninstall   Remove installed workflow files

Options:
  --tool <name>   Specify target tool (e.g. antigravity)
  --force         Overwrite existing files
  --help          Show this help message

Examples:
  npx @rioagentflow/workflows install
  npx @rioagentflow/workflows install --force
  npx @rioagentflow/workflows install --tool antigravity
  npx @rioagentflow/workflows list
  npx @rioagentflow/workflows uninstall
```

## Verification

- Commands:
  - `node bin/cli.js --help` — should print help
  - `node bin/cli.js install` — should install to `~/.gemini/antigravity/global_workflows/`
  - `node bin/cli.js list` — should list 9 workflows
  - `node bin/cli.js uninstall` — should remove installed files
  - `node bin/cli.js unknown` — should print help + error
- Expected results:
  - All commands execute without errors
  - Output is colored and well-formatted
  - Exit codes: 0 for success, 1 for errors

## Exit Criteria

- [x] `bin/cli.js` created with shebang and arg parsing
- [x] `src/commands/install.js` copies files correctly
- [x] `src/commands/list.js` lists workflows
- [x] `src/commands/uninstall.js` removes files
- [x] `--force` flag works
- [x] `--tool` flag works
- [x] `--help` shows usage
- [x] Error cases handled gracefully
