'use strict';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  reset: '\x1b[0m',
};

const logger = {
  success(msg) {
    console.log(`  ${colors.green}✓${colors.reset} ${msg}`);
  },

  skip(msg) {
    console.log(`  ${colors.yellow}⊘${colors.reset} ${msg}`);
  },

  error(msg) {
    console.log(`  ${colors.red}✗${colors.reset} ${msg}`);
  },

  info(msg) {
    console.log(`  ${colors.cyan}${msg}${colors.reset}`);
  },

  heading(msg) {
    console.log(`\n  ${colors.bold}${msg}${colors.reset}`);
  },

  newline() {
    console.log('');
  },

  summary(installed, skipped, action = 'installed') {
    const parts = [];
    if (installed > 0) parts.push(`${colors.green}${installed} ${action}${colors.reset}`);
    if (skipped > 0) parts.push(`${colors.yellow}${skipped} skipped${colors.reset}`);
    console.log(`\n  Done! ${parts.join(', ')}.`);
  },
};

module.exports = logger;
