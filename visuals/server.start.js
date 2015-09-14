'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const ServerStart = require('../src/Server/Start')
const Ansi = require('adonis-ace').Ansi
const path = require('path')

const Helpers = {
  basePath: function (){
    return path.join(__dirname,'./app')
  },
  publicPath : function () {

  },
  resourcesPath : function () {

  },
  storagePath : function () {

  },
  migrationsPath : function () {

  }
}

const server = new ServerStart(Helpers,Ansi)
const co = require('co')

co(function *() {

  return yield server.handle({},{})

}).catch(function (error) {
  console.log(error)
})
