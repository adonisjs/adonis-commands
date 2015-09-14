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
let commandString = `'use strict'

const Console = use("Console")

class {{name}} extends Console {

  static get description(){
    return 'Description for your command , it is good to have nice descriptions'
  }

  static get signature(){
    return 'commandName {optionName} {optionName2} {--flog} {--flog2}'
  }

  *handle (options,flags) {

    // handle your command executation here

  }

}

module.exports = {{name}}
`

class Command {

  constructor (Helpers, Ansi) {
    this.helpers = Helpers
    this.ansi = Ansi
  }

  /**
   * description for command to be used by --help
   */
  get description () {
    return "Generate a new ace command file by passing it's name"
  }

  /**
   * returning signature required and used by ace
   */
  get signature () {
    return 'make:command {name:command name you want to use}'
  }

  /**
   * @function handle
   * @description executed by ace , this method makes a new
   * terminal command file inside Commands directory
   * @param  {Object} options
   * @param  {Object} flags
   * @return {*}
   */
  * handle (options, flags) {
    /**
     * making proper command name with proper formatting
     */
    const name = `${utils.makeName(options.name, 'Command', true)}`

    /**
     * making path to commands directory
     */
    const commandPath = path.join(this.helpers.appPath(), `/Commands/${name}.js`)

    /**
     * finding whether command already exists or not
     */
    const exists = yield fs.exists(commandPath)

    /**
     * if command does not exists , take the pleasure for creating
     * a new one.
     */
    if (!exists) {
      /**
       * replacing {{name}} block with model name
       */
      const nameRegex = new RegExp('{{name}}', 'g')

      commandString = commandString.replace(nameRegex, name)

      /**
       * creating command file
       */
      yield fs.outputFile(commandPath, commandString)
      return `Created ${name}.js command successfully`

    }

    /**
     * throwing an error if file already exists
     */
    this.ansi.error(`I am afraid ${name}.js already exists and i cannot overwrite it`)

  }

}

module.exports = Command
