/**
 *  [The sum of a range](file:///projects/Eloquent-JavaScript/html/04_data.html#h_8ZspxiCEC/)
 *
 */
/* global range */

function range(start, end) {
  var arr = [];
  var value = start;
  for (value; value <= end; value++) {
    arr.push(value);
  }
  return arr;
}

console.log(range(5, 2, -1));

// → [5, 4, 3, 2]
