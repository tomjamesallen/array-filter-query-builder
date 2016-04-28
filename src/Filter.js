import assign from 'object-assign'
import comparatorMethods from './comparatorMethods'
import clone from 'clone'

const ORIGINAL_INDEX_KEY = '__filterOriginalIndex'

export default class Filter {
  constructor(instanceConfig) {
    this.config = assign({
      nestedFilterFieldsObject: false,
      customComparatorMethods: {}
    }, instanceConfig)
  }

  _getFieldValue(item, fieldKey) {
    let filterFields = item
    if (this.config.nestedFilterFieldsObject) {
      if (typeof item[this.config.nestedFilterFieldsObject] === 'object') {
        filterFields = item[this.config.nestedFilterFieldsObject]
      }
      else return null
    }

    if (typeof filterFields[fieldKey] !== 'undefined') {
      return filterFields[fieldKey]
    }
    else {
      return null
    }
  }

  _testComparator(fieldValue, comparator, testValue) {
    if (typeof comparatorMethods[comparator] === 'function') {
      return comparatorMethods[comparator](fieldValue, testValue)
    }
    else if (typeof this.customComparatorMethods[comparator] === 'function') {
      return this.customComparatorMethods[comparator](fieldValue, testValue)
    }
    else {
      return false
    }
  }

  _testQueryArgument(item, queryArgument) {
    const [ fieldKey, comparator, testValue ] = queryArgument
    const fieldValue = this._getFieldValue(item, fieldKey)

    if (fieldValue === null) return false

    return this._testComparator(fieldValue, comparator, testValue)
  }

  _getQueryArguments(query) {
    let queryArguments = []
    if (query && typeof query.serialise === 'function') {
      let serialised = query.serialise()
      if (Array.isArray(serialised)) {
        queryArguments = serialised
      }
    }
    return queryArguments
  }

  returnFilteredItemsData(inputItems = [], query = false) {
    let items = clone(inputItems)
    items = items.map((item, i) => {
      item[ORIGINAL_INDEX_KEY] = i
      return item
    })

    const queryArguments = this._getQueryArguments(query)

    items = items.filter((item) => {
      let passed = true
      queryArguments.forEach((queryArgument) => {
        if (!this._testQueryArgument(item, queryArgument)) {
          passed = false
        }
      })
      return passed
    })
    return items
  }

  returnFilteredItems(items, query) {
    return this.returnFilteredItemsData(items, query).map((item) => {
      delete item[ORIGINAL_INDEX_KEY]
      return item
    })
  }

  run(items, query) {
    return this.returnFilteredItems(items, query)
  }

  returnFilteredIndexes(items, query) {
    return this.returnFilteredItemsData(items, query).map((item) => {
      return item[ORIGINAL_INDEX_KEY]
    })
  }

  updateConfig(instanceConfig) {
    this.config = assign(defaultConfig, instanceConfig)
  }
}
