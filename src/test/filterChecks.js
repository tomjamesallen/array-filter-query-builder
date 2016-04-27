/* global describe, it */
import { expect } from 'chai'
import shallowequal from 'shallowequal'

import { QueryBuilder, Filter } from '../index'
import dummyQuery1 from '../fixtures/query1'
import dummyQuery2 from '../fixtures/query2'
import dummyItems1 from '../fixtures/items1'
import dummyItems2 from '../fixtures/items2'

describe('A `Filter`s run method should return the full items array if not passed a query', () => {
  it('should return full items array', () => {
    let filter = new Filter()
    let filtered = filter.run(dummyItems1)
    expect(filtered.length).to.equal(dummyItems1.length)
  })
})
