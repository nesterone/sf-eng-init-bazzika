/**
 *  [Bean Counting](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global countChar */

function countChar(text, character) {
  var charCount;
  var numberOfCharacters = 0;

  if (! text || text.length === 0 ||
    (typeof text !== 'string' && text.constructor !== Array)) {
    return 0;
  }

  for (charCount = 0; charCount < text.length; charCount++) {
    if (text[charCount] === character) {
      numberOfCharacters += 1;
    }
  }

  return numberOfCharacters;
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
