'use strict';

var _chai = require('chai');

var _index = require('../index');

var _items = require('../fixtures/items1');

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Comparator methods', function () {
  describe('#is', function () {
    it('should', function () {
      var filter = new _index.Filter();
      var query = new _index.QueryBuilder('boolTestField', {
        is: true
      });
      console.log(filter);
      // console.log(query.serialise())
      // console.log(dummyItems1)
      var filtered = filter.run(_items2.default, query);
      // console.log(filtered)
      (0, _chai.expect)(filtered.length).to.equal(1);
    });
  });

  describe('#isShallowEqual', function () {});

  describe('#isNot', function () {});

  describe('#isAtLeast', function () {});

  describe('#isLessThanOrEqualTo', function () {});

  describe('#isMoreThan', function () {});

  describe('#isLessThan', function () {});

  describe('#isOneOf', function () {});

  describe('custom comparator', function () {});
}); /* global describe, it */