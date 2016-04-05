/**
 *  [The sum of a range](file:///projects/Eloquent-JavaScript/html/04_data.html#h_8ZspxiCEC/)
 *
 */
/* global range */

function range(start, end, st) {
  var arr = [];
  var begin = start;
  var fin = end;
  var step = 1;

  if (!isNaN(parseFloat(st))) {
    step = st;
  }

  if (st > 0) {
    for (begin; begin <= fin; begin += step) {
      arr.push(begin);
    }
  } else {
    for (begin; begin >= fin; begin += step) {
      arr.push(begin);
    }
  }
  return arr;
}

console.log(range(5, 2, -1));

// → [5, 4, 3, 2]
