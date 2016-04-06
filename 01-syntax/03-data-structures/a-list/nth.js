/**
 *  [A list](file:///projects/Eloquent-JavaScript/html/04_data.html#h_nSTX34CM1M)
 *
 */
/* global arrayToList nth */

function nth(list, number) {
  var i;
  var deepList = list;

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
