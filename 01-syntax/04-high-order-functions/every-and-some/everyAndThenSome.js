/* global every some */

function every(arr, func) {
  var index;

  for (index = 0; index < arr.length; index++) {
    if (!func(arr[index])) {
      return false;
    }
  }
  return true;
}

function some(arr, func) {
  var index;

  for (index = 0; index < arr.length; index++) {
    if (func(arr[index])) {
      return true;
    }
  }
  return false;
}

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false
