'use strict';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const uninstall = require('../../src/commands/uninstall');
const install = require('../../src/commands/install');
const { getByName } = require('../../src/adapters');

describe('uninstall command', () => {
  let tmpDir;
  let testAdapter;

  before(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rioagentflow-uninstall-test-'));
    testAdapter = {
      ...getByName('antigravity'),
      targetDir: tmpDir,
    };
    // First install the files
    install(testAdapter, { force: false });
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('should remove managed files', () => {
    // Verify files exist
    assert.ok(fs.existsSync(path.join(tmpDir, 'ask.md')));

    uninstall(testAdapter);

    // Managed files should be gone
    assert.ok(!fs.existsSync(path.join(tmpDir, 'ask.md')));
    assert.ok(!fs.existsSync(path.join(tmpDir, 'brainstorm.md')));
  });

  it('should not throw when files are already gone', () => {
    // Files were removed in previous test, running again should not throw
    assert.doesNotThrow(() => uninstall(testAdapter));
  });

  it('should not touch non-managed files', () => {
    // Create a custom file
    const customFile = path.join(tmpDir, 'my-custom-workflow.md');
    fs.writeFileSync(customFile, '# Custom');

    // Re-install then uninstall
    install(testAdapter, { force: false });
    uninstall(testAdapter);

    // Custom file should still exist
    assert.ok(fs.existsSync(customFile));
  });
});
