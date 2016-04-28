/* global describe, it */
import { expect } from 'chai'

import { QueryBuilder, Filter } from '../index'

import dummyItems1 from '../fixtures/items1'

describe('Comparator methods', () => {
  describe('#is', () => {
    it('should filter based on the values of regular filter fields', () => {
      const filter = new Filter()
      const query = new QueryBuilder('boolTestField', {
        is: true
      })
      const filtered = filter.run(dummyItems1, query)
      expect(filtered.length).to.equal(1)
    })
    it('should filter based on token fields', () => {
      const filter = new Filter()
      const query = new QueryBuilder('$index', {
        is: 1
      })
      const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
      expect(filteredIndexes.length).to.equal(1)
      expect(filteredIndexes[0]).to.equal(1)
    })
  })

  describe('#isNot', () => {
    it('should filter', () => {
      const filter = new Filter()
      const query = new QueryBuilder('boolTestField', {
        isNot: true
      })
      const filtered = filter.run(dummyItems1, query)
      expect(filtered.length).to.equal(2)
    })
  })

  describe('#isShallowEqual', () => {
    it('should filter', () => {
      const filter = new Filter()
      const query = new QueryBuilder('objectWithKeys', {
        isShallowEqual: {
          key1: 0,
          key2: 1
        }
      })
      const filtered = filter.run(dummyItems1, query)
      expect(filtered.length).to.equal(1)
    })
  })

  describe('#isNotShallowEqual', () => {
    it('should filter', () => {
      const filter = new Filter()
      const query = new QueryBuilder('objectWithKeys', {
        isNotShallowEqual: {
          key1: 0,
          key2: 1
        }
      })
      const filtered = filter.run(dummyItems1, query)
      expect(filtered.length).to.equal(2)
    })
  })

  describe('#isOneOf', () => {
    it('should compare the given value to the field value if the argument is anything other than an array', () => {
      const filter = new Filter()
      const query = new QueryBuilder('valueTestField', {
        isOneOf: 'first'
      })
      const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
      expect(filteredIndexes[0]).to.equal(0)
    })
    it('should return full items array if an empty array is passed', () => {
      const filter = new Filter()
      const query = new QueryBuilder('valueTestField', {
        isOneOf: []
      })
      const filtered = filter.run(dummyItems1, query)
      expect(filtered.length).to.equal(dummyItems1.length)
    })
    it('should test field value against all values in given an array of a populated array is given, will return true if there are any matches', () => {
      const filter = new Filter()
      const query = new QueryBuilder('valueTestField', {
        isOneOf: ['first', 'third']
      })
      const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
      expect(filteredIndexes[0]).to.equal(0)
      expect(filteredIndexes[1]).to.equal(2)
    })
  })

  describe('#isAtLeast', () => {
    
  })

  describe('#isLessThanOrEqualTo', () => {
    
  })

  describe('#isMoreThan', () => {
    
  })

  describe('#isLessThan', () => {
    
  })

  describe('#customComparatorMethod', () => {
    it('should should accept a custom comparator method', () => {
      const filter = new Filter({
        customComparatorMethods: {
          isDouble(fieldVal, comparatorVal) {
            return fieldVal === 2 * comparatorVal
          }
        }
      })
      const query = new QueryBuilder('numericTestField', {
        isDouble: 5
      })
      const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
      expect(filteredIndexes.length).to.equal(1)
      expect(filteredIndexes[0]).to.equal(2)
    })
    it('should should accept a custom comparator method with token fieldKeys', () => {
      const filter = new Filter({
        customComparatorMethods: {
          isName(item, comparatorVal) {
            if (item.name === comparatorVal) {
              return true
            }
          }
        }
      })
      const query = new QueryBuilder('$item', {
        isName: 'Product 1'
      })
      const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
      expect(filteredIndexes.length).to.equal(1)
      expect(filteredIndexes[0]).to.equal(0)
    })
  })
})
