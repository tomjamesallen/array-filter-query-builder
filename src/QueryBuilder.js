import clone from 'clone'

export default class QueryBuilder {
  constructor(importArray) {
    this._currentQuery = []
    this.deserialise(importArray)
  }

  // update(keyInput, arg2 = false, arg3 = false) {
  //   if (typeof keyInput === 'string') {
  //     let queryArgument = arg2
  //     let reset = arg3
  //     if (queryArgument) {
  //       this._currentQuery[keyInput] = queryArgument
  //     }
  //   }
  //   else if (typeof keyInput === 'object') {
  //     let reset = arg2
  //     if (reset) {
  //       this.reset()
  //     }
  //     this.deserialise(keyInput)
  //   }
  //   return this
  // }

  // reset(keyInput = null) {
  //   if (keyInput === null) {
  //     this._currentQuery = {}
  //   }
  //   else if (Array.isArray(keyInput)) {
  //     let keys = keyInput
  //     keys.forEach((key) => {
  //       delete this._currentQuery[key]
  //     })
  //   }
  //   else if (typeof keyInput === 'string') {
  //     let key = keyInput
  //     delete this._currentQuery[key]
  //   }
  //   return this
  // }

  add() {
    
  }

  reset() {
    
  }

  replace() {

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
