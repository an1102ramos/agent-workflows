'use strict';

const path = require('node:path');
const { expandHome, ensureDir, getWorkflowFiles, copyFile } = require('../utils/fs');
const logger = require('../utils/logger');

/**
 * Install workflow files for a given adapter.
 * @param {object} adapter - The adapter object
 * @param {{ force: boolean }} options
 */
function install(adapter, { force = false } = {}) {
  const sourceDir = path.join(__dirname, '../../workflows', adapter.workflowsDir);
  const targetDir = expandHome(adapter.targetDir);

  logger.heading(`🚀 Installing ${adapter.displayName} workflows...`);

  ensureDir(targetDir);

  const files = getWorkflowFiles(sourceDir);

  if (files.length === 0) {
    logger.error(`No workflow files found for ${adapter.displayName}`);
    process.exit(1);
  }

  let installed = 0;
  let skipped = 0;

  for (const file of files) {
    const src = path.join(sourceDir, file);
    const dest = path.join(targetDir, file);
    const result = copyFile(src, dest, { force });

    switch (result.status) {
      case 'copied':
        logger.success(file);
        installed++;
        break;
      case 'overwritten':
        logger.success(`${file} ${logger.dim || ''}(overwritten)`);
        installed++;
        break;
      case 'skipped':
        logger.skip(`${file} (already exists, use --force to overwrite)`);
        skipped++;
        break;
    }
  }

  logger.summary(installed, skipped, 'installed');
  logger.info(`Target: ${targetDir}`);
  logger.newline();
}

module.exports = install;
