/**
 *  [The sum of a range](file:///projects/Eloquent-JavaScript/html/04_data.html#h_8ZspxiCEC/)
 *
 */
/* global range */
function range(start, end, step) {
  var i = start || 0;
  var row = [];
  var grow = step;
  if (typeof grow === 'undefined') {
    grow = 1;
  }
  if (grow >= 0) {
    while (i <= end) {
      row.push(i);
      i += grow;
    }
  } else {
    while (i >= end) {
      row.push(i);
      i += step;
    }
  }
  return row;
}
console.log(range(1, 10));
console.log(range(1, 10, 2));
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]

