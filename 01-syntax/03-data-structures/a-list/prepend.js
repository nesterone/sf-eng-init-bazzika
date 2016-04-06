/**
 *  [A list](file:///projects/Eloquent-JavaScript/html/04_data.html#h_nSTX34CM1M)
 *
 */
/* global prepend prepend */

function prepend(list, val) {
  var newList = list;

  if (!isNaN(newList)) {
    newList = {};
    newList.value = list;
    newList.rest = val;
  } else {
    newList.rest = val;
  }
  return newList;
}

console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
