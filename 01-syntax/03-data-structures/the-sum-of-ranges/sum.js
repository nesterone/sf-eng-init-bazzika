/**
 *  [The sum of a range](file:///projects/Eloquent-JavaScript/html/04_data.html#h_8ZspxiCEC/)
 *
 */
/* global sum range */

function sum(arr) {
  var i;
  var result = 0;
  for (i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}

console.log(sum(range(1, 10)));
// → 55
