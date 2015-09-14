'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const ServerShow = require('../src/Server/Show')
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

const server = new ServerShow(Helpers,Ansi)
const co = require('co')

co(function *() {

  return yield server.handle({},{})

}).catch(function (error) {
  console.log(error)
})
