/* global describe, it */
import { expect } from 'chai'
// import shallowequal from 'shallowequal'

import { QueryBuilder, Filter } from '../index'
// import dummyQuery1 from '../fixtures/query1'
// import dummyQuery2 from '../fixtures/query2'
import dummyItems1 from '../fixtures/items1'
import dummyItems2 from '../fixtures/items2'

describe('A `Filter` instace’s `run` method should return the full items array if not passed a query', () => {
  it('should return full items array', () => {
    let filter = new Filter()
    let filtered = filter.run(dummyItems1)
    expect(filtered.length).to.equal(dummyItems1.length)
  })
})

describe('A `Filter` instace’s `returnFilteredIndexes` method should return the full array of input indexes if not passed a query', () => {
  it('should return full array of indexes', () => {
    let filter = new Filter()
    let filteredIndexes = filter.returnFilteredIndexes(dummyItems1)
    expect(filteredIndexes.length).to.equal(dummyItems1.length)
    expect(filteredIndexes[filteredIndexes.length - 1]).to.equal(filteredIndexes.length - 1)
  })
})

describe('A `Filter` instace’s `run` method should filter based on the `Query` instance that it’s passed', () => {
  it('should filter the items', () => {
    const filter = new Filter()

    let query = new QueryBuilder().add('boolTestField', {
      is: true
    })
    const filtered = filter.run(dummyItems1, query)
    expect(Array.isArray(filtered)).to.equal(true)
    expect(filtered.length).to.equal(1)

    let query2 = new QueryBuilder().add('boolTestField', {
      is: false
    })
    const filtered2 = filter.run(dummyItems1, query2)
    expect(Array.isArray(filtered2)).to.equal(true)
    expect(filtered2.length).to.equal(2)
  })
})

describe('A `Filter` constructor should accept a `nestedFilterFieldsObject` property, which defines where to look for the filterFields', () => {
  it('should filter the items based on the nested filter fields', () => {
    const filter = new Filter({
      nestedFilterFieldsObject: 'filterFields'
    })

    let query = new QueryBuilder().add('boolTestField', {
      is: true
    })
    const filtered = filter.run(dummyItems2, query)
    expect(Array.isArray(filtered)).to.equal(true)
    expect(filtered.length).to.equal(1)

    let query2 = new QueryBuilder().add('boolTestField', {
      is: false
    })
    const filtered2 = filter.run(dummyItems2, query2)
    expect(Array.isArray(filtered2)).to.equal(true)
    expect(filtered2.length).to.equal(2)
  })
})

describe('A `Filter` instace’s run method should accept an array of query arguments', () => {
})

describe('A `Filter` instace should reproduce the same results from a serialised then deserialised query as from the original query.', () => {
})
