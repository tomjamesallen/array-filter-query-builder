'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clone2 = require('clone');

var _clone3 = _interopRequireDefault(_clone2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueryBuilder = function () {
  function QueryBuilder(importArray) {
    _classCallCheck(this, QueryBuilder);

    this._currentQuery = [];
    this.deserialise(importArray);
  }

  _createClass(QueryBuilder, [{
    key: 'update___',
    value: function update___(keyInput) {
      var arg2 = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      var arg3 = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      if (typeof keyInput === 'string') {
        var queryArgument = arg2;
        var reset = arg3;
        if (queryArgument) {
          this._currentQuery[keyInput] = queryArgument;
        }
      } else if ((typeof keyInput === 'undefined' ? 'undefined' : _typeof(keyInput)) === 'object') {
        var _reset = arg2;
        if (_reset) {
          this.reset();
        }
        this.deserialise(keyInput);
      }
      return this;
    }

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

  }, {
    key: '_addItemToCurrentQuery',
    value: function _addItemToCurrentQuery(fieldKey, comparator, value) {
      var queryArgument = [fieldKey, comparator, value];
      this._currentQuery.push(queryArgument);
    }
  }, {
    key: '_removeKeyFromCurrentQuery',
    value: function _removeKeyFromCurrentQuery(fieldKey) {
      var updatedQuery = this._currentQuery.filter(function (item) {
        if (item[0] === fieldKey) return false;else return true;
      });
      this._currentQuery = updatedQuery;
    }
  }, {
    key: 'add',
    value: function add(keyInput) {
      var _this = this;

      var arg2 = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      var arg3 = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      if (typeof keyInput === 'string') {
        var _ret = function () {
          if (!arg2) return {
              v: _this
            };

          var reset = arg3;
          var fieldKey = keyInput;
          var queryArguments = arg2;

          if (reset) _this._removeKeyFromCurrentQuery(fieldKey);

          Object.keys(queryArguments).forEach(function (comparator) {
            var value = queryArguments[comparator];
            _this._addItemToCurrentQuery(fieldKey, comparator, value);
          });
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      } else if (Array.isArray(keyInput)) {
        (function () {
          var queryArguments = keyInput;
          var reset = arg2;

          queryArguments.forEach(function (queryArgument) {
            if (reset) _this._removeKeyFromCurrentQuery(queryArgument[0]);
            _this._addItemToCurrentQuery.apply(_this, _toConsumableArray(queryArgument));
          });
        })();
      }

      return this;
    }
  }, {
    key: 'replace',
    value: function replace(keyInput) {
      var arg2 = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (typeof keyInput === 'string') {
        if (arg2) {
          this.add(keyInput, arg2, true);
        }
      } else if (Array.isArray(keyInput)) {
        this.add(keyInput, true);
      }

      return this;
    }
  }, {
    key: 'reset',
    value: function reset() {}
  }, {
    key: 'deserialise',
    value: function deserialise(importArray) {
      var _this2 = this;

      if (Array.isArray(importArray)) {
        importArray.forEach(function (item) {
          _this2._currentQuery.push(item);
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