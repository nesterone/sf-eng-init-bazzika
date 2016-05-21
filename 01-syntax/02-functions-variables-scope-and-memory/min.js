/**
 *  [Minimum](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global min */
function min(i, j) {
  if (i > j) {
    return j;
  }
  return i;
}
console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10
