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

class ViewGenerator extends BaseGenerator {

  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    const extendFlag = '{-e, --extend?=@value:Extend a parent view}'
    return `make:view {name} ${extendFlag}`
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Create a new template view by optionally extending a master view'
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
    const templateName = i.decapitalize(this._makeEntityName(name, 'view', false))
    const toPath = path.join(this.helpers.viewsPath(), `${templateName}.html`)
    const templateOptions = {
      extend: options.extend
    }
    yield this.write('view', toPath, templateOptions)
    this._logCreate(this.helpers.basePath(), toPath)
  }

}

module.exports = ViewGenerator
