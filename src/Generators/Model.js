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
 * model string that will be written to a
 * new model , it contains dynamic
 * segments.
 */
let modelString = `'use strict'

const Lucid = use("Lucid")

class {{name}} extends Lucid {

}

module.exports = {{name}}
`

class Model {

  constructor (Helpers, Ansi) {
    this.helpers = Helpers
    this.ansi = Ansi
  }

  /**
   * command description for people to understand stuff
   * @return {[type]} [description]
   */
  get description () {
    return "Generate a new model file by passing it's name"
  }

  /**
   * i am going to return the signature required by ace
   */
  get signature () {
    return 'make:model {name:model name}'
  }

  /**
   * @function handle
   * @description executed by ace , this method makes a new
   * model file inside model directory
   * @param  {Object} options
   * @param  {Object} flags
   * @return {*}
   */
  * handle (options, flags) {
    /**
     * making proper model name with proper formatting
     */
    const name = `${utils.makeName(options.name, 'Model', true)}`

    /**
     * making path to model directory
     */
    const modelPath = path.join(this.helpers.appPath(), `/Model/${name}.js`)

    /**
     * finding whether model already exists or not
     */
    const exists = yield fs.exists(modelPath)

    /**
     * if model does not exists , take the pleasure for creating
     * a new one.
     */
    if (!exists) {
      /**
       * replacing {{name}} block with model name
       */
      const nameRegex = new RegExp('{{name}}', 'g')

      modelString = modelString.replace(nameRegex, name)

      /**
       * creating model file
       */
      yield fs.outputFile(modelPath, modelString)
      return `Created ${name}.js model successfully`

    }

    /**
     * throwing an error if file already exists
     */
    this.ansi.error(`I am afraid ${name}.js already exists and i cannot overwrite it`)

  }

}

module.exports = Model
