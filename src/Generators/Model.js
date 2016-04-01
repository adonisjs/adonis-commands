'use strict'

/**
 * adonis-commands
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const BaseGenerator = require('./Base')
const path = require('path')
const i = require('inflect')

class ModelGenerator extends BaseGenerator {

  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    const migrationsFlag = '{-m,--migration?:Create migration for a given model}'
    const tableFlag = '{-t,--table?=@value:Specify an optional table name for the model}'
    const connectionFlag = '{-c, --connection?=@value:Specify an optional connection for the model}'
    return `make:model {name} ${migrationsFlag} ${tableFlag} ${connectionFlag}`
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new model with optional migration'
  }

  /**
   * handle method will be executed by ace. Here we
   * create the model to models directory.
   * @param  {Object} args
   * @param  {Object} options
   *
   * @public
   */
  * handle (args, options) {
    const name = args.name
    const templateName = this._makeEntityName(name, 'model', false, 'singular')
    const toPath = path.join(this.helpers.appPath(), 'Model', `${templateName}.js`)
    const templateOptions = {
      name: templateName,
      table: options.table,
      connection: options.connection
    }
    yield this.write('model', toPath, templateOptions)
    this._logCreate(this.helpers.basePath(), toPath)
    if (options.migration) {
      const migrationOptions = {
        connection: options.connection,
        create: options.table || i.pluralize(i.underscore(name))
      }
      this.run('make:migration', [name], migrationOptions)
    }
  }

}

module.exports = ModelGenerator
