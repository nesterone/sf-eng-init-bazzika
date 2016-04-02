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

/* We can to multiply the number to '-1' value.
 This operation inverts a sign of expression

 function isEven(number) {
 if (number < 0) {
 number *= -1;
 }

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
 // → false
 */
