'use strict';

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

/**
 * Expand ~ to the user's home directory.
 * @param {string} filePath
 * @returns {string}
 */
function expandHome(filePath) {
  if (filePath.startsWith('~')) {
    return path.join(os.homedir(), filePath.slice(1));
  }
  return filePath;
}

/**
 * Ensure a directory exists, creating it recursively if needed.
 * @param {string} dirPath
 */
function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

/**
 * Get list of .md files in a directory.
 * @param {string} dirPath
 * @returns {string[]} Array of filenames (not full paths)
 */
function getWorkflowFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs.readdirSync(dirPath).filter((f) => f.endsWith('.md'));
}

/**
 * Copy a single file, respecting the force flag.
 * @param {string} src - Source file path
 * @param {string} dest - Destination file path
 * @param {{ force: boolean }} options
 * @returns {{ status: 'copied' | 'skipped' | 'overwritten' }}
 */
function copyFile(src, dest, { force = false } = {}) {
  const exists = fs.existsSync(dest);

  if (exists && !force) {
    return { status: 'skipped' };
  }

  fs.copyFileSync(src, dest);
  return { status: exists ? 'overwritten' : 'copied' };
}

/**
 * Delete a single file.
 * @param {string} filePath
 * @returns {{ status: 'removed' | 'not_found' }}
 */
function deleteFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { status: 'not_found' };
  }
  fs.unlinkSync(filePath);
  return { status: 'removed' };
}

module.exports = {
  expandHome,
  ensureDir,
  getWorkflowFiles,
  copyFile,
  deleteFile,
};
