'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clone2 = require('clone');

var _clone3 = _interopRequireDefault(_clone2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueryBuilder = function () {
  function QueryBuilder(importObject) {
    _classCallCheck(this, QueryBuilder);

    this._currentQuery = {};
    this.deserialise(importObject);
  }

  _createClass(QueryBuilder, [{
    key: 'update',
    value: function update(keyInput) {
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
  }, {
    key: 'reset',
    value: function reset() {
      var _this = this;

      var keyInput = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (keyInput === null) {
        this._currentQuery = {};
      } else if (Array.isArray(keyInput)) {
        var keys = keyInput;
        keys.forEach(function (key) {
          delete _this._currentQuery[key];
        });
      } else if (typeof keyInput === 'string') {
        var key = keyInput;
        delete this._currentQuery[key];
      }
      return this;
    }
  }, {
    key: 'deserialise',
    value: function deserialise(importObject) {
      var _this2 = this;

      if ((typeof importObject === 'undefined' ? 'undefined' : _typeof(importObject)) === 'object') {
        var keys = Object.keys(importObject);
        keys.forEach(function (key) {
          _this2._currentQuery[key] = importObject[key];
        });
      }
      return this;
    }
  }, {
    key: 'serialise',
    value: function serialise() {
      var _this3 = this;

      var serialised = {};
      Object.keys(this._currentQuery).forEach(function (key) {
        serialised[key] = _this3._currentQuery[key];
      });
      return serialised;
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