'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _ComparatorMethods = require('./ComparatorMethods');

var _ComparatorMethods2 = _interopRequireDefault(_ComparatorMethods);

var _clone = require('clone');

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ORIGINAL_INDEX_KEY = '__filterOriginalIndex';

var Filter = function () {
  function Filter(instanceConfig) {
    _classCallCheck(this, Filter);

    this.config = (0, _objectAssign2.default)({
      nestedFilterFieldsObject: false,
      coerceStringComparators: true,
      coerceNumericComparators: true,
      customComparatorMethods: {}
    }, instanceConfig);
    this.comparatorMethods = (0, _ComparatorMethods2.default)(this.config);
  }

  _createClass(Filter, [{
    key: '_getFieldValue',
    value: function _getFieldValue(item, fieldKey) {
      if (fieldKey === '$item') {
        return item;
      }
      if (fieldKey === '$index') {
        return item[ORIGINAL_INDEX_KEY];
      }
      var filterFields = item;
      if (this.config.nestedFilterFieldsObject) {
        if (_typeof(item[this.config.nestedFilterFieldsObject]) === 'object') {
          filterFields = item[this.config.nestedFilterFieldsObject];
        } else return null;
      }

      if (typeof filterFields[fieldKey] !== 'undefined') {
        return filterFields[fieldKey];
      } else {
        return null;
      }
    }
  }, {
    key: '_testComparator',
    value: function _testComparator(fieldValue, comparator, testValue) {
      if (typeof this.comparatorMethods[comparator] === 'function') {
        return this.comparatorMethods[comparator](fieldValue, testValue);
      } else if (typeof this.config.customComparatorMethods[comparator] === 'function') {
        return this.config.customComparatorMethods[comparator](fieldValue, testValue);
      } else {
        return false;
      }
    }
  }, {
    key: '_testQueryArgument',
    value: function _testQueryArgument(item, queryArgument) {
      var _queryArgument = _slicedToArray(queryArgument, 3);

      var fieldKey = _queryArgument[0];
      var comparator = _queryArgument[1];
      var testValue = _queryArgument[2];

      var fieldValue = this._getFieldValue(item, fieldKey);

      if (fieldValue === null) return false;

      return this._testComparator(fieldValue, comparator, testValue);
    }
  }, {
    key: '_getQueryArguments',
    value: function _getQueryArguments(query) {
      var queryArguments = [];
      if (query && typeof query.serialise === 'function') {
        var serialised = query.serialise();
        if (Array.isArray(serialised)) {
          queryArguments = serialised;
        }
      }
      return queryArguments;
    }
  }, {
    key: 'returnFilteredItemsData',
    value: function returnFilteredItemsData() {
      var _this = this;

      var inputItems = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
      var query = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var items = (0, _clone2.default)(inputItems);
      items = items.map(function (item, i) {
        item[ORIGINAL_INDEX_KEY] = i;
        return item;
      });

      var queryArguments = this._getQueryArguments(query);

      items = items.filter(function (item) {
        var passed = true;
        queryArguments.forEach(function (queryArgument) {
          if (!_this._testQueryArgument(item, queryArgument)) {
            passed = false;
          }
        });
        return passed;
      });
      return items;
    }
  }, {
    key: 'returnFilteredItems',
    value: function returnFilteredItems(items, query) {
      return this.returnFilteredItemsData(items, query).map(function (item) {
        delete item[ORIGINAL_INDEX_KEY];
        return item;
      });
    }
  }, {
    key: 'run',
    value: function run(items, query) {
      return this.returnFilteredItems(items, query);
    }
  }, {
    key: 'returnFilteredIndexes',
    value: function returnFilteredIndexes(items, query) {
      return this.returnFilteredItemsData(items, query).map(function (item) {
        return item[ORIGINAL_INDEX_KEY];
      });
    }
  }]);

  return Filter;
}();

exports.default = Filter;