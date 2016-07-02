# Array filter & Query builder

Provides a filter and query builder, with queries that can be serialised and passed around, cloned, edited, and re-run.

## Why?

There are plenty of other query builders out there, for example [array-query](https://github.com/jacwright/array-query). In a lot of respects 'array-query' is a more comprehensive module. However, I needed a way of saving my current query, and then cloning it, editing the clone, and running the new query, so that I could preemptively return the results for a user interaction. For example graying-out a filter button that wouldn't yield any results. This was far easier to do by using the previous filter as a starting point and then editing it, rather than recreating an entire filter description.

To do this I needed to separate out the filter mechanism and the queries so that each query was simply an object that could be passed to a filter, in an idempotent manor.

## Usage

```javascript

    // ## Basic setup.
    import { QueryBuilder, Filter } from 'array-filter-query-builder'
    const filter = new Filter()
    const fixtures = [
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

    // Queries can be initialised as empty queries or with pre-defined arguments
    // Empty query:
    const query = new QueryBuilder()
    const results = filter.run(fixtures, query)
    // -> returns all fixtures

    // Single pre-defined argument:
    const query = new QueryBuilder('published', {
      is: true
    })
    const results = filter.run(fixtures, query)
    // -> returns all published items in fixtures

    // Multiple pre-defined arguments:
    const query = new QueryBuilder([
      ['published', 'is', true],
      ['tags', 'anyMatchesAny', ['Politics', 'Tech']]
    ])
    const results = filter.run(fixtures, query)
    // -> returns all published items in fixtures that has of the tags
    // 'Politics' or 'Tech'.


    // ## Adding arguments to queries.
    // Single or multiple arguments can be added to a query in the same manor
    // as when initialising the query.

    // Add a single argument:
    query.add('published', {
      is: true
    })

    // Add multiple arguments:
    query.add([
      ['published', 'is', true],
      ['tags', 'anyMatchesAny', ['Politics', 'Tech']]
    ])

    // The filter can then be re-run with the same query object.
    const results = filter.run(fixtures, query)

    // ## Cloning queries.
    // If you wish to preserve the previous query, you can create a clone, and
    // edit that instead of the original. For example:
    const query2 = query.clone()
    query.add('published', {
      is: false
    })

    // Methods can be chained, so it is possible to replace the above with the
    // following:
    const query2 = query
      .clone()
      .add('published', {
        is: true
      })

    // ## Resetting queries and query argument keys
    // Individual arguments, or whole queries can be reset.
    // Please note that when resetting a query argument, any argument acting on
    // the given key will be reset. You can gain a finer degree of control over
    // query arguments by serialising, editing and then deserialising the query
    // arguments.

    // Reset an individual argument key.
    query.reset('published')

    // Reset multiple argument keys.
    query.reset(['published', 'tags'])

    // Rest all query arguments.
    query.reset()

    // Replace query arguments by key.
    // The two steps above can be combined by using the `replace` method.
    query.replace('published', {
      is: false
    })

    // ## Serialising / deserialising query arguments
    // All query arguments for a query can be serialised into a plain JS array,
    // and then restored to a query object with the deserialise method.

    // Serialise:
    const serialised = query.serialise()
    // -> returns an array of query arguments in the form:
    // [
    //   [argumentKey, comparator, valueToCompare],
    //   [argumentKey, comparator, valueToCompare]
    // ]

    // Deserialise:
    // You can use an existing query, or initialise a new query with the
    // serialised query arguments.

    // Existing:
    query.reset().add(serialised)

    // New:
    const query = new QueryBuilder(serialised)


    // ## Comparator methods:
    // * is
    // * isNot
    // * isShallowEqual
    // * isNotShallowEqual
    // * isOneOf
    // * anyMatchesAny
    // * isAtLeast
    // * isLessThanOrEqualTo
    // * isMoreThan
    // * isLessThan
    // * isEqual

```

For more detailed examples, please see `/src/test/`.
