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

describe('New `Query`s should return an empty array from `serialise`', function () {
  it('should generate a new query, which should return an empty array from `serialise`', function () {
    var query = new _index.QueryBuilder();
    var serialised = query.serialise();
    (0, _chai.expect)(Array.isArray(serialised)).to.equal(true);
    (0, _chai.expect)(serialised.length).to.equal(0);
  });
});

describe('New `Query`s should accept a serialised array of query arguments', function () {
  it('should accept a serialised array of query arguments in the constructor method and then return an array from `serialise` that is `shallowequal`.', function () {
    var query = new _index.QueryBuilder(_query2.default);
    var serialised = query.serialise();
    (0, _chai.expect)((0, _shallowequal2.default)(_query2.default, serialised)).to.equal(true);
  });
});

describe('A `Query`s `add` method should accept a `fieldKey`+`queryArgument` pair or an array of query arguments', function () {
  it('should accept a `fieldKey`+`queryArgument` pair', function () {
    var query = new _index.QueryBuilder(_query2.default);
    query.add('numericTestFieldKey', {
      is: 3
    });
    var serialised = query.serialise();
    (0, _chai.expect)(serialised.length).to.equal(_query2.default.length + 1);
  });

  it('should accept a `fieldKey`+`queryArgument` pair with multiple queryArguments per `fieldKey`', function () {
    var query = new _index.QueryBuilder(_query2.default);
    query.add('numericTestField', {
      is: 3,
      isNot: 4
    });
    var serialised = query.serialise();
    (0, _chai.expect)(serialised.length).to.equal(_query2.default.length + 2);
  });

  it('should accept a boolean reset value as a third argument, which resets any query arguments matching the field.', function () {
    var query = new _index.QueryBuilder(_query2.default);
    query.add('boolTestField', {
      is: false
    }, true);
    var serialised = query.serialise();
    (0, _chai.expect)(serialised.length).to.equal(_query2.default.length);
  });
});

describe('A `Query`s `add` method should accept an array of query arguments', function () {
  it('should append the query arguments and return all of the arguments from its `serialise` method', function () {
    var query = new _index.QueryBuilder(_query2.default);
    query.add([['boolTestField', 'is', false], ['numericTestField', 'is', 4]]);
    var serialised = query.serialise();
    (0, _chai.expect)(serialised.length).to.equal(_query2.default.length + 2);
  });

  it('should accept a boolean reset value as a second argument, which will reset any query arguments matching the field of any of the query arguments.', function () {
    var query = new _index.QueryBuilder(_query2.default);
    query.add([['boolTestField', 'is', false], ['numericTestField', 'is', 4]], true);
    var serialised = query.serialise();
    (0, _chai.expect)(serialised.length).to.equal(_query2.default.length + 1);
  });
});

describe('A `Query`s `replace` method should behave in the same way as the `add` method, but with `reset` set to true.', function () {
  it('should delete any existing query arguments with the same `fieldKey` and then add the new query argument', function () {
    var query = new _index.QueryBuilder(_query2.default);
    query.replace('boolTestField', {
      is: false
    });
    var serialised = query.serialise();
    var lastQueryArgument = serialised[serialised.length - 1];
    (0, _chai.expect)(serialised.length).to.equal(_query2.default.length);
    (0, _chai.expect)((0, _shallowequal2.default)(lastQueryArgument, ['boolTestField', 'is', false])).to.equal(true);
  });

  it('should accept an array of query arguments, and delete any existing query arguments that match the `fieldKey`s.', function () {
    var query = new _index.QueryBuilder(_query2.default);
    query.replace(_query4.default);
    var serialised = query.serialise();
    var start = serialised.length - _query4.default.length;
    var end = serialised.length;
    var newItems = serialised.slice(start, end);

    var isEqual = true;

    _query4.default.forEach(function (queryArgument, i) {
      var newItemsQueryArgument = newItems[i];
      if ((typeof newItemsQueryArgument === 'undefined' ? 'undefined' : _typeof(newItemsQueryArgument)) !== 'object') {
        isEqual = false;
        return;
      }
      queryArgument.forEach(function (arg, i) {
        var newItemsQueryArgumentArg = newItemsQueryArgument[i];
        if (arg !== newItemsQueryArgumentArg) {
          isEqual = false;
        }
      });
    });

    (0, _chai.expect)(isEqual).to.equal(true);
  });
});

// it('should update a query property from `update` and then return that updated property from `serialise`', () => {

//   })

//   it('should accept an object of query properties')