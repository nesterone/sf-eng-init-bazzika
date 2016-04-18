/**
 *  [Recursion](http://eloquentjavascript.net//03_functions.html#p_iDq2OgBOGw)
 *
*/
/* global isEven */

function isEven(number) {
  var positiveNumber = number;

  if (typeof number === 'undefined') {
    throw new Error('Pass some arguments');
  }

  if (number < 0) {
    positiveNumber *= -1;
  }

  if (positiveNumber === 0) {
    return true;
  }

  return (positiveNumber === 1) ? false : isEven(positiveNumber - 2);
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → false
console.log(isEven(0));
// → true
console.log(isEven());
// → error
