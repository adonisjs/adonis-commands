'use strict'

const Make = require('../src/Seed/Make')
const Run = require('../src/Seed/Run')
const chai = require('chai')
const expect = chai.expect
const co = require('co')
const fsExtra = require('co-fs-extra')
const fs = require('fs')
const path = require('path')
const Ansi = require('adonis-ace').Ansi

const Helpers = {
  seedsPath: function () {
    return path.join(__dirname, './seeds')
  }
}

const Env = {
  get: function () {
    return 'sqlite'
  }
}

const Config = {
  get: function () {
    return {
      client: 'sqlite3',
      connection:{
        filename: path.join(__dirname,'./storage/database.sqlite3')
      }
    }
  }
}


describe('Generators' , function () {
  before(function (done) {
    const storagePath = path.join(__dirname, './storage')
    const seedsPath = path.join(__dirname, './seeds')
    co(function * () {
      return yield [fsExtra.emptyDir(seedsPath), fsExtra.mkdirs(storagePath)]
    }).then(function (resp) {
      done()
    }).catch(done)

  })

  it('should run given seed using Run command handle method' , function (done) {
    const mk = new Run(Helpers, Env, Config, Ansi)

    co(function *() {
      return yield mk.handle({}, {force: true})
    }).then(function (response) {
      done()
    }).catch(done)

  })

  it('should make a new seed using handle method' , function (done) {
    const mk = new Make(Helpers, Env, Config)

    co(function *() {
      return yield mk.handle({name: 'users'})
    }).then(function (response) {
      expect(response).to.include('Created')
      done()
    }).catch(done)

  })

})
