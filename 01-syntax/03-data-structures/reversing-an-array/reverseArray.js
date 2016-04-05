/**
 *  [Reversing and array](file:///projects/Eloquent-JavaScript/html/04_data.html#h_6xTmjj4Rf5)
 *
 */
/* global reverseArray reverseArrayInPlace */

var arrayValue = [1, 2, 3, 4, 5];

function reverseArray(arr) {
  var result = [];
  var i;

  for (i = (arr.length - 1); i >= 0; i--) {
    result.push(arr[i]);
  }

  return result;
}

console.log(reverseArray(['A', 'B', 'C']));
// → ['C', 'B', 'A'];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
