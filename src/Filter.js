import assign from 'object-assign'

const defaultConfig = {
  nestedFilters: false
}

export default class Filter {
  constructor(instanceConfig) {
    this.config = assign(defaultConfig, instanceConfig)
  }

  run(items, query) {
    this.returnFilteredItems(items, query)
  }

  returnFilteredItems(items, query) {
    if (!Array.isArray(items)) return
  }

  returnFilteredIndexes(items, query) {

  }

  updateConfig(instanceConfig) {
    this.config = assign(defaultConfig, instanceConfig)
  }
}
