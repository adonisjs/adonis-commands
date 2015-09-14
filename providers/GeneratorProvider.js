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
