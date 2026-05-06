'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { expandHome, ensureDir, getWorkflowFiles, copyFile } = require('../utils/fs');
const logger = require('../utils/logger');

/**
 * Install workflow files for a given adapter.
 * @param {object} adapter - The adapter object
 * @param {{ force: boolean }} options
 */
function installToDir(sourceDir, targetDir, files, { force = false }) {
  let installed = 0;
  let skipped = 0;

  ensureDir(targetDir);

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

  return { installed, skipped };
}

function installAsSkills(sourceDir, skillsDir, files, { force = false }) {
  let installed = 0;
  let skipped = 0;

  ensureDir(skillsDir);

  for (const file of files) {
    const skillName = path.basename(file, '.md');
    const skillDir = path.join(skillsDir, skillName);
    const src = path.join(sourceDir, file);
    const dest = path.join(skillDir, 'SKILL.md');

    ensureDir(skillDir);

    const result = copyFile(src, dest, { force });

    switch (result.status) {
      case 'copied':
        logger.success(`${skillName}/SKILL.md`);
        installed++;
        break;
      case 'overwritten':
        logger.success(`${skillName}/SKILL.md ${logger.dim || ''}(overwritten)`);
        installed++;
        break;
      case 'skipped':
        logger.skip(`${skillName}/SKILL.md (already exists, use --force to overwrite)`);
        skipped++;
        break;
    }
  }

  return { installed, skipped };
}

function install(adapter, { force = false } = {}) {
  const sourceDir = path.join(__dirname, '../../workflows', adapter.workflowsDir);
  const targetDir = expandHome(adapter.targetDir);

  logger.heading(`🚀 Installing ${adapter.displayName} workflows...`);

  const files = getWorkflowFiles(sourceDir);

  if (files.length === 0) {
    logger.error(`No workflow files found for ${adapter.displayName}`);
    process.exit(1);
  }

  const { installed, skipped } = installToDir(sourceDir, targetDir, files, { force });

  logger.summary(installed, skipped, 'installed');
  logger.info(`Target: ${targetDir}`);
  logger.newline();

  const claudeDir = expandHome('~/.claude');
  if (fs.existsSync(claudeDir)) {
    const claudeSkillsDir = path.join(claudeDir, 'skills');
    logger.heading(`📋 Detected ~/.claude — installing to Claude skills...`);

    const result = installAsSkills(sourceDir, claudeSkillsDir, files, { force });

    logger.summary(result.installed, result.skipped, 'installed');
    logger.info(`Target: ${claudeSkillsDir}`);
    logger.newline();
  }
}

module.exports = install;
