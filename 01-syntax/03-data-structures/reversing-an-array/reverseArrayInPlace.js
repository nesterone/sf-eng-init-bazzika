/**
 *  [Reversing and array](file:///projects/Eloquent-JavaScript/html/04_data.html#h_6xTmjj4Rf5)
 *
 */
/* global reverseArrayInPlace */

var arrayValue = [1, 2, 3, 4, 5];

function reverseArrayInPlace(arr) {
  var index = 0;
  var array = arr;
  var temp;
  var i;

  for (i = (arr.length - 1); i >= arr.length / 2; i--) {
    temp = arr[index];
    array[index] = arr[i];
    array[i] = temp;
    index++;
  }

  return array;
}

reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
