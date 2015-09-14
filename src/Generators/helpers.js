'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/


const changeCase = require('change-case')


/**
 * @module helpers
 */
let helpers = exports = module.exports = {}

/**
 * @function makeName
 * @description this method returns a properly formatted name for any
 * given entity , see below example
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
 */
helpers.makeName = function (name,entity,replace) {
  name = changeCase.snakeCase(name).replace(entity.toLowerCase(),'')
  let entityName = replace ? changeCase.pascalCase(`${name}`) : changeCase.pascalCase(`${name}${entity}`)
  return entityName
}

/**
 * @function makeControllerMethod
 * @description return a method to be placed inside controller template
 * @param  {String} name
 * @return {String}
 */
helpers.makeControllerMethod = function (name){
  return `
    *${name} (request,response) {

    }`
}
