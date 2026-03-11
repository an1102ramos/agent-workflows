'use strict';

const antigravity = require('./antigravity');

const adapters = [antigravity];

module.exports = {
  /**
   * Get all registered adapters.
   * @returns {Array}
   */
  getAll() {
    return adapters;
  },

  /**
   * Get an adapter by its name.
   * @param {string} name
   * @returns {object|undefined}
   */
  getByName(name) {
    return adapters.find((a) => a.name === name);
  },

  /**
   * Get the default adapter (auto-pick if only one is registered).
   * Returns null if multiple adapters exist (user must specify --tool).
   * @returns {object|null}
   */
  getDefault() {
    return adapters.length === 1 ? adapters[0] : null;
  },
};
