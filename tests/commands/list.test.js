'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

const CLI = path.join(__dirname, '../../bin/cli.js');

describe('list command', () => {
  it('should output adapter names', () => {
    const output = execFileSync('node', [CLI, 'list'], { encoding: 'utf-8' });
    assert.ok(output.includes('Antigravity'), 'Should include Antigravity');
  });

  it('should output workflow filenames', () => {
    const output = execFileSync('node', [CLI, 'list'], { encoding: 'utf-8' });
    assert.ok(output.includes('ask'), 'Should include ask workflow');
    assert.ok(output.includes('brainstorm'), 'Should include brainstorm workflow');
    assert.ok(output.includes('write-plan'), 'Should include write-plan workflow');
  });

  it('should show workflow count', () => {
    const output = execFileSync('node', [CLI, 'list'], { encoding: 'utf-8' });
    assert.ok(output.includes('9 workflows'), 'Should show 9 workflows');
  });
});
