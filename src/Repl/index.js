'use strict'

const Ioc = require('adonis-fold').Ioc
const Command = Ioc.use('Adonis/Src/Command')

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
   * Starts a new repl session by binding Ioc use and make
   * methods to the context.
   *
   * @public
   */
  * handle () {
    const Repl = require('repl-plus').ReplPlus
    const context = {}
    context.use = Ioc.use
    context.make = Ioc.make
    const repl = new Repl({context})
    repl.start()
  }

}

module.exports = Repl
