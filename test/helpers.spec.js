'use strict'

const helpers = require('../src/Generators/helpers')
const chai = require('chai')
const expect = chai.expect

describe('Generator Helpers' , function () {

  it('should make a pascal case name', function () {
    expect(helpers.makeName('Users','Controller')).to.equal('UsersController')
  })

  it('should make a pascal case name when file name is lower case', function () {
    expect(helpers.makeName('users','Controller')).to.equal('UsersController')
  })

  it('should make a pascal case name when file name contains controller in itself', function () {
    expect(helpers.makeName('usersController','Controller')).to.equal('UsersController')
  })

  it('should make a pascal case name when file name contains controller in itself and is not camelCased', function () {
    expect(helpers.makeName('userscontroller','Controller')).to.equal('UsersController')
  })

  it('should make a pascal case name when file name contains controller in itself and is all uppercase', function () {
    expect(helpers.makeName('USERSCONTROLLER','Controller')).to.equal('UsersController')
  })

})
