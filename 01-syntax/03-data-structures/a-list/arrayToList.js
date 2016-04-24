/**
 *  [A list](file:///projects/Eloquent-JavaScript/html/04_data.html#h_nSTX34CM1M)
 *
 */
/* global arrayToList */

function arrayToList(arr) {
  var obj = {};
  var newArr = arr;

  if (arr[arr.length - 1]) {
    obj.value = newArr.shift();
    obj.rest = arrayToList(newArr);
  } else {
    return null;
  }
  return obj;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
