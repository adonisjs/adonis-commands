'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const ServiceProvider = require('adonis-fold').ServiceProvider

class ServerProvider extends ServiceProvider{

  *register() {

    /**
     * binding a new command to ioc container , which will start a new server
     */
    this.app.bind('Adonis/Addons/Server:Start', function () {
      return require('../src/Server').Start
    })

    /**
     * binding a new command to ioc container , which will stop existing server
     */
    this.app.bind('Adonis/Addons/Server:Stop', function () {
      return require('../src/Server').Stop
    })

    /**
     * binding a new command to ioc container , which will reload existing server
     */
    this.app.bind('Adonis/Addons/Server:Reload', function () {
      return require('../src/Server').Reload
    })

    /**
     * binding a new command to ioc container , which will show information for a given server
     */
    this.app.bind('Adonis/Addons/Server:Show', function () {
      return require('../src/Server').Show
    })

  }

}

module.exports = ServerProvider
