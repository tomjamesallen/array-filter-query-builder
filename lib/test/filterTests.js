'use strict';

var _chai = require('chai');

var _index = require('../index');

var _items = require('../fixtures/items1');

var _items2 = _interopRequireDefault(_items);

var _items3 = require('../fixtures/items2');

var _items4 = _interopRequireDefault(_items3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import dummyQuery1 from '../fixtures/query1'
// import dummyQuery2 from '../fixtures/query2'
/* global describe, it */


describe('A `Filter` instace’s `run` method should return the full items array if not passed a query', function () {
  it('should return full items array', function () {
    var filter = new _index.Filter();
    var filtered = filter.run(_items2.default);
    (0, _chai.expect)(filtered.length).to.equal(_items2.default.length);
  });
});
// import shallowequal from 'shallowequal'

describe('A `Filter` instace’s `returnFilteredIndexes` method should return the full array of input indexes if not passed a query', function () {
  it('should return full array of indexes', function () {
    var filter = new _index.Filter();
    var filteredIndexes = filter.returnFilteredIndexes(_items2.default);
    (0, _chai.expect)(filteredIndexes.length).to.equal(_items2.default.length);
    (0, _chai.expect)(filteredIndexes[filteredIndexes.length - 1]).to.equal(filteredIndexes.length - 1);
  });
});

describe('A `Filter` instace’s `run` method should filter based on the `Query` instance that it’s passed', function () {
  it('should filter the items', function () {
    var filter = new _index.Filter();

    var query = new _index.QueryBuilder().add('boolTestField', {
      is: true
    });
    var filtered = filter.run(_items2.default, query);
    (0, _chai.expect)(Array.isArray(filtered)).to.equal(true);
    (0, _chai.expect)(filtered.length).to.equal(1);

    var query2 = new _index.QueryBuilder().add('boolTestField', {
      is: false
    });
    var filtered2 = filter.run(_items2.default, query2);
    (0, _chai.expect)(Array.isArray(filtered2)).to.equal(true);
    (0, _chai.expect)(filtered2.length).to.equal(2);
  });
});

describe('A `Filter` constructor should accept a `nestedFilterFieldsObject` property, which defines where to look for the filterFields', function () {
  it('should filter the items based on the nested filter fields', function () {
    var filter = new _index.Filter({
      nestedFilterFieldsObject: 'filterFields'
    });

    var query = new _index.QueryBuilder().add('boolTestField', {
      is: true
    });
    var filtered = filter.run(_items4.default, query);
    (0, _chai.expect)(Array.isArray(filtered)).to.equal(true);
    (0, _chai.expect)(filtered.length).to.equal(1);

    var query2 = new _index.QueryBuilder().add('boolTestField', {
      is: false
    });
    var filtered2 = filter.run(_items4.default, query2);
    (0, _chai.expect)(Array.isArray(filtered2)).to.equal(true);
    (0, _chai.expect)(filtered2.length).to.equal(2);
  });
});

describe('A `Filter` instace should reproduce the same results from a serialised then deserialised query as from the original query.', function () {});