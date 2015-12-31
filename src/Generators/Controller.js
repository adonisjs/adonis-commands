'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const utils = require('./helpers')
const path = require('path')
const Ioc = require('adonis-fold').Ioc
const controllerString = require('./strings').controller
const methods = ['index', 'create', 'store', 'show', 'update', 'destroy']

let Controller = exports = module.exports = {}

Controller.description = "Generate a new controller file by passing it's name"
Controller.signature = '{name:controller name} {--plain?}'

/**
 * @description handle method that will be invoked by ace when
 * this command is executed
 * @method
 * @param  {Object} options
 * @param  {Object} flags
 * @return {void}
 * @public
 */
Controller.handle = function * (options, flags) {
  const Helpers = Ioc.use('Adonis/Src/Helpers')
  const Ansi = Ioc.use('Adonis/Src/Ansi')
  const plain = flags.plain || false
  const name = `${utils.makeName(options.name, 'Controller')}`
  const controllerPath = path.join(Helpers.appPath(), `/Http/Controllers/${name}.js`)
  let formattedControllerString = controllerString

  methods.forEach(function (method) {
    if (plain) {
      formattedControllerString = formattedControllerString.replace(`{{${method}}}`, '')
    } else {
      formattedControllerString = formattedControllerString.replace(`{{${method}}}`, utils.makeControllerMethod(method))
    }
  })

  try {
    const response = yield utils.generateBlueprint(formattedControllerString, controllerPath, name)
    Ansi.success(response)
  } catch (e) {
    Ansi.error(e.message)
  }
}
