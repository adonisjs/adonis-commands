'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const ServiceProvider = require('adonis-fold').ServiceProvider
const Generators = require('../src/Generators')

class GeneratorProvider extends ServiceProvider{

  *register() {

    /*
    |--------------------------------------------------------------------------
    |   Server Commands
    |--------------------------------------------------------------------------
    |
    |   Below is the list of commands which can be used to run , stop and
    |   view adonis http server details.
    |
    */

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



    /*
    |--------------------------------------------------------------------------
    |   Generators
    |--------------------------------------------------------------------------
    |
    |   Below are the bindings for commands to scaffold different files
    |   inside adonis application
    |
    */


    /**
     * binding a new command to ioc container, which will scaffold a new controller
     */
    this.app.bind('Adonis/Addons/Generator:Controller', function (Adonis_Src_Helpers,Adonis_Addons_Ansi) {
      return new Generators.Controller(Adonis_Src_Helpers,Adonis_Addons_Ansi)
    })

    /**
     * binding a new command to ioc container, which will scaffold a new terminal command
     */
    this.app.bind('Adonis/Addons/Generator:Command', function (Adonis_Src_Helpers,Adonis_Addons_Ansi) {
      return new Generators.Command(Adonis_Src_Helpers,Adonis_Addons_Ansi)
    })

    /**
     * binding a new command to ioc container, which will scaffold a model
     */
    this.app.bind('Adonis/Addons/Generator:Model', function (Adonis_Src_Helpers,Adonis_Addons_Ansi) {
      return new Generators.Model(Adonis_Src_Helpers,Adonis_Addons_Ansi)
    })


  }

}

module.exports = GeneratorProvider
