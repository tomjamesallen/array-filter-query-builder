'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  is: function is(val1, val2) {
    return val1 === val2;
  },
  isNot: function isNot(val1, val2) {
    return val1 !== val2;
  },
  isShallowEqual: function isShallowEqual(val1, val2) {
    return (0, _shallowequal2.default)(val1, val2);
  },
  isNotShallowEqual: function isNotShallowEqual(val1, val2) {
    return !(0, _shallowequal2.default)(val1, val2);
  },
  isOneOf: function isOneOf(val1, arrayOfTests) {
    if (!Array.isArray(arrayOfTests)) {
      var val2 = arrayOfTests;
      return this.is(val1, val2);
    } else if (!arrayOfTests.length) {
      return true;
    } else {
      var hasMatch = false;
      arrayOfTests.forEach(function (test) {
        if (val1 === test) {
          hasMatch = true;
        }
      });
      return hasMatch;
    }
  },
  anyMatchesAny: function anyMatchesAny(array1, array2) {
    var _this = this;

    var hasMatch = false;
    if (!Array.isArray(array1)) {
      if (this.isOneOf(array1, array2)) {
        hasMatch = true;
      }
    } else {
      array1.forEach(function (item) {
        if (_this.isOneOf(item, array2)) {
          hasMatch = true;
        }
      });
    }
    return hasMatch;
  },
  isAtLeast: function isAtLeast(val1, val2) {
    return val1 >= val2;
  },
  isLessThanOrEqualTo: function isLessThanOrEqualTo(val1, val2) {
    return val1 <= val2;
  },
  isMoreThan: function isMoreThan(val1, val2) {
    return val1 > val2;
  },
  isLessThan: function isLessThan(val1, val2) {
    return val1 < val2;
  }
};