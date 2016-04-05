/**
 *  [A list](file:///projects/Eloquent-JavaScript/html/04_data.html#h_nSTX34CM1M)
 *
 */
/* global arrayToList */

function arrayToList(arr) {
  var list = {};
  var arrIndex;
  var tempReferenceState;

  for (arrIndex = arr.length - 1; arrIndex >= 0; arrIndex--) {
    tempReferenceState = list;
    list = {};
    list.value = arr[arrIndex];
    if (arrIndex === arr.length - 1) {
      list.rest = null;
    } else {
      list.rest = tempReferenceState;
    }
  }
  return list;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
