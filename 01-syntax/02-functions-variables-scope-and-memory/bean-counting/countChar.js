/**
 *  [Bean Counting](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global countChar */
function countChar(wordset, symbol) {
  var i;
  var count = 0;
  for (i = 0; i <= wordset.length - 1; i++) {
    if (wordset.charAt(i) === symbol) {
      count++;
    }
  }
  return count;
}
console.log(countChar('kakkerlak', 'k'));
// → 4
console.log(countChar(['a', 'B', '0', 'B'], 'B'));
// → 2
console.log(countChar({}, 'B'));
// → 0
console.log(countChar(0, 'B'));
// → 0
console.log(countChar('', 'B'));
// → 0
console.log(countChar('2', 'B'));
// → 0
console.log(countChar([], 'B'));
// → 0
console.log(countChar(null, 'B'));
// → 0
console.log(countChar(undefined, 'B'));
// → 0
console.log(countChar(NaN, 'B'));
// → 0
console.log(countChar(Infinity, 'B'));
// → 0
console.log(countChar(-Infinity, 'B'));
// → 0
console.log(countChar('B'));
// → 0
