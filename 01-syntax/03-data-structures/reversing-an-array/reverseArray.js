/**
 *  [Reversing and array](file:///projects/Eloquent-JavaScript/html/04_data.html#h_6xTmjj4Rf5)
 *
 */
/* global reverseArray reverseArrayInPlace */

var arrayValue = [1, 2, 3, 4, 5];

function reverseArray(inputArray) {
  var newArray = [];
  var newArrIndex = 0;
  var inputArrIndex;

  for (inputArrIndex = inputArray.length - 1; inputArrIndex >= 0; inputArrIndex--) {
    newArray[newArrIndex] = inputArray[inputArrIndex];
    newArrIndex += 1;
  }
  return newArray;
}

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

console.log(reverseArray(['A', 'B', 'C']));
// → ['C', 'B', 'A'];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
