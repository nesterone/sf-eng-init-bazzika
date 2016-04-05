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

console.log(reverseArray(['A', 'B', 'C']));
// → ['C', 'B', 'A'];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
