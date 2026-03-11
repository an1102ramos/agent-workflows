'use strict';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const install = require('../../src/commands/install');
const { getByName } = require('../../src/adapters');

describe('install command', () => {
  let tmpDir;
  let testAdapter;

  before(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rioagentflow-install-test-'));
    // Create a test adapter that writes to our temp dir
    testAdapter = {
      ...getByName('antigravity'),
      targetDir: tmpDir,
    };
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('should install all workflow files to empty directory', () => {
    install(testAdapter, { force: false });
    const files = fs.readdirSync(tmpDir).filter((f) => f.endsWith('.md'));
    assert.ok(files.length > 0, 'Should have installed at least one file');
    assert.ok(files.includes('ask.md'), 'Should include ask.md');
    assert.ok(files.includes('brainstorm.md'), 'Should include brainstorm.md');
  });

  it('should skip existing files without --force', () => {
    // Write a custom file
    const customPath = path.join(tmpDir, 'ask.md');
    fs.writeFileSync(customPath, '# My custom ask workflow');

    install(testAdapter, { force: false });

    // Custom file should be preserved
    const content = fs.readFileSync(customPath, 'utf-8');
    assert.equal(content, '# My custom ask workflow');
  });

  it('should overwrite existing files with --force', () => {
    const customPath = path.join(tmpDir, 'ask.md');
    fs.writeFileSync(customPath, '# My custom ask workflow');

    install(testAdapter, { force: true });

    // File should now have package content, not custom content
    const content = fs.readFileSync(customPath, 'utf-8');
    assert.notEqual(content, '# My custom ask workflow');
    assert.ok(content.includes('---'), 'Should have YAML frontmatter');
  });

  it('should create target directory if missing', () => {
    const nestedDir = path.join(tmpDir, 'nested', 'deep');
    const nestedAdapter = { ...testAdapter, targetDir: nestedDir };

    install(nestedAdapter, { force: false });

    assert.ok(fs.existsSync(nestedDir));
    const files = fs.readdirSync(nestedDir).filter((f) => f.endsWith('.md'));
    assert.ok(files.length > 0);
  });
});
