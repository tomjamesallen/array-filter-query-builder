/* global describe, it */
import { expect } from 'chai'

import { QueryBuilder, Filter } from '../index'

describe('`Filter` class should be a function', () => {
  it('should be a function', () => {
    expect(typeof Filter).to.equal('function')
  })
})

describe('Running `new` on `Filter` class should return an object', () => {
  it('should be an object', () => {
    expect(typeof new Filter()).to.equal('object')
  })
})

describe('`QueryBuilder` class should be a function', () => {
  it('should be a function', () => {
    expect(typeof QueryBuilder).to.equal('function')
  })
})

describe('Running `new` on `QueryBuilder` class should return an object', () => {
  it('should be an object', () => {
    expect(typeof new QueryBuilder()).to.equal('object')
  })
})
