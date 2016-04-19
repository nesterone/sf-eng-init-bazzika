/* global ancestry ancestryByCentury average lifeExpectancy */

var ancestryByCentury = {};

function average(array) {
  function plus(a, b) {
    return a + b;
  }
  return array.reduce(plus) / array.length;
}

console.log(average([2, 2, 2]));
// → 2

function lifeExpectancy(ancestry) {
  var century;
  var arr = [];
  var key;

  ancestry.forEach(function (property) {
    century = Math.ceil(property.died / 100);
    if (!ancestryByCentury[century]) {
      ancestryByCentury[century] = [];
    }

    ancestryByCentury[century].push(property.died - property.born);
  });

  for (key in ancestryByCentury) {
    if (ancestryByCentury.hasOwnProperty(key)) {
      arr.push(key + ': ' + average(ancestryByCentury[key]));
    }
  }

  return arr.join('\n');
}

console.log(lifeExpectancy(ancestry));

// → 16: 43.5
// → 17: 51.2
// → 18: 52.8
// → 19: 54.8
// → 20: 84.7
// → 21: 94
