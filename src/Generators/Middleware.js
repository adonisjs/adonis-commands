'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const utils = require('./helpers')
const path = require('path')
const Ioc = require('adonis-fold').Ioc
const middlewareString = require('./strings').middleware

let Middleware = exports = module.exports = {}

Middleware.description = 'Generate a new HTTP middleware'
Middleware.signature = '{name:Middleware name you wish to use}'

/**
 * @description handle method that will be invoked by ace when
 * this command is executed
 * @method
 * @param  {Object} options
 * @param  {Object} flags
 * @return {void}
 * @public
 */
Middleware.handle = function * (options, flags) {
  const Helpers = Ioc.use('Adonis/Src/Helpers')
  const Console = Ioc.use('Adonis/Src/Console')
  const name = `${utils.makeName(options.name, 'Middleware', true)}`
  const middlewarePath = path.join(Helpers.appPath(), `/Http/Middleware/${name}.js`)
  try{
    const response = yield utils.generateBlueprint(middlewareString, middlewarePath, name)
    Console.success(response)
  }
  catch (e) {
    Console.error(e.message)
  }
}
