/**
 *  [A list](file:///projects/Eloquent-JavaScript/html/04_data.html#h_nSTX34CM1M)
 *
 */
/* global arrayToList nth */

function nth(list, number) {
  var i;
  var deepList = list;

  if (number < 0) {
    return 'Error! Number should be >= 0';
  }

  for (i = 0; i < number; i++) {
    if (deepList) {
      deepList = deepList.rest;
    }
  }
  if (deepList) {
    return deepList.value;
  }
  return undefined;
}

console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
console.log(nth(arrayToList([10, 20, 30]), 0));
// → 10
console.log(nth(arrayToList([10, 20, 30]), 2));
// → 30
console.log(nth(arrayToList([10, 20, 30]), 6));
// → error
console.log(nth(arrayToList([10, 20, 30]), -1));
// → error
