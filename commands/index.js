'use strict';

const path                   = require('path');
const fs                     = require('fs');
const validateLoadedCommands = require('./validateLoadedCommands');

module.exports = { registerCommands };

//
// ─── PUBLIC FUNCTIONS ───────────────────────────────────────────────────────────
//

/**
 * Register a list of commands.
 *
 * @param {Program}
 * @param {Array<Array<Function>>} commands Array of command lists
 */
function registerCommands (program) {
  const commands = loadCommands();
  for (const cmd of commands)
    registerCommand(program, cmd);
}

//
// ─── PRIVATE FUNCTIONS ──────────────────────────────────────────────────────────
//

function loadCommands () {
  const itemsOnThisDir = fs.readdirSync(__dirname);
  const cmds           = [];

  itemsOnThisDir
    .map(buildCmdGroupAbsPath)
    .filter(pathIsDirectory)
    .map(loadCommandGroup)
    .forEach(loadedCmds => cmds.push(...loadedCmds));

  return cmds;
}

function buildCmdGroupAbsPath (cmdGroupName) {
  return path.join(__dirname, cmdGroupName);
}

function pathIsDirectory (absPath) {
  return fs.statSync(absPath).isDirectory();
}

function loadCommandGroup (cmdGroupAbsPath) {
  const cmds = require(cmdGroupAbsPath);
  validateLoadedCommands(cmds);
  return cmds;
}

function registerCommand (program, cmd) {
  const { name, description, options = [] } = cmd.registry;

  const registeredCmd = program
    .command(name)
    .description(description)
    .action(cmd);

  for (const { flag, description, coercion, regex, initValue, defaultValue } of options) {
    if (coercion)
      registeredCmd.option(flag, description, coercion, initValue);
    else if (regex)
      registeredCmd.option(flag, description, regex, defaultValue);
    else
      registeredCmd.option(flag, description, defaultValue);
  }
}
