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

class Show {

  constructor (Helpers, Ansi) {
    this.helpers = Helpers
    this.ansi = Ansi
  }

  /**
   * command description
   * @return {String}
   */
  get description () {
    return 'Show running server statistics'
  }

  /**
   * command signature used by ace
   * @return {String}
   */
  get signature () {
    return 'server:show'
  }

  /**
   * @function handle
   * @description invoked by ace is a method to start pm2 server
   * @param  {Object} options
   * @param  {Object} flags
   * @return {String}
   */
  * handle (options, flags) {
    const self = this
    const scriptPath = path.join(this.helpers.basePath(), './server.js')
    const processName = sh.unique(scriptPath)

    pm2.connect(function () {
      pm2.describe(processName, function (err, list) {
        if (err) {
          /**
           * show error if there is an error
           */
          self.ansi.error(err.msg)
        } else {
          /**
           * otherwise show process
           */
          if (list.length === 0) {
            self.ansi.info("There isn't any server running")
          }

          const server = list[0]
          const pid = server.pid
          const watch = server.pm2_env.watch ? self.ansi.icon('success') : self.ansi.icon('error')
          const mode = server.pm2_env.exec_mode
          const instances = server.pm2_env.instances
          const logPath = server.pm2_env.pm_out_log_path
          const errorPath = server.pm2_env.pm_err_log_path
          const processPath = server.pm2_env.pm_exec_path
          const status = server.pm2_env.status === 'online' ? self.ansi.colored('green', server.pm2_env.status) : self.ansi.colored('red', server.pm2_env.status)
          const upTime = server.pm2_env.pm_uptime
          const createdAt = server.pm2_env.created_at
          const restartCounts = server.pm2_env.restart_time
          const unStableRestarts = server.pm2_env.unstable_restarts
          const memoryConsumed = server.monit.memory
          const maxMemoryRestart = server.pm2_env.max_memory_restart
          const usedFlags = server.pm2_env.node_args

          const upDiff = timediff(upTime, new Date().getTime(), 'YDHms')
          let unitToShow = 0
          if (upDiff.years > 0) unitToShow = `${upDiff.years} years`
          else if (upDiff.days > 0) unitToShow = `${upDiff.days} days`
          else if (upDiff.hours > 0) unitToShow = `${upDiff.hours} hours`
          else if (upDiff.minutes > 0) unitToShow = `${upDiff.minutes} mins`
          else if (upDiff.milliseconds > 0) unitToShow = `${upDiff.milliseconds} ms`

          const head = ['key', 'value']
          const body = [
            ['status', status],
            ['pid', pid],
            ['watch', watch],
            ['project path', processPath],
            ['error log path', errorPath],
            ['out log path', logPath],
            ['instances', instances],
            ['mode', mode],
            ['node arguments', usedFlags.join(',')],
            ['restarts', restartCounts],
            ['unstable restarts', unStableRestarts],
            ['uptime', unitToShow],
            ['memory consumed', prettysize(memoryConsumed)],
            ['max memory restart', prettysize(maxMemoryRestart)],
            ['created at', new Date(createdAt).toISOString()]
          ]

          self.ansi.table(head, body)

        }
        pm2.disconnect()

      })
    })

  }
}

module.exports = Show
