'use strict';

const path = require('node:path');
const fs = require('node:fs');
const { getWorkflowFiles } = require('../utils/fs');
const logger = require('../utils/logger');
const adapters = require('../adapters');

/**
 * Parse YAML frontmatter description from a workflow file.
 * @param {string} filePath
 * @returns {string}
 */
function parseDescription(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/^---\s*\n[\s\S]*?description:\s*(.+)\n[\s\S]*?---/);
    return match ? match[1].trim() : '';
  } catch {
    return '';
  }
}

/**
 * List all available workflows grouped by adapter.
 */
function list() {
  const allAdapters = adapters.getAll();

  logger.heading('📋 Available Workflows');
  logger.newline();

  for (const adapter of allAdapters) {
    const sourceDir = path.join(__dirname, '../../workflows', adapter.workflowsDir);
    const files = getWorkflowFiles(sourceDir);

    console.log(`  ${adapter.displayName} (${files.length} workflows)`);
    console.log(`  Target: ${adapter.targetDir}`);
    console.log('');

    for (const file of files) {
      const filePath = path.join(sourceDir, file);
      const desc = parseDescription(filePath);
      const name = file.replace('.md', '');
      if (desc) {
        console.log(`    • ${name} — ${desc}`);
      } else {
        console.log(`    • ${name}`);
      }
    }

    logger.newline();
  }
}

module.exports = list;
