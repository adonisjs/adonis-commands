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
const fs = require('co-fs-extra')
const path = require('path')
const dotEnv = require('dotenv')
const expect = chai.expect
require('co-mocha')

describe('Generators', function () {
  before(function * () {
    yield setup.start()
    yield setup.registerProviders()
    setup.registerCommands()
  })

  after(function * () {
    yield setup.end()
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

  context('View', function () {
    it('should create a template view', function * () {
      yield setup.invokeCommand('make:view', ['home'], {})
      const view = yield fs.readFile(path.join(__dirname, './app/views/home.html'), 'utf-8')
      expect(view).to.be.a('string')
    })

    it('should be able to extend a master view', function * () {
      yield setup.invokeCommand('make:view', ['user'], {extend: 'master'})
      const view = yield fs.readFile(path.join(__dirname, './app/views/user.html'), 'utf-8')
      expect(view.trim()).to.equal('{% extends \'master\' %}')
    })

    it('should be able to create nested views', function * () {
      yield setup.invokeCommand('make:view', ['post/list'], {})
      const view = yield fs.readFile(path.join(__dirname, './app/views/post/list.html'), 'utf-8')
      expect(view).to.be.a('string')
    })
  })

  context('Command', function () {
    it('should create a command', function * () {
      yield setup.invokeCommand('make:command', ['greet'], {})
      const GreetCommand = require('./app/Commands/Greet.js')
      expect(GreetCommand.name).to.equal('Greet')
    })
  })

  context('Hook', function () {
    it('should create a hook', function * () {
      yield setup.invokeCommand('make:hook', ['user'], {})
      const userHook = require('./app/Model/Hooks/User.js')
      expect(userHook).to.be.an('object')
      expect(userHook.methodName).to.be.a('function')
    })

    it('should create a hook with a given method', function * () {
      yield setup.invokeCommand('make:hook', ['account'], {method: 'validate'})
      const accountHook = require('./app/Model/Hooks/Account.js')
      expect(accountHook).to.be.an('object')
      expect(accountHook.validate).to.be.a('function')
    })
  })

  context('Listener', function () {
    it('should create a listener', function * () {
      yield setup.invokeCommand('make:listener', ['http'], {})
      const httpListener = require('./app/Listeners/Http.js')
      expect(httpListener).to.be.an('object')
      expect(httpListener.methodName).to.be.a('function')
    })

    it('should create a listener with a given method', function * () {
      yield setup.invokeCommand('make:listener', ['auth'], {method: 'login'})
      const authListener = require('./app/Listeners/Auth.js')
      expect(authListener).to.be.an('object')
      expect(authListener.login).to.be.a('function')
    })
  })

  context('Middleware', function () {
    it('should create a middleware', function * () {
      yield setup.invokeCommand('make:middleware', ['Cors'], {})
      const CorsMiddleware = require('./app/Http/Middleware/Cors.js')
      expect(CorsMiddleware.name).to.equal('Cors')
    })
  })

  context('Seed', function () {
    it('should create a seed file', function * () {
      yield setup.invokeCommand('make:seed', ['User'], {})
      const UserSeeder = require('./app/seeds/User.js')
      expect(UserSeeder.name).to.equal('UserSeeder')
    })
  })

  context('Key', function () {
    it('should generate app key inside .env file', function * () {
      const envContents = ['NODE_ENV = production', 'DB_CONNECTION=sqlite3'].join('\n')
      const envPath = path.join(__dirname, './app/.env')
      yield fs.outputFile(envPath, envContents)
      yield setup.invokeCommand('key:generate', [], {})
      const writtenContents = yield fs.readFile(envPath, 'utf-8')
      expect(dotEnv.parse(writtenContents).APP_KEY.length).to.equal(32)
    })

    it('should generate app key inside .env file with a defined size', function * () {
      const envPath = path.join(__dirname, './app/.env')
      yield setup.invokeCommand('key:generate', [], {size: 16})
      const writtenContents = yield fs.readFile(envPath, 'utf-8')
      expect(dotEnv.parse(writtenContents).APP_KEY.length).to.equal(16)
    })

    it('should be able to define .env path', function * () {
      const envPath = path.join(__dirname, './app/tmp/.env')
      const envContents = ['NODE_ENV = production', 'DB_CONNECTION=sqlite3'].join('\n')
      yield fs.outputFile(envPath, envContents)
      yield setup.invokeCommand('key:generate', [], {env: 'tmp/.env'})
      const writtenContents = yield fs.readFile(envPath, 'utf-8')
      expect(dotEnv.parse(writtenContents).APP_KEY.length).to.equal(32)
    })
  })
})
