'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const pm2 = require('pm2')
const path = require('path')
const sh = require('shorthash')

class Start {

  constructor (Helpers, Ansi) {
    this.helpers = Helpers
    this.ansi = Ansi
  }

  /**
   * command description
   * @return {String}
   */
  get description () {
    return 'Start adonis server as a deamon'
  }

  /**
   * command signature used by ace
   * @return {String}
   */
  get signature () {
    return 'server:start {--cluster?}'
  }

  /**
   * @function handle
   * @description invoked by ace is a method to start pm2 server
   * @param  {Object} options
   * @param  {Object} flags
   * @return {String}
   */
  * handle (options, flags) {
    /**
     * finding whether to run sever as a cluster or not
     */
    const scriptPath = path.join(this.helpers.basePath(), './server.js')
    const cluster = options.cluster || false
    const execMode = cluster ? 'cluster' : 'fork'

    /**
     * getting access to paths , which should be watched
     * by pm2 instance
     */
    const publicPath = this.helpers.publicPath()
    const resourcesPath = this.helpers.resourcesPath()
    const storagePath = this.helpers.storagePath()
    const migrationsPath = this.helpers.migrationsPath()
    const processName = sh.unique(scriptPath)

    /**
     * setting watch files to true
     */
    const watchFiles = true

    /**
     * setting up max memory restart
     * @type {String}
     */
    const maxMemoryRestart = '100M'

    const self = this

    /**
     * options to pass to pm2 start method
     */
    const pm2Options = {
      exec_mode: execMode,
      name: processName,
      max_memory_restart: maxMemoryRestart,
      watch: watchFiles,
      node_args: '--harmony__proxies',
      ignore_watch: [publicPath, resourcesPath, storagePath, migrationsPath],
      script: scriptPath
    }

    pm2.connect(function () {
      pm2.start(pm2Options, function (err, apps) {
        /**
         * show error if there's one
         */
        if (err) {
          self.ansi.error(err.msg)
        } else {
          /**
           * print success message saying running process
           */
          console.log(`Started adonis process ${processName}`, self.ansi.icon('success'))
        }
        pm2.disconnect()

      })
    })

  }

}

module.exports = Start
