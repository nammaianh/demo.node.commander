'use strict';

const joi = require('joi');

const validateCommandRegistry = require('./validateCommandRegistry');

/**
 * A group of commands must satisfy these requirements:
 * 1. Must be an array of functions
 * 2. Each function must have a property called "registry"
 * 3. Property "registry" must be valid
 *
 * @param {Array<Function>} cmdGroupAbsPath A group of commands
 */
module.exports = function validateLoadedCommandGroup (cmdGroupAbsPath) {
  // TODO: Implementation
};
