'use strict';

var _chai = require('chai');

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _index = require('../index');

var _query = require('../fixtures/query1');

var _query2 = _interopRequireDefault(_query);

var _query3 = require('../fixtures/query2');

var _query4 = _interopRequireDefault(_query3);

var _items = require('../fixtures/items1');

var _items2 = _interopRequireDefault(_items);

var _items3 = require('../fixtures/items2');

var _items4 = _interopRequireDefault(_items3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('A `Filter`s run method should return the full items array if not passed a query', function () {
  it('should return full items array', function () {
    var filter = new _index.Filter();
    var filtered = filter.run(_items2.default);
    (0, _chai.expect)(filtered.length).to.equal(_items2.default.length);
  });
}); /* global describe, it */