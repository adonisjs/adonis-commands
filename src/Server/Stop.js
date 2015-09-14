'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const pm2 = require('pm2')
const path = require('path')
const sh = require('shorthash')

class Stop{

  constructor(Helpers,Ansi){
    this.helpers = Helpers
    this.ansi = Ansi
  }

  /**
   * command description
   * @return {String}
   */
  get description(){
    return 'Stop running adonis server'
  }

  /**
   * command signature used by ace
   * @return {String}
   */
  get signature(){
    return 'server:stop {--delete?}'
  }

  /**
   * @function handle
   * @description invoked by ace is a method to start pm2 server
   * @param  {Object} options
   * @param  {Object} flags
   * @return {String}
   */
  *handle (options,flags){

    const self = this
    const method = flags.delete ? 'delete' : 'stop'
    const scriptPath = path.join(this.helpers.basePath(),'./server.js')
    const processName = sh.unique(scriptPath)

    pm2.connect(function () {
      pm2[method](processName, function (err,apps) {

        if(err){
          /**
           * show error if there is an error
           */
          self.ansi.error(err.msg)
        }else{
          /**
           * otherwise say process has been stopped
           */
          console.log(`Stopped adonis process ${processName}`,self.ansi.icon('success'))
        }
        pm2.disconnect()

      })
    })

  }
}

module.exports = Stop;
