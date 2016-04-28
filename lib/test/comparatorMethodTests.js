'use strict';

var _chai = require('chai');

var _index = require('../index');

var _items = require('../fixtures/items1');

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Comparator methods', function () {
  describe('#is', function () {
    it('should filter based on the values of regular filter fields', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('boolTestField', {
        is: true
      });
      var filtered = filter.run(_items2.default, query);
      (0, _chai.expect)(filtered.length).to.equal(1);
    });
    it('should filter based on token fields', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('$index', {
        is: 1
      });
      var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
      (0, _chai.expect)(filteredIndexes.length).to.equal(1);
      (0, _chai.expect)(filteredIndexes[0]).to.equal(1);
    });
  });

  describe('#isNot', function () {
    it('should filter', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('boolTestField', {
        isNot: true
      });
      var filtered = filter.run(_items2.default, query);
      (0, _chai.expect)(filtered.length).to.equal(2);
    });
  });

  describe('#isShallowEqual', function () {
    it('should filter', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('objectWithKeys', {
        isShallowEqual: {
          key1: 0,
          key2: 1
        }
      });
      var filtered = filter.run(_items2.default, query);
      (0, _chai.expect)(filtered.length).to.equal(1);
    });
  });

  describe('#isNotShallowEqual', function () {
    it('should filter', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('objectWithKeys', {
        isNotShallowEqual: {
          key1: 0,
          key2: 1
        }
      });
      var filtered = filter.run(_items2.default, query);
      (0, _chai.expect)(filtered.length).to.equal(2);
    });
  });

  describe('#isOneOf', function () {
    it('should compare the given value to the field value if the argument is anything other than an array', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('valueTestField', {
        isOneOf: 'first'
      });
      var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
      (0, _chai.expect)(filteredIndexes[0]).to.equal(0);
    });
    it('should return full items array if an empty array is passed', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('valueTestField', {
        isOneOf: []
      });
      var filtered = filter.run(_items2.default, query);
      (0, _chai.expect)(filtered.length).to.equal(_items2.default.length);
    });
    it('should test field value against all values in given an array of a populated array is given, will return true if there are any matches', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('valueTestField', {
        isOneOf: ['first', 'third']
      });
      var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
      (0, _chai.expect)(filteredIndexes[0]).to.equal(0);
      (0, _chai.expect)(filteredIndexes[1]).to.equal(2);
    });
  });

  describe('#anyMatchesAny', function () {
    it('should take an input array and test against an array and if any of the items from the first array match any of the items from the second array then return true', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('multiMatch', {
        anyMatchesAny: ['FirstRef', 'SecondRef']
      });
      var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
      (0, _chai.expect)(filteredIndexes.length).to.equal(2);
      (0, _chai.expect)(filteredIndexes[0]).to.equal(0);
      (0, _chai.expect)(filteredIndexes[1]).to.equal(1);

      var query2 = new _index.QueryBuilder('multiMatch', {
        anyMatchesAny: ['FirstRef', 'ThirdRef']
      });
      var filteredIndexes2 = filter.returnFilteredIndexes(_items2.default, query2);
      (0, _chai.expect)(filteredIndexes2.length).to.equal(3);

      var query3 = new _index.QueryBuilder('multiMatch', {
        anyMatchesAny: 'SecondRef'
      });
      var filteredIndexes3 = filter.returnFilteredIndexes(_items2.default, query3);
      (0, _chai.expect)(filteredIndexes3.length).to.equal(2);
      (0, _chai.expect)(filteredIndexes3[0]).to.equal(0);
      (0, _chai.expect)(filteredIndexes3[1]).to.equal(1);

      var query4 = new _index.QueryBuilder('multiMatch', {
        anyMatchesAny: 'ThirdRef'
      });
      var filteredIndexes4 = filter.returnFilteredIndexes(_items2.default, query4);
      (0, _chai.expect)(filteredIndexes4.length).to.equal(2);
      (0, _chai.expect)(filteredIndexes4[0]).to.equal(1);
      (0, _chai.expect)(filteredIndexes4[1]).to.equal(2);
    });
  });

  describe('#isAtLeast', function () {
    it('should test that a numeric field value is at least as large (greater than or equal to) the given value', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('numericTestField', {
        isAtLeast: 5
      });
      var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
      (0, _chai.expect)(filteredIndexes.length).to.equal(2);
      (0, _chai.expect)(filteredIndexes[0]).to.equal(1);
      (0, _chai.expect)(filteredIndexes[1]).to.equal(2);
    });
  });

  describe('#isLessThanOrEqualTo', function () {
    it('should test that a numeric field value is less than or equal to the given value', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('numericTestField', {
        isLessThanOrEqualTo: 5
      });
      var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
      (0, _chai.expect)(filteredIndexes.length).to.equal(2);
      (0, _chai.expect)(filteredIndexes[0]).to.equal(0);
      (0, _chai.expect)(filteredIndexes[1]).to.equal(1);
    });
  });

  describe('#isMoreThan', function () {
    it('should test that a numeric field value is more than the given value', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('numericTestField', {
        isMoreThan: 5
      });
      var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
      (0, _chai.expect)(filteredIndexes.length).to.equal(1);
      (0, _chai.expect)(filteredIndexes[0]).to.equal(2);
    });
  });

  describe('#isLessThan', function () {
    it('should test that a numeric field value is less than the given value', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('numericTestField', {
        isLessThan: 5
      });
      var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
      (0, _chai.expect)(filteredIndexes.length).to.equal(1);
      (0, _chai.expect)(filteredIndexes[0]).to.equal(0);
    });
  });

  describe('#customComparatorMethod', function () {
    it('should should accept a custom comparator method', function () {
      var filter = new _index.Filter({
        customComparatorMethods: {
          isDouble: function isDouble(fieldVal, comparatorVal) {
            return fieldVal === 2 * comparatorVal;
          }
        }
      });
      var query = new _index.QueryBuilder('numericTestField', {
        isDouble: 5
      });
      var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
      (0, _chai.expect)(filteredIndexes.length).to.equal(1);
      (0, _chai.expect)(filteredIndexes[0]).to.equal(2);
    });
    it('should should accept a custom comparator method with token fieldKeys', function () {
      var filter = new _index.Filter({
        customComparatorMethods: {
          isName: function isName(item, comparatorVal) {
            if (item.name === comparatorVal) {
              return true;
            }
          }
        }
      });
      var query = new _index.QueryBuilder('$item', {
        isName: 'Product 1'
      });
      var filteredIndexes = filter.returnFilteredIndexes(_items2.default, query);
      (0, _chai.expect)(filteredIndexes.length).to.equal(1);
      (0, _chai.expect)(filteredIndexes[0]).to.equal(0);
    });
  });
}); /* global describe, it */