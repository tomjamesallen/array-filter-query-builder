/* global describe, it */
import { expect } from 'chai'

import { QueryBuilder, Filter } from '../index'

import dummyItems1 from '../fixtures/items1'

describe('Comparator coercion tests', () => {
  describe('#coerceStringComparators', () => {
    it('should default to true', () => {
      const filter = new Filter()
      expect(filter.config.coerceStringComparators).to.equal(true)
    })
    describe('#coerceStringComparators === true', () => {
      it('should match a numeric `5` with a string "5"', () => {
        const filter = new Filter({
          coerceStringComparators: true
        })
        const query = new QueryBuilder('numericTestField', {
          is: '5'
        })
        const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
        expect(filteredIndexes.length).to.equal(1)
        expect(filteredIndexes[0]).to.equal(1)
      })
    })
    describe('#coerceStringComparators === false', () => {
      it('should not match a numeric `5` with a string "5"', () => {
        const filter = new Filter({
          coerceStringComparators: false
        })
        const query = new QueryBuilder('numericTestField', {
          is: '5'
        })
        const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
        expect(filteredIndexes.length).to.equal(0)
      })
    })
  })

  describe('#coerceNumericComparators', () => {
    it('should default to true', () => {
      const filter = new Filter()
      expect(filter.config.coerceNumericComparators).to.equal(true)
    })
    describe('#coerceNumericComparators === true', () => {
      it('should do an `isMoreThan` comparison and treat values as numbers', () => {
        const filter = new Filter({
          coerceNumericComparators: true
        })
        const query = new QueryBuilder('numberAsStringField', {
          isMoreThan: '9'
        })
        const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
        expect(filteredIndexes.length).to.equal(1)
        expect(filteredIndexes[0]).to.equal(2)
      })
    })
    describe('#coerceNumericComparators === false', () => {
      it('should do an `isMoreThan` comparison and treat values as strings', () => {
        const filter = new Filter({
          coerceNumericComparators: false
        })
        const query = new QueryBuilder('numberAsStringField', {
          isMoreThan: '9'
        })
        const filteredIndexes = filter.returnFilteredIndexes(dummyItems1, query)
        expect(filteredIndexes.length).to.equal(0)
      })
    })
  })
})
