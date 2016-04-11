/**
 *  [Bean Counting](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global countBs */

function countBs(text) {
  var charCount;
  var numberOfCharacters = 0;

  if (! text || text.length === 0 ||
    (typeof text !== 'string' && text.constructor !== Array)) {
    return 0;
  }

  for (charCount = 0; charCount < text.length; charCount++) {
    if (text[charCount] === 'B') {
      numberOfCharacters += 1;
    }
  }

  return numberOfCharacters;
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
