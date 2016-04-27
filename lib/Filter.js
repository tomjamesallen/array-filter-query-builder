'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ORIGINAL_INDEX_KEY = '__filterOriginalIndex';

var defaultConfig = {
  nestedFilters: false
};

var Filter = function () {
  function Filter(instanceConfig) {
    _classCallCheck(this, Filter);

    this.config = (0, _objectAssign2.default)(defaultConfig, instanceConfig);
  }

  _createClass(Filter, [{
    key: 'testQueryArgument',
    value: function testQueryArgument(item, queryArgument) {
      // console.log('testQueryArgument', {
      //   item, queryArgument
      // })
      return true;
    }
  }, {
    key: 'getQueryArguments',
    value: function getQueryArguments(query) {
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

      var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
      var query = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      items = items.map(function (item, i) {
        item[ORIGINAL_INDEX_KEY] = i;
        return item;
      });

      var queryArguments = this.getQueryArguments(query);

      items = items.filter(function (item) {
        var passed = true;
        queryArguments.forEach(function (queryArgument) {
          if (!_this.testQueryArgument(item, queryArgument)) {
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
  }, {
    key: 'updateConfig',
    value: function updateConfig(instanceConfig) {
      this.config = (0, _objectAssign2.default)(defaultConfig, instanceConfig);
    }
  }]);

  return Filter;
}();

exports.default = Filter;