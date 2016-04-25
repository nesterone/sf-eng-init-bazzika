/**
 *  [Bean Counting](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global countBs  countChar */

function countBs(text) {
  return countChar(text, 'B');
}

console.log(countBs('BBC'));
// → 2
console.log(countBs(['a', 'B', '0', 'B']));
// → 2
console.log(countBs({}));
// → 0
console.log(countBs(0));
// → 0
console.log(countBs(''));
// → 0
console.log(countBs('2'));
// → 0
console.log(countBs([]));
// → 0
console.log(countBs(null));
// → 0
console.log(countBs(undefined));
// → 0
console.log(countBs(NaN));
// → 0
console.log(countBs(Infinity));
// → 0
console.log(countBs(-Infinity));
// → 0
console.log(countBs());
// → 0
