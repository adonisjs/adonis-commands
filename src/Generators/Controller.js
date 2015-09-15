'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const utils = require('./helpers')
const fs = require('co-fs-extra')
const path = require('path')
const _ = require('lodash')

/**
 * controller string that will be written to a
 * new controller , it contains dynamic
 * segments.
 */
let controllerString = `'use strict'

class {{name}} {
  {{index}}{{create}}{{store}}{{show}}{{update}}{{destroy}}
}

module.exports = {{name}}
`

/**
 * methods to be on controller
*/
const methods = ['index', 'create', 'store', 'show', 'update', 'destroy']

class Controller {

  static get inject() {
    return ['Adonis/Src/Helpers','Adonis/Addons/Ansi']
  }

  constructor (Helpers, Ansi) {
    this.helpers = Helpers
    this.ansi = Ansi
  }

  /**
   * command description for people to understand stuff
   * @return {[type]} [description]
   */
  static get description () {
    return "Generate a new controller file by passing it's name"
  }

  /**
   * i am going to return the signature required by ace
   */
  static get signature () {
    return 'make:controller {name:controller name} {--plain?}'
  }

  /**
   * @function handle
   * @description executed by ace , this method makes a new
   * controller file inside controllers directory
   * @param  {Object} options
   * @param  {Object} flags
   * @return {*}
   */
  * handle (options, flags) {
    /**
     * finding whether controller should be plaon or not
     */
    const plain = flags.plain || false

    /**
     * making proper controller name with proper formatting
     */
    const name = `${utils.makeName(options.name, 'Controller')}`

    /**
     * making path to controllers directory
     */
    const controllerPath = path.join(this.helpers.appPath(), `/Http/Controllers/${name}.js`)

    /**
     * finding whether controller already exists or not
     */
    const exists = yield fs.exists(controllerPath)

    /**
     * if controller does not exists , take the pleasure for creating
     * a new one.
     */
    if (!exists) {
      /**
       * replacing {{name}} block with controller name
       */
      const nameRegex = new RegExp('{{name}}', 'g')

      /**
       * ideally should be using a template engine to replace dynamic
       * segments, but that is going to be over head for a simple
       * strng
       */
      _.each(methods, function (method) {
        /**
         * if requested for a plain controller , replace method segments with
         * empty string
         * OTHERWISE
         * make a controller with all may be required functions
         */
        if (plain) {
          controllerString = controllerString.replace(`{{${method}}}`, '')
        } else {
          controllerString = controllerString.replace(`{{${method}}}`, utils.makeControllerMethod(method))
        }

      })

      controllerString = controllerString.replace(nameRegex, name)

      /**
       * creating controller file
       */
      yield fs.outputFile(controllerPath, controllerString)
      return `Created ${name}.js controller successfully`

    }

    /**
     * throwing an error if file already exists
     */
    this.ansi.error(`I am afraid ${name}.js already exists and i cannot overwrite it`)

  }

}

module.exports = Controller
