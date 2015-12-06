'use strict'

const ServiceProvider = require('adonis-fold').ServiceProvider

class SeedProvider extends ServiceProvider{

  *register() {

    this.app.bind('Adonis/Addons/Seed:Make', function () {
      return require('../src/Seed').Make
    })

    this.app.bind('Adonis/Addons/Seed:Run', function () {
      return require('../src/Seed').Run
    })

  }

}

module.exports = SeedProvider
