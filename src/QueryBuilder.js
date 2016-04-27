import clone from 'clone'

export default class QueryBuilder {
  constructor(importArray) {
    this._currentQuery = []
    this.deserialise(importArray)
  }

  _addItemToCurrentQuery(fieldKey, comparator, value) {
    const queryArgument = [fieldKey, comparator, value]
    this._currentQuery.push(queryArgument)
  }

  _removeKeyFromCurrentQuery(fieldKey) {
    const updatedQuery = this._currentQuery.filter((item) => {
      if (item[0] === fieldKey) return false
      else return true
    })
    this._currentQuery = updatedQuery
  }

  add(keyInput, arg2 = false, arg3 = false) {
    if (typeof keyInput === 'string') {
      if (!arg2) return this

      const reset = arg3
      const fieldKey = keyInput
      const queryArguments = arg2

      if (reset) this._removeKeyFromCurrentQuery(fieldKey)

      Object.keys(queryArguments).forEach((comparator) => {
        const value = queryArguments[comparator]
        this._addItemToCurrentQuery(fieldKey, comparator, value)
      })
    }
    else if (Array.isArray(keyInput)) {
      const queryArguments = keyInput
      const reset = arg2

      queryArguments.forEach((queryArgument) => {
        if (reset) this._removeKeyFromCurrentQuery(queryArgument[0])
        this._addItemToCurrentQuery(...queryArgument)
      })
    }

    return this
  }

  replace(keyInput, arg2 = false) {
    if (typeof keyInput === 'string') {
      if (arg2) {
        this.add(keyInput, arg2, true)
      }
    }
    else if (Array.isArray(keyInput)) {
      this.add(keyInput, true)
    }

    return this
  }

  reset(keyInput = null) {
    if (keyInput === null) {
      this._currentQuery = []
    }
    else if (Array.isArray(keyInput)) {
      let fieldKeys = keyInput
      fieldKeys.forEach((fieldKey) => {
        this._removeKeyFromCurrentQuery(fieldKey)
      })
    }
    else if (typeof keyInput === 'string') {
      let fieldKey = keyInput
      this._removeKeyFromCurrentQuery(fieldKey)
    }
    return this
  }

  deserialise(importArray) {
    if (Array.isArray(importArray)) {
      importArray.forEach((item) => {
        this._currentQuery.push(item)
      })
    }
    return this
  }

  serialise() {
    return this._currentQuery
  }

  clone() {
    return clone(this)
  }
}
