/**
 *  [Reversing and array](file:///projects/Eloquent-JavaScript/html/04_data.html#h_6xTmjj4Rf5)
 *
 */
/* global reverseArrayInPlace */

var arrayValue = [1, 2, 3, 4, 5];

function reverseArrayInPlace(arr) {
  var result = [];
  var array = arr;
  var i;

  for (i = (arr.length - 1); i >= 0; i--) {
    result.push(arr[i]);
  }

  for (i = 0; i < arr.length; i++) {
    array[i] = result[i];
  }

  return result;
}

reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
