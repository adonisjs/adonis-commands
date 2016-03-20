'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const utils = require('./helpers')
const Ioc = require('adonis-fold').Ioc
const i = require('inflect')
const schemaString = require('./strings').schema

let Middleware = exports = module.exports = {}

Middleware.description = 'Generate new migration schema file'
Middleware.signature = '{name:Name of the migration file} {--create?} {--table?}'

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
  const Ansi = Ioc.use('Adonis/Src/Ansi')
  const name = `${utils.makeName(options.name, 'Schema')}`
  const migrationsPath = Helpers.migrationsPath(`${name}.js`)
  const tableName = i.pluralize(name.replace('Schema', '').toLowerCase())
  let templateOptions = {up: '', down: ''}
  if (flags.create) {
    templateOptions.up = `this.create('${tableName}', function (table) {
      table.increments()
      table.timestamps()
      table.softDeletes()
    })`
    templateOptions.down = `this.drop('${tableName}')`
  }

  if (flags.table) {
    templateOptions.up = `this.table('${tableName}', function (table) {
    })`
    templateOptions.down = templateOptions.up
  }

  try {
    const response = yield utils.generateBlueprint(schemaString, migrationsPath, name, 'migration', templateOptions)
    Ansi.success(response)
  } catch (e) {
    Ansi.error(e.message)
  }
}
