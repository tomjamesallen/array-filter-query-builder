import shallowequal from 'shallowequal'

export default {
  is(val1, val2) {
    return val1 === val2
  },
  isNot(val1, val2) {
    return val1 !== val2
  },
  isShallowEqual(val1, val2) {
    return shallowequal(val1, val2)
  },
  isNotShallowEqual(val1, val2) {
    return !shallowequal(val1, val2)
  },
  isOneOf(val1, arrayOfTests) {
    if (!Array.isArray(arrayOfTests)) {
      let val2 = arrayOfTests
      return this.is(val1, val2)
    }
    else if (!arrayOfTests.length) {
      return true
    }
    else {
      let hasMatch = false
      arrayOfTests.forEach((test) => {
        if (val1 === test) {
          hasMatch = true
        }
      })
      return hasMatch
    }
  }
  // ,
  // isAtLeast(input) {},
  // isOneOf(input) {},
}
