/* global flatten */

var arrays;

function flatten(arr) {
  var result = [];
  arr.reduce(function(prev, cur) {
    result = result.concat(cur);
    return result;
  }, 0);
  return result;
}

arrays = [[1, 2, 3], [4, 5], [6]];
console.log(flatten(arrays));
// → [1, 2, 3, 4, 5, 6]
