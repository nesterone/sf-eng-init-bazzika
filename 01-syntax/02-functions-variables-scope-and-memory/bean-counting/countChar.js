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
