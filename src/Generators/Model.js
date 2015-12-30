'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const utils = require('./helpers')
const path = require('path')
const Ioc = require('adonis-fold').Ioc
const modelString = require('./strings').model

let Model = exports = module.exports = {}

Model.description = 'Generate a new Database Model'
Model.signature = '{name:Model name you wish to use}'

/**
 * @description handle method that will be invoked by ace when
 * this command is executed
 * @method
 * @param  {Object} options
 * @param  {Object} flags
 * @return {void}
 * @public
 */
Model.handle = function * (options, flags) {
  const Helpers = Ioc.use('Adonis/Src/Helpers')
  const Console = Ioc.use('Adonis/Src/Console')
  const name = `${utils.makeName(options.name, 'Model', true)}`
  const modelPath = path.join(Helpers.appPath(), `Model/${name}.js`)
  try{
    const response = yield utils.generateBlueprint(modelString, modelPath, name)
    Console.success(response)
  }
  catch (e) {
    Console.error(e.message)
  }
}
