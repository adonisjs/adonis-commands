'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const ServiceProvider = require('adonis-fold').ServiceProvider
const Migrations = require('../src/Migrations')

class MigrationsProvider extends ServiceProvider{

  *register() {

    this.app.bind('Adonis/Addons/Migration:Make', function (Adonis_Src_Helpers,Adonis_Src_Database) {
      return new Migrations.Make(Adonis_Src_Helpers,Adonis_Src_Database)
    })

    this.app.bind('Adonis/Addons/Migration:Rollback', function (Adonis_Src_Helpers,Adonis_Src_Database,Adonis_Addons_Ansi) {
      return new Migrations.Rollback(Adonis_Src_Helpers,Adonis_Src_Database,Adonis_Addons_Ansi)
    })

    this.app.bind('Adonis/Addons/Migration:Run', function (Adonis_Src_Helpers,Adonis_Src_Database,Adonis_Addons_Ansi) {
      return new Migrations.Make(Adonis_Src_Helpers,Adonis_Src_Database,Adonis_Addons_Ansi)
    })

  }

}

module.exports = MigrationsProvider
