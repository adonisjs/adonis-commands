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

class CommandGenerator extends BaseGenerator {

  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    return 'make:command {name}'
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new ace command'
  }

  /**
   * handle method will be executed by ace. Here we
   * create the command inside commands directory.
   * @param  {Object} args
   * @param  {Object} options
   *
   * @public
   */
  * handle (args, options) {
    const name = args.name
    const entity = this._makeEntityName(name, 'command', false)
    const toPath = path.join(this.helpers.appPath(), 'Commands', `${entity.entityName}.js`)
    const templateOptions = {name: entity.entityPath}
    yield this._wrapWrite('command', toPath, templateOptions)
  }

}

module.exports = CommandGenerator
