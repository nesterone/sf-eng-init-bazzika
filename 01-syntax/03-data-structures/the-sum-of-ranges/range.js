/**
 *  [The sum of a range](file:///projects/Eloquent-JavaScript/html/04_data.html#h_8ZspxiCEC/)
 *
 */
/* global range */
function range(start, end) {
  var i = 0;
  var row = [];
  row[0] = start;
  while (row[i] < end) {
    row[i + 1] = row[i] + 1;
    i += 1;
  }
  return row;
}
console.log(range(1, 10));
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
