/* global describe, it */
import { expect } from 'chai'
import shallowequal from 'shallowequal'

import { QueryBuilder } from '../index'
import dummyQuery1 from '../fixtures/query1'
import dummyQuery2 from '../fixtures/query2'

describe('New `Query`s should return an empty object from `serialise`', () => {
  it('should generate a new query, which should return an empty object from `serialise`', () => {
    let query = new QueryBuilder()
    const serialised = query.serialise()
    expect(typeof serialised).to.equal('object')
    expect(Object.keys(serialised).length).to.equal(0)
  })
})

describe('New `Query`s should accept a serialised object of query arguments', () => {
  it('should accept a serialised object of query arguments in the constructor method and then return the same keys from `serialise`', () => {
    let query = new QueryBuilder(dummyQuery1)
    const serialised = query.serialise()
    const originalKeys = Object.keys(dummyQuery1)
    const serialisedKeys = Object.keys(serialised)
    expect(shallowequal(originalKeys, serialisedKeys)).to.equal(true)
  })
})

describe('A `Query`s update method should accept a `keyInput`+`queryArgument` pair or an object of query arguments', () => {
  it('accepts a `keyInput`+`queryArgument` pair' () => {
    let query = new QueryBuilder(dummyQuery1)
  })
})


// it('should update a query property from `update` and then return that updated property from `serialise`', () => {

//   })

//   it('should accept an object of query properties')
