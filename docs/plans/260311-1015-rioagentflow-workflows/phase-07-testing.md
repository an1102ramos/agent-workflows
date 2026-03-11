# Phase 7: Testing

## Objective

Create unit tests using `node:test` built-in module and an integration test script.

## Preconditions

- Phase 4 complete (all commands implemented)
- Node.js >= 18

## Tasks

### Task 7.1: Create FS utility tests (`tests/utils/fs.test.js`)

Test cases:
- `expandHome('~/test')` → `os.homedir() + '/test'`
- `expandHome('/absolute/path')` → unchanged
- `ensureDir()` creates nested directories
- `getWorkflowFiles()` returns `.md` files only
- `copyFile()` copies file to destination
- `copyFile()` skips if exists and force=false
- `copyFile()` overwrites if force=true
- `deleteFile()` removes existing file
- `deleteFile()` returns 'not_found' for missing file

### Task 7.2: Create adapter tests (`tests/adapters/registry.test.js`)

Test cases:
- `getAll()` returns non-empty array
- `getByName('antigravity')` returns correct adapter
- `getByName('unknown')` returns undefined
- Every adapter has required fields: name, displayName, targetDir, workflowsDir

### Task 7.3: Create install command tests (`tests/commands/install.test.js`)

Test cases:
- Install to empty directory → all files copied
- Install to directory with existing files → existing files skipped
- Install with `--force` → existing files overwritten
- Target directory created automatically if missing

### Task 7.4: Create uninstall command tests (`tests/commands/uninstall.test.js`)

Test cases:
- Uninstall removes managed files
- Uninstall skips files that don't exist
- Non-managed files are not touched

### Task 7.5: Create list command tests (`tests/commands/list.test.js`)

Test cases:
- List outputs all adapter names
- List outputs all workflow filenames

### Task 7.6: Create integration test script (`tests/integration.sh`)

```bash
#!/bin/bash
# End-to-end test using a temp directory
# 1. Set HOME to temp dir
# 2. Run install → verify files created
# 3. Run install again → verify skip
# 4. Run install --force → verify overwrite
# 5. Run list → verify output
# 6. Run uninstall → verify files removed
# 7. Cleanup
```

## Verification

- Commands:
  - `npm test` — all unit tests pass
  - `bash tests/integration.sh` — integration test passes
- Expected results:
  - All tests green
  - No test depends on real `~/.gemini/` directory (uses temp dirs)

## Exit Criteria

- [x] All unit test files created
- [x] `npm test` passes
- [x] Integration test script created and passes
- [x] Tests use temp directories (no side effects on real system)
