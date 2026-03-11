'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { getAll, getByName, getDefault } = require('../../src/adapters');

describe('Adapter Registry', () => {
  it('getAll() should return non-empty array', () => {
    const all = getAll();
    assert.ok(Array.isArray(all));
    assert.ok(all.length > 0);
  });

  it('getByName("antigravity") should return the Antigravity adapter', () => {
    const adapter = getByName('antigravity');
    assert.ok(adapter);
    assert.equal(adapter.name, 'antigravity');
    assert.equal(adapter.displayName, 'Antigravity');
    assert.equal(adapter.targetDir, '~/.gemini/antigravity/global_workflows');
    assert.equal(adapter.workflowsDir, 'antigravity');
  });

  it('getByName("unknown") should return undefined', () => {
    const adapter = getByName('unknown');
    assert.equal(adapter, undefined);
  });

  it('every adapter should have required fields', () => {
    const requiredFields = ['name', 'displayName', 'targetDir', 'workflowsDir'];
    for (const adapter of getAll()) {
      for (const field of requiredFields) {
        assert.ok(adapter[field], `Adapter "${adapter.name || 'unknown'}" missing field: ${field}`);
      }
    }
  });

  it('getDefault() should return single adapter when only one exists', () => {
    const defaultAdapter = getDefault();
    // Currently only Antigravity is registered
    assert.ok(defaultAdapter);
    assert.equal(defaultAdapter.name, 'antigravity');
  });
});
