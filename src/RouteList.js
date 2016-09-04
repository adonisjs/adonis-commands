'use strict'

const Ioc = require('adonis-fold').Ioc
const Command = Ioc.use('Adonis/Src/Command')
const Route = Ioc.use('Adonis/Src/Route')

class RouteList extends Command {

  constructor (Helpers) {
    super()
    this.helpers = Helpers
  }

  get signature () {
    return 'route:list'
  }

  get description () {
    return 'List all Routes registered for this app'
  }

  setup(){
      //Require the app/Http/routes.js to know what routes are registered
      require(this.helpers.appPath()+'/Http/routes.js')
      
      this.routes = Route.routes()
      this.parsedRoutesList = []
  }

  _parseRoutes() {
  	this.parsedRoutesList = this.routes.map(function(route){
		return [
  			route.domain || '',
  			route.verb.join('|') || '',
  			route.route || '',
  			route.middlewares.join('|') || '',
  			route.name || ''
  		]
  	})

  	return this.parsedRoutesList
  }

  * handle (args, options) {

  	this.table(
      ['Domain','Method','URI','Middlewares','Name'], 
      this._parseRoutes()
    )
  }

}

module.exports = RouteList
