#!/usr/bin/env node

'use strict';

const adapters = require('../src/adapters');
const install = require('../src/commands/install');
const list = require('../src/commands/list');
const uninstall = require('../src/commands/uninstall');
const logger = require('../src/utils/logger');

// --- Argument Parsing ---

const args = process.argv.slice(2);
const command = args.find((a) => !a.startsWith('-'));
const flags = {
  force: args.includes('--force'),
  help: args.includes('--help') || args.includes('-h'),
  version: args.includes('--version') || args.includes('-v'),
  tool: (() => {
    const idx = args.indexOf('--tool');
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
  })(),
};

// --- Help ---

function showHelp() {
  console.log(`
  @rioagentflow/workflows — AI agent workflow installer

  Usage: npx @rioagentflow/workflows <command> [options]

  Commands:
    install     Install workflow files to your AI tool
    list        List available workflows
    uninstall   Remove installed workflow files

  Options:
    --tool <name>   Specify target tool (e.g. antigravity)
    --force         Overwrite existing files
    --help, -h      Show this help message

  Examples:
    npx @rioagentflow/workflows install
    npx @rioagentflow/workflows install --force
    npx @rioagentflow/workflows install --tool antigravity
    npx @rioagentflow/workflows list
    npx @rioagentflow/workflows uninstall
`);
}

// --- Adapter Resolution ---

function resolveAdapter() {
  // If --tool is specified, look up by name
  if (flags.tool) {
    const adapter = adapters.getByName(flags.tool);
    if (!adapter) {
      logger.error(`Unknown tool "${flags.tool}".`);
      logger.newline();
      console.log('  Available tools:');
      for (const a of adapters.getAll()) {
        console.log(`    • ${a.name} — ${a.displayName}`);
      }
      logger.newline();
      process.exit(1);
    }
    return adapter;
  }

  // Auto-pick if only one adapter
  const defaultAdapter = adapters.getDefault();
  if (defaultAdapter) {
    return defaultAdapter;
  }

  // Multiple adapters, no --tool flag
  logger.error('Multiple tools available. Please specify with --tool:');
  logger.newline();
  for (const a of adapters.getAll()) {
    console.log(`    npx @rioagentflow/workflows ${command} --tool ${a.name}`);
  }
  logger.newline();
  process.exit(1);
}

// --- Main ---

function main() {
  try {
    if (flags.version) {
      const pkg = require('../package.json');
      console.log(`v${pkg.version}`);
      process.exit(0);
    }

    if (flags.help || !command) {
      showHelp();
      process.exit(0);
    }

    switch (command) {
      case 'install': {
        const adapter = resolveAdapter();
        install(adapter, { force: flags.force });
        break;
      }
      case 'list': {
        list();
        break;
      }
      case 'uninstall': {
        const adapter = resolveAdapter();
        uninstall(adapter);
        break;
      }
      default: {
        logger.error(`Unknown command "${command}".`);
        showHelp();
        process.exit(1);
      }
    }
  } catch (err) {
    if (err.code === 'EACCES') {
      logger.error(`Permission denied: Cannot write to target directory. Try using sudo.`);
    } else {
      logger.error(`Unexpected error: ${err.message}`);
    }
    process.exit(1);
  }
}

main();
