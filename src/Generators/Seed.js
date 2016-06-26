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

class SeedGenerator extends BaseGenerator {

  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    return 'make:seed {name}'
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new seeder'
  }

  /**
   * handle method will be executed by ace. Here we
   * create the template inside views directory.
   * @param  {Object} args
   * @param  {Object} options
   *
   * @public
   */
  * handle (args, options) {
    const name = args.name
    const entity = this._makeEntityName(name, 'seed', false)
    const toPath = this.helpers.seedsPath(`${entity.entityName}.js`)
    const templateOptions = { name: entity.entityPath }
    yield this._wrapWrite('seed', toPath, templateOptions)
  }

}

module.exports = SeedGenerator
