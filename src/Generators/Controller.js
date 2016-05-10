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

class ControllerGenerator extends BaseGenerator {

  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    return 'make:controller {name} {-r,--resource?:Create a resourceful Controller}'
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new controller'
  }

  /**
   * handle method will be executed by ace. Here we
   * create the controller to controller directory.
   * @param  {Object} args
   * @param  {Object} options
   *
   * @public
   */
  * handle (args, options) {
    const name = args.name
    const entity = this._makeEntityName(name, 'controller', true)
    const toPath = path.join(this.helpers.appPath(), 'Http/Controllers', `${entity.entityPath}.js`)
    const templateOptions = {
      methods: ['index', 'create', 'store', 'show', 'edit', 'update', 'destroy'],
      resource: options.resource || false,
      name: entity.entityName
    }
    yield this._wrapWrite('controller', toPath, templateOptions)
  }

}

module.exports = ControllerGenerator
