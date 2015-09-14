'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const ServiceProvider = require('adonis-fold').ServiceProvider
const Generators = require('../src/Generators')

class GeneratorProvider extends ServiceProvider{

  static get inject(){
    return ['Adonis/Src/Helpers','Adonis/Addons/Ansi']
  }

  *register() {

    /**
     * binding a new command to ioc container, which will scaffold a new controller
     */
    this.app.bind('Adonis/Addons/Generator:Controller', function (Helpers,Ansi) {
      return new Generators.Controller(Helpers,Ansi)
    })

    /**
     * binding a new command to ioc container, which will scaffold a new terminal command
     */
    this.app.bind('Adonis/Addons/Generator:Command', function (Helpers,Ansi) {
      return new Generators.Command(Helpers,Ansi)
    })

    /**
     * binding a new command to ioc container, which will scaffold a model
     */
    this.app.bind('Adonis/Addons/Generator:Model', function (Helpers,Ansi) {
      return new Generators.Model(Helpers,Ansi)
    })


  }

}

module.exports = GeneratorProvider
