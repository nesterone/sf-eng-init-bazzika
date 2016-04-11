/**
 *  [The sum of a range](file:///projects/Eloquent-JavaScript/html/04_data.html#h_8ZspxiCEC/)
 *
 */
/* global range */

function range(start, end, step) {
  var arr = [];
  var arrIndex = 0;
  var arrCounter;

  if (start > end) {
    step = step || -1;
  } else {
    step = step || 1;
  }

  for (arrCounter = start; arrCounter != end + step; arrCounter += step) {
    arr[arrIndex] = arrCounter;
    arrIndex++;
  }
  return arr;
}

console.log(range(5, 2, -1));

// → [5, 4, 3, 2]

console.log(range(10, 1));

// → [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
