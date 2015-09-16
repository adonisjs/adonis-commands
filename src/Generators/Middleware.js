'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const utils = require('./helpers')
const fs = require('co-fs-extra')
const path = require('path')

/**
 * template string that will be written to a
 * new middleware file , it contains dynamic
 * segments.
 */
let middlewareString = `'use strict'

class {{name}}{

  *handle (request, response , next) {

    // yield next once middleware expectation
    // have been satisfied

  }

}

module.exports = {{name}}
`

class Command {

  static get inject() {
    return ['Adonis/Src/Helpers','Adonis/Addons/Ansi']
  }

  constructor (Helpers, Ansi) {
    this.helpers = Helpers
    this.ansi = Ansi
  }

  /**
   * description for command to be used by --help
   */
  static get description () {
    return "Generate a new HTTP middleware"
  }

  /**
   * returning signature required and used by ace
   */
  static get signature () {
    return 'make:middleware {name:Middleware name you wish to use}'
  }

  /**
   * @function handle
   * @description executed by ace , this method makes a new
   * middleware file inside Middleware directory
   * @param  {Object} options
   * @param  {Object} flags
   * @return {*}
   */
  * handle (options, flags) {
    /**
     * making proper command name with proper formatting
     */
    const name = `${utils.makeName(options.name, 'Middleware', true)}`

    /**
     * making path to middleware directory
     */
    const middlewarePath = path.join(this.helpers.appPath(), `/Http/Middleware/${name}.js`)

    /**
     * finding whether middleware already exists or not
     */
    const exists = yield fs.exists(middlewarePath)

    /**
     * if middleware does not exists , take the pleasure for creating
     * a new one.
     */
    if (!exists) {
      /**
       * replacing {{name}} block with model name
       */
      const nameRegex = new RegExp('{{name}}', 'g')

      middlewareString = middlewareString.replace(nameRegex, name)

      /**
       * creating middleware file
       */
      yield fs.outputFile(middlewarePath, middlewareString)
      return `Created ${name}.js middleware successfully`

    }

    /**
     * throwing an error if file already exists
     */
    this.ansi.error(`I am afraid ${name}.js already exists and i cannot overwrite it`)

  }

}

module.exports = Command
