# Phase 3: Adapter System

## Objective

Create the adapter interface, the Antigravity adapter, and the adapter registry.

## Preconditions

- Phase 2 complete (utilities exist)

## Tasks

### Task 3.1: Create Antigravity adapter (`src/adapters/antigravity.js`)

```js
module.exports = {
  name: 'antigravity',
  displayName: 'Antigravity',
  targetDir: '~/.gemini/antigravity/global_workflows',
  workflowsDir: 'antigravity',
};
```

### Task 3.2: Create adapter registry (`src/adapters/index.js`)

```js
const antigravity = require('./antigravity');

const adapters = [antigravity];

module.exports = {
  getAll() → Adapter[]
  getByName(name) → Adapter | undefined
  getDefault() → Adapter | null  // returns single adapter if only one, null if multiple
};
```

### Task 3.3: Create adapter resolver logic

When a command is invoked, resolve which adapter to use:

1. If `--tool <name>` is provided → lookup by name, error if not found
2. If only 1 adapter exists → auto-pick
3. If multiple adapters exist and no `--tool` → print available tools and exit

## Verification

- Commands:
  - `node -e "const { getAll, getByName } = require('./src/adapters'); console.log(getAll().map(a => a.name));"`
  - `node -e "const { getByName } = require('./src/adapters'); console.log(getByName('antigravity').targetDir);"`
- Expected results:
  - `getAll()` returns `['antigravity']`
  - `getByName('antigravity')` returns the adapter object
  - `getByName('unknown')` returns `undefined`

## Exit Criteria

- [x] `src/adapters/antigravity.js` created
- [x] `src/adapters/index.js` created with registry methods
- [x] Adapter resolution logic documented and ready for CLI
