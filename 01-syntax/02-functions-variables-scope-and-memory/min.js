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
console.log(min(10, 10));
// → 10
console.log(min(-10, -20));
// → -20
console.log(min('10', '15'));
// → '10'
console.log(min('100', '15'));
// → '15'
console.log(min(10));
// → undefined
console.log(min());
// → undefined
console.log(min(-Infinity, Infinity));
// → -Infinity
console.log(min(0, Infinity));
// → 0
console.log(min(0, NaN));
// → undefined
console.log(min(0, null));
// → undefined
