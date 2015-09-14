'use strict'

const ControllerGenerator = require('../src/Generators/Controller')
const ModelGenerator = require('../src/Generators/Model')
const CommandGenerator = require('../src/Generators/Command')
const chai = require('chai')
const expect = chai.expect
const co = require('co')
const fsExtra = require('co-fs-extra')
const fs = require('fs')
const path = require('path')

const helpers = {
  appPath : function (){
    return path.join(__dirname,'./app')
  }
}

const ansi = {
  error: function (value){
    console.log(value)
  }
}

describe('Generators' , function () {

  before(function (done) {

    const appPath = path.join(__dirname,'./app')
    const controllersPath = path.join(appPath,'/Http/Controllers')
    const modelsPath = path.join(appPath,'/Model')
    const commandsPath = path.join(appPath,'/Commands')

    co (function * () {
      return yield [fsExtra.emptyDir(appPath), fsExtra.mkdirs(controllersPath), fsExtra.mkdirs(modelsPath),fsExtra.mkdirs(commandsPath)]
    }).then(function (resp) {
      done()
    }).catch(done)

  })

  it('should generate a new file when calling handle method', function (done) {

    const gen = new ControllerGenerator(helpers,ansi)

    co (function *() {
      return yield gen.handle({name:'Users'},{plain:false})
    }).then(function (response){
      fs.exists(path.join(__dirname,'./app/Http/Controllers/UsersController.js'), function (there) {
        expect(there).to.equal(true)
        done()
      })
    }).catch(done)

  })

  it('should generate a new model file', function (done) {

    const gen = new ModelGenerator(helpers,ansi)

    co (function *() {
      return yield gen.handle({name:'usersModel'},{plain:false})
    }).then(function (response){
      fs.exists(path.join(__dirname,'./app/Model/Users.js'), function (there) {
        expect(there).to.equal(true)
        done()
      })
    }).catch(done)

  })

  it('should generate a new command file', function (done) {

    const gen = new CommandGenerator(helpers,ansi)

    co (function *() {
      return yield gen.handle({name:'greetCommand'},{})
    }).then(function (response){
      fs.exists(path.join(__dirname,'./app/Commands/Greet.js'), function (there) {
        expect(there).to.equal(true)
        done()
      })
    }).catch(done)

  })

})
