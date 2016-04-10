'use strict'

const ServiceProvider = require('adonis-fold').ServiceProvider

class ReplProvider extends ServiceProvider {

  * register () {
    this.app.bind('Adonis/Commands/Repl', () => {
      const Repl = require('../src/Repl')
      return new Repl()
    })
  }

}

module.exports = ReplProvider
