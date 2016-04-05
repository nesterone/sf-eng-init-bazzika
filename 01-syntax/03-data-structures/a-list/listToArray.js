/**
 *  [A list](file:///projects/Eloquent-JavaScript/html/04_data.html#h_nSTX34CM1M)
 *
 */
/* global listToArray  arrayToList */

function listToArray(obj) {
  var arr = [];
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        return arr.concat(listToArray(obj[key]));
      }
      arr.push(obj[key]);
    }
  }
  return arr;
}

console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
