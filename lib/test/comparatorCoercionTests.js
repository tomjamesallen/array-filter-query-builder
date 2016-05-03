'use strict';

var _chai = require('chai');

var _index = require('../index');

var _items = require('../fixtures/items1');

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Comparator coercion tests', function () {
  describe('#coerceStringComparators', function () {
    it('should default to true', function () {
      var filter = new _index.Filter();
      (0, _chai.expect)(filter.config.coerceStringComparators).to.equal(true);
    });
    describe('#coerceStringComparators === true', function () {
      it('should match a numeric `5` with a string "5"', function () {
        var filter = new _index.Filter({
          coerceStringComparators: true
        });
        var query = new _index.QueryBuilder('numericTestField', {
          is: '5'
        });
        var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
        (0, _chai.expect)(filteredIndexes.length).to.equal(1);
        (0, _chai.expect)(filteredIndexes[0]).to.equal(1);
      });
    });
    describe('#coerceStringComparators === false', function () {
      it('should not match a numeric `5` with a string "5"', function () {
        var filter = new _index.Filter({
          coerceStringComparators: false
        });
        var query = new _index.QueryBuilder('numericTestField', {
          is: '5'
        });
        var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
        (0, _chai.expect)(filteredIndexes.length).to.equal(0);
      });
    });
  });

  describe('#coerceNumericComparators', function () {
    it('should default to true', function () {
      var filter = new _index.Filter();
      (0, _chai.expect)(filter.config.coerceNumericComparators).to.equal(true);
    });
    describe('#coerceNumericComparators === true', function () {
      it('should do an `isMoreThan` comparison and treat values as numbers', function () {
        var filter = new _index.Filter({
          coerceNumericComparators: true
        });
        var query = new _index.QueryBuilder('numberAsStringField', {
          isMoreThan: '9'
        });
        var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
        (0, _chai.expect)(filteredIndexes.length).to.equal(1);
        (0, _chai.expect)(filteredIndexes[0]).to.equal(2);
      });
    });
    describe('#coerceNumericComparators === false', function () {
      it('should do an `isMoreThan` comparison and treat values as strings', function () {
        var filter = new _index.Filter({
          coerceNumericComparators: false
        });
        var query = new _index.QueryBuilder('numberAsStringField', {
          isMoreThan: '9'
        });
        var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
        (0, _chai.expect)(filteredIndexes.length).to.equal(0);
      });
    });
  });
}); /* global describe, it */