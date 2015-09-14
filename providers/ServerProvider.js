'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const ServiceProvider = require('adonis-fold').ServiceProvider
const Server = require('../src/Server')

class ServerProvider extends ServiceProvider{

  *register() {

    /**
     * binding a new command to ioc container , which will start a new server
     */
    this.app.bind('Adonis/Addons/Server:Start', function (Adonis_Src_Helpers,Adonis_Addons_Ansi) {
      return new Server.Start(Adonis_Src_Helpers,Adonis_Addons_Ansi)
    })

    /**
     * binding a new command to ioc container , which will stop existing server
     */
    this.app.bind('Adonis/Addons/Server:Stop', function (Adonis_Src_Helpers,Adonis_Addons_Ansi) {
      return new Server.Stop(Adonis_Src_Helpers,Adonis_Addons_Ansi)
    })

    /**
     * binding a new command to ioc container , which will reload existing server
     */
    this.app.bind('Adonis/Addons/Server:Reload', function (Adonis_Src_Helpers,Adonis_Addons_Ansi) {
      return new Server.Reload(Adonis_Src_Helpers,Adonis_Addons_Ansi)
    })

    /**
     * binding a new command to ioc container , which will show information for a given server
     */
    this.app.bind('Adonis/Addons/Server:Show', function (Adonis_Src_Helpers,Adonis_Addons_Ansi) {
      return new Server.Show(Adonis_Src_Helpers,Adonis_Addons_Ansi)
    })

  }

}

module.exports = ServerProvider
