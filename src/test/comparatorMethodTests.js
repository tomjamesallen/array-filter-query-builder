/* global describe, it */
import { expect } from 'chai'

import { QueryBuilder, Filter } from '../index'

import dummyItems1 from '../fixtures/items1'

describe('Comparator methods', () => {
  describe('#is', () => {
    it('should', () => {
      const filter = new Filter()
      const query = new QueryBuilder('boolTestField', {
        is: true
      })
      const filtered = filter.run(dummyItems1, query)
      expect(filtered.length).to.equal(1)
    })
  })

  describe('#isShallowEqual', () => {

  })

  describe('#isNot', () => {
    
  })

  describe('#isAtLeast', () => {
    
  })

  describe('#isLessThanOrEqualTo', () => {
    
  })

  describe('#isMoreThan', () => {
    
  })

  describe('#isLessThan', () => {
    
  })

  describe('#isOneOf', () => {
    
  })

  describe('custom comparator', () => {

  })
})
