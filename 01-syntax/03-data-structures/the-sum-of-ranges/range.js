/**
 *  [The sum of a range](file:///projects/Eloquent-JavaScript/html/04_data.html#h_8ZspxiCEC/)
 *
 */
/* global range */

function range(start, end, step) {
  var rangeStep;
  var arr = [];
  var arrIndex = 0;
  var arrCounter;

  if (start > end) {
    rangeStep = step || -1;

    for (arrCounter = start; arrCounter >= end; arrCounter += rangeStep) {
      arr[arrIndex] = arrCounter;
      arrIndex++;
    }
  } else {
    rangeStep = step || 1;

    for (arrCounter = start; arrCounter <= end; arrCounter += rangeStep) {
      arr[arrIndex] = arrCounter;
      arrIndex++;
    }
  }
  return arr;
}

console.log(range(5, 2, -1));

// → [5, 4, 3, 2]
