/**
 *  [A list](file:///projects/Eloquent-JavaScript/html/04_data.html#h_nSTX34CM1M)
 *
 */
/* global arrayToList nth */
function nth(list, n) {
  var array = [];
  var node;
  for (node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array[n];
}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
