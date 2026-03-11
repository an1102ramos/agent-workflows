# Phase 1: Project Scaffold

## Objective

Initialize the npm project with the correct directory structure, `package.json`, and `.gitignore`.

## Preconditions

- Node.js >= 18 installed
- Working directory: `/Users/rio/project/antigravity-workflows/`

## Tasks

### Task 1.1: Initialize npm project

1. Run `npm init -y` in the project root
2. Update `package.json` with correct values:

```json
{
  "name": "@rioagentflow/workflows",
  "version": "1.0.0",
  "description": "Ready-to-use AI agent workflows for Antigravity, Cursor, and more.",
  "main": "bin/cli.js",
  "bin": {
    "rioagentflow-workflows": "./bin/cli.js"
  },
  "files": [
    "bin/",
    "src/",
    "workflows/"
  ],
  "scripts": {
    "test": "node --test tests/**/*.test.js"
  },
  "keywords": [
    "antigravity", "workflows", "ai-agent", "cursor", "codex", "ai", "cli"
  ],
  "author": "rio",
  "license": "MIT",
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Task 1.2: Create directory structure

```
mkdir -p bin src/commands src/adapters src/utils workflows/antigravity tests/commands tests/adapters tests/utils
```

### Task 1.3: Create .gitignore

```
node_modules/
*.tgz
.DS_Store
```

### Task 1.4: Initialize git repo

```
git init
```

## Verification

- Commands:
  - `cat package.json` — verify fields
  - `ls -R` — verify directory structure
  - `node -e "const pkg = require('./package.json'); console.log(pkg.name)"` — should print `@rioagentflow/workflows`
- Expected results:
  - All directories exist
  - `package.json` has correct `name`, `bin`, `files` fields

## Exit Criteria

- [x] `package.json` exists with correct configuration
- [x] All directories created
- [x] `.gitignore` exists
- [x] Git repo initialized
