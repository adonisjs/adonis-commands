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
const i = require('inflect')

class MigrationGenerator extends BaseGenerator {
  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    const createFlag = '{-c,--create=@value:Create a new table}'
    const tableFlag = '{-t,--table=@value:Select table for alteration}'
    const connectionFlag = '{-c,--connection=@value:Specify connection to be used for migration}'
    return `make:migration {name} ${createFlag} ${tableFlag} ${connectionFlag}`
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new migration file'
  }

  /**
   * called by ace automatically. It will create a new
   * migrations file inside the migrations directory.
   * @param  {Object} args
   * @param  {Object} options
   *
   * @public
   */
  * handle (args, options) {
    const name = args.name
    const templateName = this._makeEntityName(name, 'migration', false)
    const toPath = this.helpers.migrationsPath(`${new Date().getTime()}_${name}.js`)
    const templateOptions = {
      table: options.create || options.table || i.underscore(templateName),
      create: !!options.create,
      name: templateName,
      connection: options.connection
    }
    yield this._wrapWrite('migration', toPath, templateOptions)
  }
}

module.exports = MigrationGenerator
