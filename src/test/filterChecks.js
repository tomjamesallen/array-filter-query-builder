/* global describe, it */
import { expect } from 'chai'
import shallowequal from 'shallowequal'

import { QueryBuilder, Filter } from '../index'
import dummyQuery1 from '../fixtures/query1'
import dummyQuery2 from '../fixtures/query2'
import dummyItems1 from '../fixtures/items1'
import dummyItems2 from '../fixtures/items2'

describe('A `Filter`s `run` method should return the full items array if not passed a query', () => {
  it('should return full items array', () => {
    let filter = new Filter()
    let filtered = filter.run(dummyItems1)
    expect(filtered.length).to.equal(dummyItems1.length)
  })
})

describe('A `Filter`s `returnFilteredIndexes` method should return the full array of input indexes if not passed a query', () => {
  it('should return full array of indexes', () => {
    let filter = new Filter()
    let filteredIndexes = filter.returnFilteredIndexes(dummyItems1)
    expect(filteredIndexes.length).to.equal(dummyItems1.length)
    expect(filteredIndexes[filteredIndexes.length - 1]).to.equal(filteredIndexes.length - 1)
  })
})

describe('A `Filter`s `run` method should filter based on the `Query` instance that it’s passed', () => {
  it('should filter the items', () => {
    let query = new QueryBuilder().add('boolTestField', {
      is: true
    })
    const filtered = new Filter().run(dummyItems1, query)
    // console.log(filtered)
  })
})