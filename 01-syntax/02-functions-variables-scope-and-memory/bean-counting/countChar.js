/**
 *  [Bean Counting](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global countChar */

function countChar(str, char) {
  var i;
  var result = 0;
  for (i = 0; i < str.length; i++) {
    if (str[i] === char) {
      result++;
    }
  }
  return result;
}

console.log(countChar('kakkerlak', 'k'));
// → 4
