/**
 *  [Recursion](http://eloquentjavascript.net//03_functions.html#p_iDq2OgBOGw)
 *
*/
/* global isEven */

function isEven(value) {
  if (value < 0) {
    arguments[0] *= -1;
  } else if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return false;
  }

  if (value === 0) {
    return true;
  } else if (value === 1) {
    return false;
  }
  return isEven(value - 2);
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → false
console.log(isEven({}));
// → false
console.log(isEven(0));
// → true
console.log(isEven(''));
// → false
console.log(isEven('2'));
// → false
console.log(isEven([]));
// → false
console.log(isEven(null));
// → false
console.log(isEven(undefined));
// → false
console.log(isEven(NaN));
// → false
console.log(isEven(Infinity));
// → false
console.log(isEven(-Infinity));
// → false
console.log(isEven());
// → false
