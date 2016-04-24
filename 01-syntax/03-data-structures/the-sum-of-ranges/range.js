/**
 *  [The sum of a range](file:///projects/Eloquent-JavaScript/html/04_data.html#h_8ZspxiCEC/)
 *
 */
/* global range */

function range(start, end, oneStep) {
  var arr = [];
  var begin = start;
  var fin = end;
  var step = oneStep || 1;

  if (typeof start !== 'number' || typeof end !== 'number' || typeof oneStep !== 'number') {
    throw new Error('Wrong input!!!');
  }

  for (begin; begin !== fin + step; begin += step) {
    arr.push(begin);
  }

  return arr;
}

console.log(range(5, 2, -1));

// → [5, 4, 3, 2]

console.log(range(5, 'ffwe', -1));

// → error
