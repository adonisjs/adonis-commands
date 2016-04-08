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

class MiddlewareGenerator extends BaseGenerator {

  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    return 'make:middleware {name}'
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new middleware for Http requests'
  }

  /**
   * handle method will be executed by ace. Here we create
   * the middleware inside middleware directory.
   *
   * @param  {Object} args
   * @param  {Object} options
   *
   * @public
   */
  * handle (args, options) {
    const name = args.name
    const templateName = this._makeEntityName(name, 'middleware', false)
    const toPath = path.join(this.helpers.appPath(), 'Http/Middleware', `${templateName}.js`)
    const templateOptions = {
      name: templateName
    }
    yield this._wrapWrite('middleware', toPath, templateOptions)
  }

}

module.exports = MiddlewareGenerator
