/**
 *  [Reversing and array](file:///projects/Eloquent-JavaScript/html/04_data.html#h_6xTmjj4Rf5)
 *
 */
/* global reverseArrayInPlace */
var arrayValue = [1, 2, 3, 4, 5];
function reverseArrayInPlace(array) {
  var arr = array;
  var index = arr.length - 1;
  var i;
  var element = [];
  for (i = 0; i <= (arr.length - 1) / 2; i++) {
    element = arr[i];
    arr[i] = arr[index];
    arr[index] = element;
    index--;
  }
  return arr;
}
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
