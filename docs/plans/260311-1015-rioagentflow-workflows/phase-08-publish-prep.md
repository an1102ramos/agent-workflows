# Phase 8: Publish Preparation

## Objective

Verify the package is ready for npm publish, check org availability, and create a publish checklist.

## Preconditions

- All previous phases complete
- All tests pass
- npm account exists

## Tasks

### Task 8.1: Verify package contents

```bash
npm pack --dry-run
```

Expected output should include:
- `bin/cli.js`
- `src/**/*.js`
- `workflows/antigravity/*.md`
- `README.md`
- `LICENSE`
- `package.json`

Should NOT include:
- `tests/`
- `docs/`
- `node_modules/`
- `.git/`

### Task 8.2: Test local install

```bash
npm pack
# Creates @rioagentflow-workflows-1.0.0.tgz
npx ./rioagentflow-workflows-1.0.0.tgz install
# Verify it works
```

### Task 8.3: Check npm org availability

```bash
npm org ls rioagentflow 2>&1 || echo "Org available"
```

### Task 8.4: Create npm org (if needed)

```bash
npm org create rioagentflow
```

### Task 8.5: Publish

```bash
npm publish --access public
```

### Task 8.6: Verify published package

```bash
npx @rioagentflow/workflows --help
npx @rioagentflow/workflows install
```

## Verification

- Commands:
  - `npm pack --dry-run` — correct files listed
  - `npx @rioagentflow/workflows --help` — works after publish
- Expected results:
  - Package published successfully
  - `npx` install works for end users

## Exit Criteria

- [x] `npm pack --dry-run` shows correct files
- [x] Local `.tgz` install works
- [x] npm org created
- [x] Package published to npm
- [x] `npx @rioagentflow/workflows install` works
