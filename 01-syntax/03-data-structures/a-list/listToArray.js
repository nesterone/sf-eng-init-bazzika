/**
 *  [A list](file:///projects/Eloquent-JavaScript/html/04_data.html#h_nSTX34CM1M)
 *
 */
/* global listToArray  arrayToList */

function listToArray(list, arrayToAdd) {
  var arr = arrayToAdd;
  if (arrayToAdd === undefined) {
    arr = [];
  }

  if (list) {
    arr[arr.length] = list.value;
    listToArray(list.rest, arr);
  } else {
    return null;
  }
  return arr;
}

console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
