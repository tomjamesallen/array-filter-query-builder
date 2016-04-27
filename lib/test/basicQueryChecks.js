'use strict';

var _chai = require('chai');

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _index = require('../index');

var _query = require('../fixtures/query1');

var _query2 = _interopRequireDefault(_query);

var _query3 = require('../fixtures/query2');

var _query4 = _interopRequireDefault(_query3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('New `Query`s should return an empty array from `serialise`', function () {
  it('should generate a new query, which should return an empty array from `serialise`', function () {
    var query = new _index.QueryBuilder();
    var serialised = query.serialise();
    (0, _chai.expect)(Array.isArray(serialised)).to.equal(true);
    (0, _chai.expect)(serialised.length).to.equal(0);
  });
}); /* global describe, it */


describe('New `Query`s should accept a serialised array of query arguments', function () {
  it('should accept a serialised array of query arguments in the constructor method and then return an array from `serialise` that is `shallowequal`.', function () {
    var query = new _index.QueryBuilder(_query2.default);
    var serialised = query.serialise();
    (0, _chai.expect)((0, _shallowequal2.default)(_query2.default, serialised)).to.equal(true);
  });
});

describe('A `Query`s `add` method should accept a `keyInput`+`queryArgument` pair or an array of query arguments', function () {
  it('accepts a `keyInput`+`queryArgument` pair', function () {
    var query = new _index.QueryBuilder(_query2.default);
    query.add('numericTestField', {
      is: 3
    });
    var serialised = query.serialise();
    (0, _chai.expect)(serialised.length).to.equal(_query2.default.length + 1);
  });
});

// it('should update a query property from `update` and then return that updated property from `serialise`', () => {

//   })

//   it('should accept an object of query properties')