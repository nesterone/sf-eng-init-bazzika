/**
 *  [Recursion](http://eloquentjavascript.net//03_functions.html#p_iDq2OgBOGw)
 *
*/
/* global isEven */

// → Your code here.

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
