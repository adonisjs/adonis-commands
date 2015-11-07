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
    return 'Start adonis server as a deamon --help for more info'
  }

  /**
   * command signature used by ace
   * @return {String}
   */
  static get signature () {
    return 'server:start {--exec_mode?} {--instances?} {--memory_limit?}'
  }

  isNumeric(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
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
    const execMode = flags.exec_mode === 'cluster' ? flags.exec_mode : 'fork'
    const instances = flags.instances === 'max' || this.isNumeric(flags.instances) ? flags.instances : 1
    const memoryLimit = this.isNumeric(flags.memory_limit) ? flags.memory_limit : 100

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
    const maxMemoryRestart = memoryLimit + 'M'

    const self = this

    /**
     * options to pass to pm2 start method
     */
    const pm2Options = {
      exec_mode: execMode,
      name: processName,
      max_memory_restart: maxMemoryRestart,
      watch: watchFiles,
      node_args: '--harmony_proxies',
      instances: instances,
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
