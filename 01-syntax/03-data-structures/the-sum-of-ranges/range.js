/**
 *  [The sum of a range](file:///projects/Eloquent-JavaScript/html/04_data.html#h_8ZspxiCEC/)
 *
 */
/* global range */

// → Your code here.

console.log(range(5, 2, -1));

// → [5, 4, 3, 2]

console.log(range(10, 1));

// → [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

console.log(range(10));

// → [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

console.log(range());

// → undefined

console.log(range(10, undefined));

// → [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

console.log(range(undefined, 10));

// → [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(range(10, null));

// → [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

console.log(range(null, 10));

// → [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(range(10, Infinity));

// → undefined

console.log(range(-Infinity, 10));

// → undefined

console.log(range(10, '2'));

// → [10, 9, 8, 7, 6, 5, 4, 3, 2]
