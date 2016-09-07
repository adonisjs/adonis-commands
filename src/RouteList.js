'use strict'

const path = require('path')
const Ioc = require('adonis-fold').Ioc
const Command = Ioc.use('Adonis/Src/Command')


class RouteList extends Command {

  constructor (Route, Helpers) {
    super()

    this.route = Route
    this.helpers = Helpers
  }

  get signature () {
    return 'route:list'
  }

  get description () {
    return 'List all Routes registered for this app'
  }

  setup(){
      require(path.join(this.helpers.appPath(), 'Http/routes.js'))
      
      this.parsedRoutesList = []
  }

  _parseRoutes() {
  	this.parsedRoutesList = this.route.routes().map(function(route){

		return [
  			route.domain || '',
  			route.verb.join('|') || '',
        route.route || '',
  			(route.handler.constructor === String ? route.handler : 'Closure'),
  			route.middlewares.join('|') || '',
  			route.name || ''
  		]
  	})

  	return this.parsedRoutesList
  }

  * handle (args, options) {

  	this.table(
      ['Domain','Method','URI','Action','Middlewares','Name'], 
      this._parseRoutes()
    )
  }

}

module.exports = RouteList
