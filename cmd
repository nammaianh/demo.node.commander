#!/usr/bin/env node
'use strict';

const program         = require('commander');
const compareVersions = require('node-version-compare');
const commandsLoader  = require('./commands');
const { version }     = require('./package.json');

const NODE_VERSION_CUR = process.versions.node;
const NODE_VERSION_MIN = '8.0.0';
const VERSION_FLAG     = '-v, --version';

checkNodeVersion(NODE_VERSION_MIN);

// Register command option to output current version
program.version(version, VERSION_FLAG);

// Register commands defined in folder "commands/"
commandsLoader.registerCommands(program);

setupCommandNotFound(program);
setupShowHelpByDefault(program);

program.parse(process.argv);

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

function checkNodeVersion (minVer) {
  const notCompatible = compareVersions(NODE_VERSION_CUR, minVer) === -1;
  if (notCompatible) {
    console.error(`Required NodeJS minimum version: ${minVer}`);
    process.exit(1);
  }
}

function setupCommandNotFound (program) {
  program.on('command:*', function (args) {
    const wrongInput    = args.join(' ');
    const messageFormat = [
      'Invalid command: %s.',
      'See help for a list of available commands.'
    ].join('\n');
    const messageParams = [ wrongInput ];

    console.error(messageFormat, ...messageParams);
    process.exit(1);
  });
}

function setupShowHelpByDefault (program) {
  if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit();
  }
}
