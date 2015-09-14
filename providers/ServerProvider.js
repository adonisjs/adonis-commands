'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const ServiceProvider = require('adonis-fold').ServiceProvider
const Server = require('../src/Server')

class ServerProvider extends ServiceProvider{

  static get inject(){
    return ['Adonis/Src/Helpers','Adonis/Addons/Ansi']
  }

  *register() {

    /**
     * binding a new command to ioc container , which will start a new server
     */
    this.app.bind('Adonis/Addons/Server:Start', function (Helpers,Ansi) {
      return new Server.Start(Helpers,Ansi)
    })

    /**
     * binding a new command to ioc container , which will stop existing server
     */
    this.app.bind('Adonis/Addons/Server:Stop', function (Helpers,Ansi) {
      return new Server.Stop(Helpers,Ansi)
    })

    /**
     * binding a new command to ioc container , which will reload existing server
     */
    this.app.bind('Adonis/Addons/Server:Reload', function (Helpers,Ansi) {
      return new Server.Reload(Helpers,Ansi)
    })

    /**
     * binding a new command to ioc container , which will show information for a given server
     */
    this.app.bind('Adonis/Addons/Server:Show', function (Helpers,Ansi) {
      return new Server.Show(Helpers,Ansi)
    })

  }

}

module.exports = ServerProvider
