'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultConfig = {
  nestedFilters: false
};

var Filter = function () {
  function Filter(instanceConfig) {
    _classCallCheck(this, Filter);

    this.config = (0, _objectAssign2.default)(defaultConfig, instanceConfig);
  }

  _createClass(Filter, [{
    key: 'returnFilteredItems',
    value: function returnFilteredItems() {
      var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
      var query = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      if (!query.length) return items;
    }
  }, {
    key: 'run',
    value: function run(items, query) {
      return this.returnFilteredItems(items, query);
    }
  }, {
    key: 'returnFilteredIndexes',
    value: function returnFilteredIndexes(items, query) {}
  }, {
    key: 'updateConfig',
    value: function updateConfig(instanceConfig) {
      this.config = (0, _objectAssign2.default)(defaultConfig, instanceConfig);
    }
  }]);

  return Filter;
}();

exports.default = Filter;