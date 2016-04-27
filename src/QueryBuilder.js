import clone from 'clone'

export default class QueryBuilder {
  constructor(importObject) {
    this._currentQuery = {}
    this.deserialise(importObject)
  }

  update(keyInput, arg2 = false, arg3 = false) {
    if (typeof keyInput === 'string') {
      let queryArgument = arg2
      let reset = arg3
      if (queryArgument) {
        this._currentQuery[keyInput] = queryArgument
      }
    }
    else if (typeof keyInput === 'object') {
      let reset = arg2
      if (reset) {
        this.reset()
      }
      this.deserialise(keyInput)
    }
    return this
  }

  reset(keyInput = null) {
    if (keyInput === null) {
      this._currentQuery = {}
    }
    else if (Array.isArray(keyInput)) {
      let keys = keyInput
      keys.forEach((key) => {
        delete this._currentQuery[key]
      })
    }
    else if (typeof keyInput === 'string') {
      let key = keyInput
      delete this._currentQuery[key]
    }
    return this
  }

  deserialise(importObject) {
    if (typeof importObject === 'object') {
      const keys = Object.keys(importObject)
      keys.forEach((key) => {
        this._currentQuery[key] = importObject[key]
      })
    }
    return this
  }

  serialise() {
    let serialised = {}
    Object.keys(this._currentQuery).forEach((key) => {
      serialised[key] = this._currentQuery[key]
    })
    return serialised
  }

  clone() {
    return clone(this)
  }
}
