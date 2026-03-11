# Phase 2: Core Utilities

## Objective

Create the logger (colored console output) and filesystem helpers (path expansion, copy, delete).

## Preconditions

- Phase 1 complete (project scaffold exists)

## Tasks

### Task 2.1: Create logger (`src/utils/logger.js`)

Implement a simple logger with ANSI color codes (no dependencies):

```js
// ANSI codes
const colors = { green, red, yellow, cyan, dim, bold, reset };

// Methods
logger.success(msg)   // ✓ green
logger.skip(msg)      // ⊘ yellow
logger.error(msg)     // ✗ red
logger.info(msg)      // cyan
logger.heading(msg)   // bold
logger.newline()      // empty line
```

### Task 2.2: Create FS helpers (`src/utils/fs.js`)

```js
// Expand ~ to os.homedir()
expandHome(filePath) → string

// Ensure directory exists (recursive)
ensureDir(dirPath) → void

// Get list of .md files in a directory
getWorkflowFiles(dirPath) → string[]

// Copy a single file, respecting force flag
copyFile(src, dest, { force }) → { status: 'copied' | 'skipped' | 'overwritten' }

// Delete a single file
deleteFile(filePath) → { status: 'removed' | 'not_found' }
```

## Verification

- Commands:
  - `node -e "const logger = require('./src/utils/logger'); logger.success('test'); logger.skip('test'); logger.error('test');"` — should print colored output
  - `node -e "const { expandHome } = require('./src/utils/fs'); console.log(expandHome('~/test'))"` — should print `/Users/rio/test`
- Expected results:
  - Logger prints colored output
  - `expandHome` resolves `~` correctly
  - No external dependencies used

## Exit Criteria

- [x] `src/utils/logger.js` created with colored output methods
- [x] `src/utils/fs.js` created with all helper functions
- [x] Both modules work standalone
