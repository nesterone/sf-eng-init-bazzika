/**
 *  [Bean Counting](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global countChar */

function countChar(text, character) {
  var charCount;
  var numberOfCharacters = 0;

  for (charCount = 0; charCount < text.length; charCount++) {
    if (text.charAt(charCount) === character) {
      numberOfCharacters += 1;
    }
  }

  return numberOfCharacters;
}

console.log(countChar('kakkerlak', 'k'));
// → 4
