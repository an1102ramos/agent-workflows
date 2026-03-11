'use strict';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { expandHome, ensureDir, getWorkflowFiles, copyFile, deleteFile } = require('../../src/utils/fs');

describe('expandHome', () => {
  it('should expand ~ to home directory', () => {
    const result = expandHome('~/test');
    assert.equal(result, path.join(os.homedir(), 'test'));
  });

  it('should expand ~/nested/path', () => {
    const result = expandHome('~/a/b/c');
    assert.equal(result, path.join(os.homedir(), 'a/b/c'));
  });

  it('should not modify absolute paths', () => {
    const result = expandHome('/absolute/path');
    assert.equal(result, '/absolute/path');
  });

  it('should not modify relative paths', () => {
    const result = expandHome('relative/path');
    assert.equal(result, 'relative/path');
  });
});

describe('ensureDir', () => {
  let tmpDir;

  before(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rioagentflow-test-'));
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('should create nested directories', () => {
    const nestedDir = path.join(tmpDir, 'a', 'b', 'c');
    ensureDir(nestedDir);
    assert.ok(fs.existsSync(nestedDir));
  });

  it('should not throw if directory already exists', () => {
    const existingDir = path.join(tmpDir, 'existing');
    fs.mkdirSync(existingDir);
    assert.doesNotThrow(() => ensureDir(existingDir));
  });
});

describe('getWorkflowFiles', () => {
  let tmpDir;

  before(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rioagentflow-test-'));
    fs.writeFileSync(path.join(tmpDir, 'workflow1.md'), '# Test');
    fs.writeFileSync(path.join(tmpDir, 'workflow2.md'), '# Test');
    fs.writeFileSync(path.join(tmpDir, 'readme.txt'), 'not a workflow');
    fs.writeFileSync(path.join(tmpDir, 'script.js'), '// not a workflow');
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('should return only .md files', () => {
    const files = getWorkflowFiles(tmpDir);
    assert.equal(files.length, 2);
    assert.ok(files.includes('workflow1.md'));
    assert.ok(files.includes('workflow2.md'));
  });

  it('should return empty array for non-existent directory', () => {
    const files = getWorkflowFiles('/non/existent/dir');
    assert.deepEqual(files, []);
  });
});

describe('copyFile', () => {
  let tmpDir;
  let srcFile;

  before(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rioagentflow-test-'));
    srcFile = path.join(tmpDir, 'source.md');
    fs.writeFileSync(srcFile, '# Source content');
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('should copy file to destination', () => {
    const dest = path.join(tmpDir, 'dest1.md');
    const result = copyFile(srcFile, dest);
    assert.equal(result.status, 'copied');
    assert.ok(fs.existsSync(dest));
    assert.equal(fs.readFileSync(dest, 'utf-8'), '# Source content');
  });

  it('should skip if file exists and force=false', () => {
    const dest = path.join(tmpDir, 'dest2.md');
    fs.writeFileSync(dest, '# Existing');
    const result = copyFile(srcFile, dest, { force: false });
    assert.equal(result.status, 'skipped');
    assert.equal(fs.readFileSync(dest, 'utf-8'), '# Existing');
  });

  it('should overwrite if file exists and force=true', () => {
    const dest = path.join(tmpDir, 'dest3.md');
    fs.writeFileSync(dest, '# Existing');
    const result = copyFile(srcFile, dest, { force: true });
    assert.equal(result.status, 'overwritten');
    assert.equal(fs.readFileSync(dest, 'utf-8'), '# Source content');
  });
});

describe('deleteFile', () => {
  let tmpDir;

  before(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rioagentflow-test-'));
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('should remove existing file', () => {
    const filePath = path.join(tmpDir, 'to-delete.md');
    fs.writeFileSync(filePath, '# Delete me');
    const result = deleteFile(filePath);
    assert.equal(result.status, 'removed');
    assert.ok(!fs.existsSync(filePath));
  });

  it('should return not_found for missing file', () => {
    const result = deleteFile(path.join(tmpDir, 'nonexistent.md'));
    assert.equal(result.status, 'not_found');
  });
});
