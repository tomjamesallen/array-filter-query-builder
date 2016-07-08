var QueryBuilder = require('array-filter-query-builder').QueryBuilder;
var Filter = require('array-filter-query-builder').Filter

var filter = new Filter()
var fixtures = [
  {
    title: 'Article 1',
    published: true,
    tags: ['Tech']
  },
  {
    title: 'Article 2',
    published: false,
    tags: ['Politics', 'Health']
  },
  {
    title: 'Article 2',
    published: true,
    tags: ['Politics', 'Tech']
  }
]

var query = new QueryBuilder('published', {
  is: true
})
var results = filter.run(fixtures, query)

console.log(results)
