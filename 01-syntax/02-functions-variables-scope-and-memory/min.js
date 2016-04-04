/**
 *  [Minimum](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global min */

function min(a, b) {
  if (a > b) {
    return b;
  }
  return a;
}

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10
