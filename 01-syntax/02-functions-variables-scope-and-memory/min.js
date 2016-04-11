/**
 *  [Minimum](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global min */

function min(a, b) {
  if (isNaN(a) || isNaN(b)) {
    return 'Error! Wrong input';
  }
  if (a > b) {
    return b;
  }
  return a;
}

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10
console.log(min(10, -10));
// → -10
console.log(min('frfr', -10));
// → error
console.log(min(-10));
// → error
console.log(min());
// → error
