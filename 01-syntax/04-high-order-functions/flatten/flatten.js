/* global flatten */
var arrays = [[1, 2, 3], [4, 5], [6]];
function flatten(arr) {
  return arr.reduce(function (prev, next) {
    return prev.concat(next);
  }, []);
}
console.log(flatten(arrays));
// → [1, 2, 3, 4, 5, 6]
