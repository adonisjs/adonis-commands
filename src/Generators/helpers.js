'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const changeCase = require('change-case')
const fs = require('co-fs-extra')
const pope = require('pope')

/**
 * @module helpers
 */
let helpers = exports = module.exports = {}

/**
 * @description this method returns a properly formatted name for any
 * given entity , see below example
 * @method makeName
 * @example
 *
 *  User - Controller           = UserController
 *  userController - Controller = UserController
 *  USER - Controller           = UserController
 *  user - Controller           = UserController
 *
 * 	user - Model - true         = User
 * 	userModel - Model - true    = User
 * 	UserModel - Model - true    = User
 * 	user_model - Model - true   = User
 *
 * @param  {String} name
 * @param  {String} entity
 * @param  {Boolean} replace
 * @return {String}
 * @public
 */
helpers.makeName = function (name, entity, replace) {
  name = changeCase.snakeCase(name).replace(entity.toLowerCase(), '')
  let entityName = replace ? changeCase.pascalCase(`${name}`) : changeCase.pascalCase(`${name}${entity}`)
  return entityName
}

/**
 * @description return a method to be placed inside controller template
 * @method makeControllerMethod
 * @param  {String} name
 * @return {String}
 * @public
 */
helpers.makeControllerMethod = function (name) {
  return `
    * ${name} (request, response) {}`
}

/**
 * @description generates the blueprint file with it's contents
 * @method
 * @param  {String} contents
 * @param  {String} filePath
 * @param  {String} name
 * @param  {String} entity
 * @return {String}
 * @throws error when file already exists
 */
helpers.generateBlueprint = function * (contents, filePath, name, entity, options) {
  options = options || {}
  const exists = yield fs.exists(filePath)
  if (exists) {
    throw new Error(`I am afraid ${name}.js already exists and i cannot overwrite it`)
  }

  options.name = name
  contents = pope(contents, options)
  yield fs.outputFile(filePath, contents)
  return `Created ${name}.js ${entity} successfully`
}
