import shallowequal from 'shallowequal'

function convertNumberToString(val) {
  if (typeof val === 'number') {
    val = val.toString()
  }
  return val
}

function convertStringToNumber(val) {
  if (typeof val === 'string') {
    val = parseFloat(val)
  }
  return val
}

export default {
  is(val1, val2) {
    return convertNumberToString(val1) === convertNumberToString(val2)
  },
  isNot(val1, val2) {
    return convertNumberToString(val1) !== convertNumberToString(val2)
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
        if (this.is(val1, test)) {
          hasMatch = true
        }
      })
      return hasMatch
    }
  },
  anyMatchesAny(array1, array2) {
    let hasMatch = false
    if (!Array.isArray(array1)) {
      if (this.isOneOf(array1, array2)) {
        hasMatch = true
      }
    }
    else {
      array1.forEach((item) => {
        if (this.isOneOf(item, array2)) {
          hasMatch = true
        }
      })
    }
    return hasMatch
  },
  isAtLeast(val1, val2) {
    return convertStringToNumber(val1) >= convertStringToNumber(val2)
  },
  isLessThanOrEqualTo(val1, val2) {
    return convertStringToNumber(val1) <= convertStringToNumber(val2)
  },
  isMoreThan(val1, val2) {
    return convertStringToNumber(val1) > convertStringToNumber(val2)
  },
  isLessThan(val1, val2) {
    return convertStringToNumber(val1) < convertStringToNumber(val2)
  }
}
