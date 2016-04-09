/**
 *  [A list](file:///projects/Eloquent-JavaScript/html/04_data.html#h_nSTX34CM1M)
 *
 */
/* global arrayToList nth */

function nth(list, index) {
  var key;
  var searchIndex;
  for (key in list) {
    if (list.hasOwnProperty(key)) {
      if (index === 0) {
        searchIndex = list[key];
        break;
      } else if (typeof list[key] === 'object') {
        return nth(list[key], index - 1);
      }
    }
  }
  return searchIndex;
}

console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
