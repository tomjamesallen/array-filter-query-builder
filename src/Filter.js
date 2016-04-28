import assign from 'object-assign'
import comparatorMethods from './comparatorMethods'

const ORIGINAL_INDEX_KEY = '__filterOriginalIndex'
const defaultConfig = {
  nestedFilterFieldsObject: false
}

export default class Filter {
  constructor(instanceConfig) {
    this.config = assign(defaultConfig, instanceConfig)
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
    if (typeof comparatorMethods[comparator] !== 'function') {
      return false
    }
    return comparatorMethods[comparator](fieldValue, testValue)
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

  returnFilteredItemsData(items = [], query = false) {
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
