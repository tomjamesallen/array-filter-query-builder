/* global describe, it */
import { expect } from 'chai'
import shallowequal from 'shallowequal'

import { QueryBuilder } from '../index'
import dummyQuery1 from '../fixtures/query1'
import dummyQuery2 from '../fixtures/query2'

describe('New `Query`s should return an empty array from `serialise`', () => {
  it('should generate a new query, which should return an empty array from `serialise`', () => {
    let query = new QueryBuilder()
    const serialised = query.serialise()
    expect(Array.isArray(serialised)).to.equal(true)
    expect(serialised.length).to.equal(0)
  })
})

describe('New `Query`s should accept a serialised array of query arguments', () => {
  it('should accept a serialised array of query arguments in the constructor method and then return an array from `serialise` that is `shallowequal`.', () => {
    let query = new QueryBuilder(dummyQuery1)
    const serialised = query.serialise()
    expect(shallowequal(dummyQuery1, serialised)).to.equal(true)
  })
})

describe('A `Query`s `add` method should accept a `fieldKey`+`queryArgument` pair or an array of query arguments', () => {
  it('should accept a `fieldKey`+`queryArgument` pair', () => {
    let query = new QueryBuilder(dummyQuery1)
    query.add('numericTestFieldKey', {
      is: 3
    })
    const serialised = query.serialise()
    expect(serialised.length).to.equal(dummyQuery1.length + 1)
  })

  it('should accept a `fieldKey`+`queryArgument` pair with multiple queryArguments per `fieldKey`', () => {
    let query = new QueryBuilder(dummyQuery1)
    query.add('numericTestField', {
      is: 3,
      isNot: 4
    })
    const serialised = query.serialise()
    expect(serialised.length).to.equal(dummyQuery1.length + 2)
  })

  it('should accept a boolean reset value as a third argument, which resets any query arguments matching the field.', () => {
    let query = new QueryBuilder(dummyQuery1)
    query.add('boolTestField', {
      is: false
    }, true)
    const serialised = query.serialise()
    expect(serialised.length).to.equal(dummyQuery1.length)
  })
})

describe('A `Query`s `add` method should accept an array of query arguments', () => {
  it('should append the query arguments and return all of the arguments from its `serialise` method', () => {
    let query = new QueryBuilder(dummyQuery1)
    query.add([
      ['boolTestField', 'is', false],
      ['numericTestField', 'is', 4]
    ])
    const serialised = query.serialise()
    expect(serialised.length).to.equal(dummyQuery1.length + 2)
  })

  it('should accept a boolean reset value as a second argument, which will reset any query arguments matching the field of any of the query arguments.', () => {
    let query = new QueryBuilder(dummyQuery1)
    query.add([
      ['boolTestField', 'is', false],
      ['numericTestField', 'is', 4]
    ], true)
    const serialised = query.serialise()
    expect(serialised.length).to.equal(dummyQuery1.length + 1)
  })
})

describe('A `Query`s `replace` method should behave in the same way as the `add` method, but with `reset` set to true.', () => {
  it('should delete any existing query arguments with the same `fieldKey` and then add the new query argument', () => {
    let query = new QueryBuilder(dummyQuery1)
    query.replace('boolTestField', {
      is: false
    })
    const serialised = query.serialise()
    const lastQueryArgument = serialised[serialised.length - 1]
    expect(serialised.length).to.equal(dummyQuery1.length)
    expect(shallowequal(lastQueryArgument, ['boolTestField', 'is', false])).to.equal(true)
  })

  it('should accept an array of query arguments, and delete any existing query arguments that match the `fieldKey`s.', () => {
    let query = new QueryBuilder(dummyQuery1)
    query.replace(dummyQuery2)
    const serialised = query.serialise()
    const start = serialised.length - dummyQuery2.length
    const end = serialised.length
    const newItems = serialised.slice(start, end)

    let isEqual = true

    dummyQuery2.forEach((queryArgument, i) => {
      const newItemsQueryArgument = newItems[i]
      if (typeof newItemsQueryArgument !== 'object') {
        isEqual = false
        return
      }
      queryArgument.forEach((arg, i) => {
        const newItemsQueryArgumentArg = newItemsQueryArgument[i]
        if (arg !== newItemsQueryArgumentArg) {
          isEqual = false
        }
      })
    })

    expect(isEqual).to.equal(true)
  })
})

describe('A `Query`s methods should be chainable', () => {
  it('should have chainable methods', () => {
    let serialised = new QueryBuilder()
      .add('boolTestField', {
        is: false
      })
      .add('numericTestField', {
        is: 3
      })
      .serialise()

    expect(serialised.length).to.equal(2)
  })
})
