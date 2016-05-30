/**
 *  [Reversing and array](file:///projects/Eloquent-JavaScript/html/04_data.html#h_6xTmjj4Rf5)
 *
 */
/* global reverseArrayInPlace */

var arrayValue = [1, 2, 3, 4, 5];

function reverseArrayInPlace(inputArray) {
  var leftIndex;
  var rightIndex = inputArray.length - 1;
  var arrCenter = Math.floor(inputArray.length / 2);
  var arr = arguments[0];

  for (leftIndex = 0; leftIndex < arrCenter; leftIndex++) {
    arr[leftIndex] += arr[rightIndex];
    arr[rightIndex] = arr[leftIndex] - arr[rightIndex];
    arr[leftIndex] -= arr[rightIndex];
    rightIndex -= 1;
  }
  return inputArray;
}

reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
