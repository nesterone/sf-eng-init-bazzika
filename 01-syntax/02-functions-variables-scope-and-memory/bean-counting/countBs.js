/**
 *  [Bean Counting](http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq)
 *
 */
/* global countBs */
function countBs(wordset) {
  var i;
  var count = 0;
  for (i = 0; i <= wordset.length - 1; i++) {
    if (wordset.charAt(i) === 'B') {
      count++;
    }
  }
  return count;
}
console.log(countBs('BBC'));
// → 2
