export default [
  {
    name: 'Product 1',
    boolTestField: true,
    valueTestField: 'first',
    numericTestField: 0,
    objectWithKeys: {
      key1: 0,
      key2: 1
    },
    multiMatch: ['FirstRef', 'SecondRef']
  },
  {
    name: 'Product 2',
    boolTestField: false,
    valueTestField: 'second',
    numericTestField: 5,
    objectWithKeys: {
      key1: 2,
      key2: 3
    },
    multiMatch: ['SecondRef', 'ThirdRef']
  },
  {
    name: 'Product 3',
    boolTestField: false,
    valueTestField: 'third',
    numericTestField: 10,
    objectWithKeys: {
      key1: 4,
      key2: 5
    },
    multiMatch: 'ThirdRef'
  }
]
