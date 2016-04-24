/**
 *  [Bean Counting](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global countBs */

function countBs(str) {
  var i;
  var result = 0;
  for (i = 0; i < str.length; i++) {
    if (str[i] === 'B') {
      result++;
    }
  }
  return result;
}

console.log(countBs('BBC'));
// → 2
