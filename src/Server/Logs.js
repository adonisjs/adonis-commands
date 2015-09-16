'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const pm2 = require('pm2')
const path = require('path')
const sh = require('shorthash')
const prettysize = require('prettysize')
const timediff = require('timediff')

class Logs {

  static get inject() {
    return ['Adonis/Src/Helpers','Adonis/Addons/Ansi']
  }

  constructor (Helpers, Ansi) {
    this.helpers = Helpers
    this.ansi = Ansi
  }

  /**
   * command description
   * @return {String}
   */
  static get description () {
    return 'Show/Flush Logs for adonis server'
  }

  /**
   * command signature used by ace
   * @return {String}
   */
  static get signature () {
    return 'server:logs {type:Specify whether you want to stream or flush logs}'
  }

  /**
   * @function handle
   * @description invoked by ace is a method to stream/flush logs
   * @param  {Object} options
   * @param  {Object} flags
   * @return {String}
   */
  * handle (options, flags) {
    const scriptPath = path.join(this.helpers.basePath(), './server.js')
    const processName = sh.unique(scriptPath)
    const type = options.type

    if(type !== 'stream' && type !== 'flush'){
      throw new Error('You can only stream or flush logs , ' + type + ' is not a valid option')
    }
    this[type](pm2,processName)
  }

  stream (pm2,processName){
    const self = this
    pm2.connect(function () {
      pm2.streamLogs(processName, function (err, list) {
        if (err) {
          /**
           * show error if there is an error
           */
          self.ansi.error(err.msg)
        }
        pm2.disconnect()
      })
    })
  }


  flush (pm2){
    const self = this
    pm2.connect(function () {
      pm2.flush(function (err, list) {
        if (err) {
          /**
           * show error if there is an error
           */
          self.ansi.error(err.msg)
        } else {
          self.ansi.log('Flushed logs ' + self.ansi.icon('success'))
        }
        pm2.disconnect()
      })
    })
  }

}

module.exports = Logs
