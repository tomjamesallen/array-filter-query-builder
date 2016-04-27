/* global describe, it */
import { expect } from 'chai'
import shallowequal from 'shallowequal'

import { QueryBuilder } from '../index'
import dummyQuery1 from '../fixtures/query1'
import dummyQuery2 from '../fixtures/query2'

describe('New `Query`s should return an empty array from `serialise`', () => {
  it('should generate a new query, which should return an empty array from `serialise`', () => {
    let query = new QueryBuilder()
    const serialised = query.serialise()
    expect(Array.isArray(serialised)).to.equal(true)
    expect(serialised.length).to.equal(0)
  })
})

describe('New `Query`s should accept a serialised array of query arguments', () => {
  it('should accept a serialised array of query arguments in the constructor method and then return an array from `serialise` that is `shallowequal`.', () => {
    let query = new QueryBuilder(dummyQuery1)
    const serialised = query.serialise()
    expect(shallowequal(dummyQuery1, serialised)).to.equal(true)
  })
})

describe('A `Query`s `add` method should accept a `keyInput`+`queryArgument` pair or an array of query arguments', () => {
  it('accepts a `keyInput`+`queryArgument` pair', () => {
    let query = new QueryBuilder(dummyQuery1)
    query.add('numericTestField', {
      is: 3
    })
    const serialised = query.serialise()
    expect(serialised.length).to.equal(dummyQuery1.length + 1)
  })
})


// it('should update a query property from `update` and then return that updated property from `serialise`', () => {

//   })

//   it('should accept an object of query properties')
