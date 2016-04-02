/**
 *  [Bean Counting](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global countBs */

function countBs(text) {
  var charCount;
  var numberOfCharacters = 0;

  for (charCount = 0; charCount < text.length; charCount++) {
    if (text.charAt(charCount) === 'B') {
      numberOfCharacters += 1;
    }
  }

  return numberOfCharacters;
}

console.log(countBs('BBC'));
// → 2
