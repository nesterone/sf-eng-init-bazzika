/**
 *  [Recursion](http://eloquentjavascript.net//03_functions.html#p_iDq2OgBOGw)
 *
*/
/* global isEven */

function isEven(number) {
  if (number === 0) {
    return true;
  } else if (number === 1) {
    return false;
  }
  return isEven(number - 2);
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → Uncaught RangeError: Maximum call stack size exceeded
