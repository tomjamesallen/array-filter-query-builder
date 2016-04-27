'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* global describe, it */


var _chai = require('chai');

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _index = require('../index');

var _query = require('../fixtures/query1');

var _query2 = _interopRequireDefault(_query);

var _query3 = require('../fixtures/query2');

var _query4 = _interopRequireDefault(_query3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('New `Query`s should return an empty object from `serialise`', function () {
  it('should generate a new query, which should return an empty object from `serialise`', function () {
    var query = new _index.QueryBuilder();
    var serialised = query.serialise();
    (0, _chai.expect)(typeof serialised === 'undefined' ? 'undefined' : _typeof(serialised)).to.equal('object');
    (0, _chai.expect)(Object.keys(serialised).length).to.equal(0);
  });
});

describe('New `Query`s should accept a serialised object of query arguments', function () {
  it('should accept a serialised object of query arguments in the constructor method and then return the same keys from `serialise`', function () {
    var query = new _index.QueryBuilder(_query2.default);
    var serialised = query.serialise();
    var originalKeys = Object.keys(_query2.default);
    var serialisedKeys = Object.keys(serialised);
    (0, _chai.expect)((0, _shallowequal2.default)(originalKeys, serialisedKeys)).to.equal(true);
  });
});

describe('A `Query`s update method should accept a `keyInput`+`queryArgument` pair or an object of query arguments', function () {
  var query = new _index.QueryBuilder(_query2.default);
});

// it('should update a query property from `update` and then return that updated property from `serialise`', () => {

//   })

//   it('should accept an object of query properties')