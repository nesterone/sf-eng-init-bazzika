/**
 *  [The sum of a range](file:///projects/Eloquent-JavaScript/html/04_data.html#h_8ZspxiCEC/)
 *
 */
/* global sum range */

function range(start, end) {
  var arr = [];
  var arrIndex = 0;
  var arrCounter;

  for (arrCounter = start; arrCounter <= end; arrCounter++) {
    arr[arrIndex] = arrCounter;
    arrIndex++;
  }
  return arr;
}

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
