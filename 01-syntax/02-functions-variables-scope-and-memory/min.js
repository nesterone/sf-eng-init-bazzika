/**
 *  [Minimum](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global min */

function min(firstValue, secondValue) {
  if (firstValue < secondValue) {
    return firstValue;
  } else if (firstValue > secondValue) {
    return secondValue;
  }
  return firstValue;
}

console.log(min(10, 10));
// → 10
console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10
