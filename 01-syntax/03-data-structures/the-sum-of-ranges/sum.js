/**
 *  [The sum of a range](file:///projects/Eloquent-JavaScript/html/04_data.html#h_8ZspxiCEC/)
 *
 */
/* global sum range */
function range(start, end, step) {
  var i = 0;
  var row = [];
  var grow = step;
  i = start;
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
function sum(arr) {
  var result = 0;
  var j;
  for (j = 0, j < arr.length, j++) {
    result += arr[i];
  }
  return result;
}
console.log(sum(range(1, 10)));
// → 55
