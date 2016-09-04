'use strict'

const ServiceProvider = require('adonis-fold').ServiceProvider

class HelperCommandsProvider extends ServiceProvider {

  * register () {
  	//Route:List command
    this.app.bind('Adonis/Commands/Route:List', (app) => {
      const RouteList = require('../src/RouteList')
      const Helpers = app.use('Adonis/Src/Helpers')
      return new RouteList(Helpers)
    })
  }

}

module.exports = HelperCommandsProvider
