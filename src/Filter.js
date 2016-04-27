import assign from 'object-assign'
const ORIGINAL_INDEX_KEY = '__filterOriginalIndex'

const defaultConfig = {
  nestedFilters: false
}

export default class Filter {
  constructor(instanceConfig) {
    this.config = assign(defaultConfig, instanceConfig)
  }

  testQueryArgument(item, queryArgument) {
    // console.log('testQueryArgument', {
    //   item, queryArgument
    // })
    return true
  }

  getQueryArguments(query) {
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

    const queryArguments = this.getQueryArguments(query)

    items = items.filter((item) => {
      let passed = true
      queryArguments.forEach((queryArgument) => {
        if (!this.testQueryArgument(item, queryArgument)) {
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
