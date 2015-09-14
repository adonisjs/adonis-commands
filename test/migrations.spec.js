'use strict'

const Make = require('../src/Migrations/Make')
const Run = require('../src/Migrations/Run')
const Rollback = require('../src/Migrations/Rollback')
const chai = require('chai')
const expect = chai.expect
const co = require('co')
const fsExtra = require('co-fs-extra')
const fs = require('fs')
const path = require('path')
const knex = require('knex')
const Ansi = require('adonis-ace').Ansi

const Helpers = {
  migrationsPath: function () {
    return path.join(__dirname, './migrations')
  }
}

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, './storage/database.sqlite3')
  }
})

describe('Generators' , function () {
  before(function (done) {
    const storagePath = path.join(__dirname, './storage')
    const migrationsPath = path.join(__dirname, './migrations')
    co(function * () {
      return yield [fsExtra.emptyDir(migrationsPath), fsExtra.mkdirs(storagePath)]
    }).then(function (resp) {
      done()
    }).catch(done)

  })

  it('should make a new migration using handle method' , function (done) {
    const mk = new Make(Helpers, db)

    co(function *() {
      return yield mk.handle({name: 'users'})
    }).then(function (response) {
      expect(response).to.include('Created')
      done()
    }).catch(done)

  })

  it('should run given migrations using Run command handle method' , function (done) {
    const mk = new Run(Helpers, db, Ansi)

    co(function *() {
      return yield mk.handle({}, {force: true})
    }).then(function (response) {
      done()
    }).catch(done)

  })

  it('should rollback given migrations using Rollback command handle method' , function (done) {
    const mk = new Rollback(Helpers, db, Ansi)

    co(function *() {
      return yield mk.handle({}, {force: true})
    }).then(function (response) {
      done()
    }).catch(done)

  })

})
