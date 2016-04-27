'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clone2 = require('clone');

var _clone3 = _interopRequireDefault(_clone2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueryBuilder = function () {
  function QueryBuilder(importArray) {
    _classCallCheck(this, QueryBuilder);

    this._currentQuery = [];
    this.deserialise(importArray);
  }

  // update(keyInput, arg2 = false, arg3 = false) {
  //   if (typeof keyInput === 'string') {
  //     let queryArgument = arg2
  //     let reset = arg3
  //     if (queryArgument) {
  //       this._currentQuery[keyInput] = queryArgument
  //     }
  //   }
  //   else if (typeof keyInput === 'object') {
  //     let reset = arg2
  //     if (reset) {
  //       this.reset()
  //     }
  //     this.deserialise(keyInput)
  //   }
  //   return this
  // }

  // reset(keyInput = null) {
  //   if (keyInput === null) {
  //     this._currentQuery = {}
  //   }
  //   else if (Array.isArray(keyInput)) {
  //     let keys = keyInput
  //     keys.forEach((key) => {
  //       delete this._currentQuery[key]
  //     })
  //   }
  //   else if (typeof keyInput === 'string') {
  //     let key = keyInput
  //     delete this._currentQuery[key]
  //   }
  //   return this
  // }

  _createClass(QueryBuilder, [{
    key: 'add',
    value: function add() {}
  }, {
    key: 'reset',
    value: function reset() {}
  }, {
    key: 'replace',
    value: function replace() {}
  }, {
    key: 'deserialise',
    value: function deserialise(importArray) {
      var _this = this;

      if (Array.isArray(importArray)) {
        importArray.forEach(function (item) {
          _this._currentQuery.push(item);
        });
      }
      return this;
    }
  }, {
    key: 'serialise',
    value: function serialise() {
      return this._currentQuery;
    }
  }, {
    key: 'clone',
    value: function clone() {
      return (0, _clone3.default)(this);
    }
  }]);

  return QueryBuilder;
}();

exports.default = QueryBuilder;