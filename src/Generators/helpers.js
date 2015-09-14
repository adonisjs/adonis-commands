'use strict'

const changeCase = require('change-case')

let helpers = exports = module.exports = {}

helpers.makeName = function (name,entity,replace) {
  name = changeCase.snakeCase(name).replace(entity.toLowerCase(),'')
  let entityName = replace ? changeCase.pascalCase(`${name}`) : changeCase.pascalCase(`${name}${entity}`)
  return entityName
}

helpers.makeControllerMethod = function (name){

  return `
    *${name} (request,response) {

    }`

}
