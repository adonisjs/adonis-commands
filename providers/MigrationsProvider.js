'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const ServiceProvider = require('adonis-fold').ServiceProvider

class MigrationsProvider extends ServiceProvider{

  *register() {

    this.app.bind('Adonis/Addons/Migration:Make', function () {
      return require('../src/Migrations').Make
    })

    this.app.bind('Adonis/Addons/Migration:Rollback', function () {
      return require('../src/Migrations').Rollback
    })

    this.app.bind('Adonis/Addons/Migration:Run', function () {
      return require('../src/Migrations').Run
    })

  }

}

module.exports = MigrationsProvider
