/**
 *  [Reversing and array](file:///projects/Eloquent-JavaScript/html/04_data.html#h_6xTmjj4Rf5)
 *
 */
/* global reverseArray reverseArrayInPlace */
function reverseArray(array) {
  var i;
  var newArray = [];
  var index = 0;
  for (i = array.length - 1; i >= 0; i--) {
    newArray[index] = array[i];
    index++;
  }
  return newArray;
}
console.log(reverseArray(['A', 'B', 'C']));
// → ['C', 'B', 'A'];
