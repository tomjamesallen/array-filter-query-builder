'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* global describe, it */


var _chai = require('chai');

var _index = require('../index');

describe('`Filter` class should be a function', function () {
  it('should be a function', function () {
    (0, _chai.expect)(typeof _index.Filter === 'undefined' ? 'undefined' : _typeof(_index.Filter)).to.equal('function');
  });
});

describe('Running `new` on `Filter` class should return an object', function () {
  it('should be a object', function () {
    (0, _chai.expect)(_typeof(new _index.Filter())).to.equal('object');
  });
});

describe('`QueryBuilder` class should be a function', function () {
  it('should be a function', function () {
    (0, _chai.expect)(typeof _index.QueryBuilder === 'undefined' ? 'undefined' : _typeof(_index.QueryBuilder)).to.equal('function');
  });
});

describe('Running `new` on `QueryBuilder` class should return an object', function () {
  it('should be an object', function () {
    (0, _chai.expect)(_typeof(new _index.QueryBuilder())).to.equal('object');
  });
});