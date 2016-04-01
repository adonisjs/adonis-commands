'use strict'

/**
 * ado.nis-commands
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/
/* global describe, it, before, after, context */
const chai = require('chai')
const setup = require('./setup')
const expect = chai.expect
require('co-mocha')

describe('Generators', function () {
  before(function * () {
    yield setup.start()
    yield setup.registerProviders()
    setup.registerCommands()
  })

  after(function * () {
    // yield setup.end()
  })

  context('Migration', function () {
    it('should create a new migration', function * () {
      yield setup.invokeCommand('make:migration', ['User'], {create: 'users'})
      const UserSchema = require('./app/migrations/User.js')
      expect(UserSchema.name).to.equal('UserSchema')
      expect(new UserSchema().up).to.be.a('function')
      expect(new UserSchema().down).to.be.a('function')
    })
  })

  context('Controller', function () {
    it('should create a new controller', function * () {
      yield setup.invokeCommand('make:controller', ['User'], {})
      const UserController = require('./app/Http/Controllers/UserController.js')
      const user = new UserController()
      expect(UserController.name).to.equal('UserController')
      expect(user.index).to.be.a('function')
      expect(user.create).to.be.a('function')
      expect(user.store).to.be.a('function')
      expect(user.show).to.be.a('function')
      expect(user.edit).to.be.a('function')
      expect(user.update).to.be.a('function')
      expect(user.destroy).to.be.a('function')
    })
  })

  context('Model', function () {
    it('should create a new model', function * () {
      yield setup.invokeCommand('make:model', ['User'], {})
      const UserModel = require('./app/Model/User.js')
      expect(UserModel.name).to.equal('User')
    })
  })
})
