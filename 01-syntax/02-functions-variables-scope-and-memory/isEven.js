/**
 *  [Recursion](http://eloquentjavascript.net//03_functions.html#p_iDq2OgBOGw)
 *
 */
/* global isEven */
function isEven(count) {
  if (count === 0) {
    return true;
  } else if (count === 1) {
    return false;
  } else {
    return (isEven(count - 2));
  }
}
console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??
