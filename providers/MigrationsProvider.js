'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const ServiceProvider = require('adonis-fold').ServiceProvider
const Migrations = require('../src/Migrations')

class MigrationsProvider extends ServiceProvider{

  static get inject(){
    return ['Adonis/Src/Helpers','Adonis/Src/Env','Adonis/Src/Config','Adonis/Addons/Ansi']
  }

  *register() {

    this.app.bind('Adonis/Addons/Migration:Make', function (Helpers,Env,Config,Ansi) {
      return new Migrations.Make(Helpers,Env,Config,Ansi)
    })

    this.app.bind('Adonis/Addons/Migration:Rollback', function (Helpers,Env,Config,Ansi) {
      return new Migrations.Rollback(Helpers,Env,Config,Ansi)
    })

    this.app.bind('Adonis/Addons/Migration:Run', function (Helpers,Env,Config,Ansi) {
      return new Migrations.Make(Helpers,Env,Config,Ansi)
    })

  }

}

module.exports = MigrationsProvider
