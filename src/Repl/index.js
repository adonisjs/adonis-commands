'use strict'

const REPL = require('repl')
const vm = require('vm')
const Ioc = require('adonis-fold').Ioc
const path = require('path')
const Command = Ioc.use('Adonis/Src/Command')
const fs = require('fs')
const os = require('os')
const historyFile = path.join(os.homedir(), '/.adonis_repl_history')

class Repl extends Command {

  /**
   * returns signature to be used by ace
   * @return {String}
   *
   * @public
   */
  get signature () {
    return 'repl'
  }

  /**
   * returns description to be used by ace as help command
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Start a new repl session when goodness of Es6 generators'
  }

  /**
   * Evaluates the command and wraps it inside co
   * if required.
   *
   * @param  {String}   cmd
   * @param  {Object}   context
   * @param  {String}   filename
   * @param  {Function} callback
   */
  evalCommand (cmd, context, filename, callback) {
    try {
      const result = vm.runInThisContext(cmd)
      callback(null, result)
    } catch (e) {
      context.___CALLBACK___ = callback
      const wrappedCommand = `___CO___(function * () {
        return ${cmd}
      })
      .then((result) => { ___CALLBACK___(null, result) })
      .catch(___CALLBACK___)`
      vm.runInNewContext(wrappedCommand, context)
    }
  }

  /**
   * Reads the history file
   *
   * @param  {Object} repl
   */
  readHistoryFile (repl) {
    try {
      fs.statSync(historyFile)
      repl.rli.history = fs.readFileSync(historyFile, 'utf-8').split('\n').reverse()
      repl.rli.history.shift()
      repl.rli.historyIndex = -1
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Save the history to the history file.
   *
   * @param {Object} repl
   */
  addHistorySaveListener (repl) {
    const fd = fs.openSync(historyFile, 'a')
    repl.rli.addListener('line', (code) => {
      if (code && code !== '.history') {
        fs.write(fd, `${code}\n`, (error) => { if (error) console.log(error) })
        return
      }
      repl.rli.historyIndex++
      repl.rli.history.pop()
    })

    process.on('exit', function () {
      fs.closeSync(fd)
    })
  }

  /**
   * Starts a new repl session by binding Ioc use and make
   * methods to the context.
   *
   * @public
   */
  * handle () {
    const context = {}
    context.use = Ioc.use
    context.make = Ioc.make
    const repl = REPL.start({
      eval: this.evalCommand
    })
    this.readHistoryFile(repl)
    this.addHistorySaveListener(repl)
    repl.context = context
    repl.context.___CO___ = require('co')
  }

}

module.exports = Repl
