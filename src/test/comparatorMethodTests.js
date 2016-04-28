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

  describe('#anyMatchesAny', () => {
    it('should take an input array and test against an array and if any of the items from the first array match any of the items from the second array then return true', () => {
      const filter = new Filter()
      const query = new QueryBuilder('multiMatch', {
        anyMatchesAny: ['FirstRef', 'SecondRef']
      })
      const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
      expect(filteredIndexes.length).to.equal(2)
      expect(filteredIndexes[0]).to.equal(0)
      expect(filteredIndexes[1]).to.equal(1)

      const query2 = new QueryBuilder('multiMatch', {
        anyMatchesAny: ['FirstRef', 'ThirdRef']
      })
      const filteredIndexes2 = filter.returnFilteredIndexes(dummyItems1, query2)
      expect(filteredIndexes2.length).to.equal(3)

      const query3 = new QueryBuilder('multiMatch', {
        anyMatchesAny: 'SecondRef'
      })
      const filteredIndexes3 = filter.returnFilteredIndexes(dummyItems1, query3)
      expect(filteredIndexes3.length).to.equal(2)
      expect(filteredIndexes3[0]).to.equal(0)
      expect(filteredIndexes3[1]).to.equal(1)

      const query4 = new QueryBuilder('multiMatch', {
        anyMatchesAny: 'ThirdRef'
      })
      const filteredIndexes4 = filter.returnFilteredIndexes(dummyItems1, query4)
      expect(filteredIndexes4.length).to.equal(2)
      expect(filteredIndexes4[0]).to.equal(1)
      expect(filteredIndexes4[1]).to.equal(2)
    })
  })

  describe('#isAtLeast', () => {
    it('should test that a numeric field value is at least as large (greater than or equal to) the given value', () => {
      const filter = new Filter()
      const query = new QueryBuilder('numericTestField', {
        isAtLeast: 5
      })
      const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
      expect(filteredIndexes.length).to.equal(2)
      expect(filteredIndexes[0]).to.equal(1)
      expect(filteredIndexes[1]).to.equal(2)
    })
  })

  describe('#isLessThanOrEqualTo', () => {
    it('should test that a numeric field value is less than or equal to the given value', () => {
      const filter = new Filter()
      const query = new QueryBuilder('numericTestField', {
        isLessThanOrEqualTo: 5
      })
      const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
      expect(filteredIndexes.length).to.equal(2)
      expect(filteredIndexes[0]).to.equal(0)
      expect(filteredIndexes[1]).to.equal(1)
    })
  })

  describe('#isMoreThan', () => {
    it('should test that a numeric field value is more than the given value', () => {
      const filter = new Filter()
      const query = new QueryBuilder('numericTestField', {
        isMoreThan: 5
      })
      const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
      expect(filteredIndexes.length).to.equal(1)
      expect(filteredIndexes[0]).to.equal(2)
    })
  })

  describe('#isLessThan', () => {
    it('should test that a numeric field value is less than the given value', () => {
      const filter = new Filter()
      const query = new QueryBuilder('numericTestField', {
        isLessThan: 5
      })
      const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
      expect(filteredIndexes.length).to.equal(1)
      expect(filteredIndexes[0]).to.equal(0)
    })
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
