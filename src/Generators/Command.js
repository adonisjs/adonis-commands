'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const utils = require('./helpers')
const path = require('path')
const Ioc = require('adonis-fold').Ioc
const commandString = require('./strings').command

let Command = exports = module.exports = {}

Command.description = "Generate a new ace command file by passing it's name"
Command.signature = '{name:command name you want to use}'

/**
 * @description handle method that will be invoked by ace when
 * this command is executed
 * @method
 * @param  {Object} options
 * @param  {Object} flags
 * @return {void}
 * @public
 */
Command.handle = function * (options, flags) {
  const Helpers = Ioc.use('Adonis/Src/Helpers')
  const Ansi = Ioc.use('Adonis/Src/Ansi')
  const name = `${utils.makeName(options.name, 'Command', true)}`
  const commandPath = path.join(Helpers.appPath(), `/Commands/${name}.js`)
  try {
    const response = yield utils.generateBlueprint(commandString, commandPath, name)
    Ansi.success(response)
  } catch (e) {
    Ansi.error(e.message)
  }
}
