'use strict';

const path                       = require('path');
const fs                         = require('fs');
const validateLoadedCommandGroup = require('./validateLoadedCommandGroup');

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
  const loadedCmds     = [];

  itemsOnThisDir
    .map(buildCmdGroupAbsPath)
    .filter(pathIsDirectory)
    .map(loadCommandGroup)
    .forEach(newCmds => loadedCmds.push(...newCmds));

  return loadedCmds;
}

function buildCmdGroupAbsPath (cmdGroupName) {
  return path.join(__dirname, cmdGroupName);
}

function pathIsDirectory (absPath) {
  return fs.statSync(absPath).isDirectory();
}

function loadCommandGroup (cmdGroupAbsPath) {
  const cmds = require(cmdGroupAbsPath);
  validateLoadedCommandGroup(cmds);
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
