import assign from 'object-assign'
const ORIGINAL_INDEX_KEY = '__filterOriginalIndex'

const defaultConfig = {
  nestedFilters: false
}

export default class Filter {
  constructor(instanceConfig) {
    this.config = assign(defaultConfig, instanceConfig)
  }

  returnFilteredItemsData(items = [], query = []) {
    items = items.map((item, i) => {
      item[ORIGINAL_INDEX_KEY] = i
      return item
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
