'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const pm2 = require('pm2')
const path = require('path')
const sh = require('shorthash')

class Reload {

  constructor (Helpers, Ansi) {
    this.helpers = Helpers
    this.ansi = Ansi
  }

  /**
   * command description
   * @return {String}
   */
  get description () {
    return 'Reload running adonis server'
  }

  /**
   * command signature used by ace
   * @return {String}
   */
  get signature () {
    return 'server:reload'
  }

  /**
   * @function handle
   * @description invoked by ace is a method to reload adonis server
   * @param  {Object} options
   * @param  {Object} flags
   * @return {String}
   */
  * handle (options, flags) {
    const self = this
    const scriptPath = path.join(this.helpers.basePath(), './server.js')
    const processName = sh.unique(scriptPath)

    pm2.connect(function () {
      pm2.reload(processName, function (err, apps) {
        if (err) {
          /**
           * show error if there is an error
           */
          self.ansi.error(err.msg)
        } else {
          /**
           * otherwise say process has been stopped
           */
          console.log(`Reloaded process ${processName} successfully`, self.ansi.icon('success'))
        }
        pm2.disconnect()

      })
    })

  }
}

module.exports = Reload
