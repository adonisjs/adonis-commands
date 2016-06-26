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

class ListenerGenerator extends BaseGenerator {

  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    return 'make:listener {name} {-m,--method=@value:Method to create on listener}'
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new listener for your events'
  }

  /**
   * handle method will be executed by ace. Here we
   * create the hook inside hooks directory.
   * @param  {Object} args
   * @param  {Object} options
   *
   * @public
   */
  * handle (args, options) {
    const name = args.name
    const entity = this._makeEntityName(name, 'listener', false)
    const toPath = path.join(this.helpers.appPath(), 'Listeners', `${entity.entityPath}.js`)
    const templateOptions = {
      name: entity.entityName,
      method: options.method || 'methodName'
    }
    yield this._wrapWrite('listener', toPath, templateOptions)
  }

}

module.exports = ListenerGenerator
