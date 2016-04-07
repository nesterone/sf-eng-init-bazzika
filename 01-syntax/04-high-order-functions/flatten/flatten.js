/* global flatten */

var arrays = [[1, 2, 3], [4, 5], [6]];

function flatten(array) {
  return array.reduce(function (prev, current) {
    return prev.concat(current);
  });
}

console.log(flatten(arrays));
// → [1, 2, 3, 4, 5, 6]
