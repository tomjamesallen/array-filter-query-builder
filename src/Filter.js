import assign from 'object-assign'

const defaultConfig = {
  nestedFilters: false
}

export default class Filter {
  constructor(instanceConfig) {
    this.config = assign(defaultConfig, instanceConfig)
  }

  returnFilteredItems(items = [], query = []) {
    if (!query.length) return items
  }

  run(items, query) {
    return this.returnFilteredItems(items, query)
  }

  returnFilteredIndexes(items, query) {

  }

  updateConfig(instanceConfig) {
    this.config = assign(defaultConfig, instanceConfig)
  }
}
