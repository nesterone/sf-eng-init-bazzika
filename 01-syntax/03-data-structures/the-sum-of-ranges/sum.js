/**
 *  [The sum of a range](file:///projects/Eloquent-JavaScript/html/04_data.html#h_8ZspxiCEC/)
 *
 */
/* global sum range */

function sum(arr) {
  var arrCount;
  var sumCalculate = 0;

  for (arrCount = 0; arrCount < arr.length; arrCount++) {
    sumCalculate += arr[arrCount];
  }
  return sumCalculate;
}

console.log(sum(range(1, 10)));
// → 55
