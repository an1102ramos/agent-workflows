'use strict';

const path = require('node:path');
const { expandHome, getWorkflowFiles, deleteFile } = require('../utils/fs');
const logger = require('../utils/logger');

/**
 * Uninstall workflow files for a given adapter.
 * Only deletes files that are managed by this package (exist in workflows/ dir).
 * @param {object} adapter - The adapter object
 */
function uninstall(adapter) {
  const sourceDir = path.join(__dirname, '../../workflows', adapter.workflowsDir);
  const targetDir = expandHome(adapter.targetDir);

  logger.heading(`🗑  Removing ${adapter.displayName} workflows...`);

  // Get managed files (only files we shipped)
  const managedFiles = getWorkflowFiles(sourceDir);

  if (managedFiles.length === 0) {
    logger.error(`No workflow files found for ${adapter.displayName}`);
    process.exit(1);
  }

  let removed = 0;
  let skipped = 0;

  for (const file of managedFiles) {
    const targetPath = path.join(targetDir, file);
    const result = deleteFile(targetPath);

    switch (result.status) {
      case 'removed':
        logger.success(file);
        removed++;
        break;
      case 'not_found':
        logger.skip(`${file} (not found)`);
        skipped++;
        break;
    }
  }

  logger.summary(removed, skipped, 'removed');
  logger.newline();
}

module.exports = uninstall;
