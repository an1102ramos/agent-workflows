# Phase 5: Workflow Content

## Objective

Copy the 9 existing Antigravity workflow files into the package's `workflows/antigravity/` directory.

## Preconditions

- Phase 1 complete (directory structure exists)
- Source files exist at `/Users/rio/.gemini/antigravity/global_workflows/`

## Tasks

### Task 5.1: Copy all workflow files

Copy files from source to `workflows/antigravity/`:

| Source | Destination |
|---|---|
| `~/.gemini/antigravity/global_workflows/ask.md` | `workflows/antigravity/ask.md` |
| `~/.gemini/antigravity/global_workflows/bootstrap.md` | `workflows/antigravity/bootstrap.md` |
| `~/.gemini/antigravity/global_workflows/brainstorm.md` | `workflows/antigravity/brainstorm.md` |
| `~/.gemini/antigravity/global_workflows/docs.md` | `workflows/antigravity/docs.md` |
| `~/.gemini/antigravity/global_workflows/execute-plan.md` | `workflows/antigravity/execute-plan.md` |
| `~/.gemini/antigravity/global_workflows/fix.md` | `workflows/antigravity/fix.md` |
| `~/.gemini/antigravity/global_workflows/quick-implement.md` | `workflows/antigravity/quick-implement.md` |
| `~/.gemini/antigravity/global_workflows/review.md` | `workflows/antigravity/review.md` |
| `~/.gemini/antigravity/global_workflows/write-plan.md` | `workflows/antigravity/write-plan.md` |

### Task 5.2: Verify file content integrity

Ensure all files are copied correctly and maintain their original content (YAML frontmatter + markdown body).

## Verification

- Commands:
  - `ls workflows/antigravity/` — should list 9 `.md` files
  - `diff ~/.gemini/antigravity/global_workflows/ask.md workflows/antigravity/ask.md` — should show no differences
  - `wc -l workflows/antigravity/*.md` — line counts should match source
- Expected results:
  - 9 files present in `workflows/antigravity/`
  - Content matches source files exactly

## Exit Criteria

- [x] All 9 workflow files copied to `workflows/antigravity/`
- [x] File contents match source exactly
