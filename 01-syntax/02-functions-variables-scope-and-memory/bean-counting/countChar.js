/**
 *  [Bean Counting](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global countChar */

function countChar(str, char) {
  var i;
  var result = 0;

  if (typeof str === 'undefined' || typeof char === 'undefined') {
    throw new Error('Please enter a string and any char to count');
  }

  for (i = 0; i < str.length; i++) {
    if (str[i] === char) {
      result++;
    }
  }
  return result;
}

function countBs(str) {
  return countChar(str, 'B');
}

console.log(countChar('kakkerlak', 'k'));
// → 4

console.log(countBs('bb2B13BBC'));
// → 3

console.log(countBs('bb2B13BBC'));
// → 3

console.log(countChar());
// → error

console.log(countChar('dewdewdw'));
// → error
