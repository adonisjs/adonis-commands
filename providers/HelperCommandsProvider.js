'use strict'

const ServiceProvider = require('adonis-fold').ServiceProvider

class HelperCommandsProvider extends ServiceProvider {

  * register () {
  	//Route:List command
    this.app.bind('Adonis/Commands/Route:List', (app) => {
      const RouteList = require('../src/RouteList')
      
      const Helpers = app.use('Adonis/Src/Helpers')
      const Route = app.use('Adonis/Src/Route')
      return new RouteList(Route, Helpers)
    })
  }

}

module.exports = HelperCommandsProvider
