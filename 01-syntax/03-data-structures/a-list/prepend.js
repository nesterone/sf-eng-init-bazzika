/**
 *  [A list](file:///projects/Eloquent-JavaScript/html/04_data.html#h_nSTX34CM1M)
 *
 */
/* global prepend prepend */
function prepend(value, rest) {
  var list = {};
  list = { value: value, rest: rest };
  return list;
}
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
