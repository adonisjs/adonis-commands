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
    return 'make:controller {name} {-t,--type=@value:Define the type of controller} {-r,--resource?:Create a resourceful Controller}'
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
    let controllerType = options.type || null

    /**
     * Prompting for controller type if not already defined
     */
    if (!controllerType) {
      controllerType = yield this.choice('Generating a controller for ?', [{
        name: 'Http Request',
        value: 'http'
      }, {
        name: 'For WebSocket Channel',
        value: 'ws'
      }]).print()
    }

    const controllersPath = controllerType === 'http' ? 'Http/Controllers' : 'Ws/Controllers'
    const template = controllerType === 'http' ? 'controller' : 'ws-controller'

    const toPath = path.join(this.helpers.appPath(), controllersPath, `${entity.entityPath}.js`)
    const templateOptions = {
      methods: ['index', 'create', 'store', 'show', 'edit', 'update', 'destroy'],
      resource: options.resource || false,
      name: entity.entityName
    }
    yield this._wrapWrite(template, toPath, templateOptions)
  }

}

module.exports = ControllerGenerator
