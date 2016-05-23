/* global ancestry lifeExpectancy */

function lifeExpectancy(ancestry) {
  var groupedArr;

  function average(array) {
    function plus(a, b) {
      return a + b;
    }
    return array.reduce(plus) / array.length;
  }

  function groupByCentury(arr) {
    var century;
    var result = {};
    arr.map(function (el) {
      century = Math.ceil(el.died / 100);
      if (result.hasOwnProperty(century)) {
        result[century].push(el.died - el.born);
      } else {
        result[century] = [el.died - el.born];
      }
      return null;
    });
    return result;
  }

  function printByCentury(arr) {
    var key;
    for (key in arr) {
      if (arr.hasOwnProperty(key)) {
        console.log(key + ': ' + average(arr[key]).toFixed(1));
      }
    }
  }

  groupedArr = groupByCentury(ancestry);

  return printByCentury(groupedArr);
}

lifeExpectancy(ancestry);

// → 16: 43.5
// → 17: 51.2
// → 18: 52.8
// → 19: 54.8
// → 20: 84.7
// → 21: 94
