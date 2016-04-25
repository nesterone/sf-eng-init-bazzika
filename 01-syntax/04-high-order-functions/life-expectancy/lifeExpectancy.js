/* global ancestry */

function lifeExpectancy(incomingAncestry) {
  var ancestryByCentury = {};
  var arr = [];

  function average(array) {
    function plus(a, b) {
      return a + b;
    }

    return array.reduce(plus) / array.length;
  }

  incomingAncestry.reduce(function (sum, current) {
    var century = Math.ceil(current.died / 100);

    if (!ancestryByCentury[century]) {
      ancestryByCentury[century] = [];
    }
    ancestryByCentury[century].push(current.died - current.born);

    return undefined;
  }, 0);

  Object.keys(ancestryByCentury).forEach(function (key) {
    arr.push(key + ': ' + average(ancestryByCentury[key]));
  });

  return arr.join('\n');
}

console.log(lifeExpectancy(ancestry));

// → 16: 43.5
// → 17: 51.2
// → 18: 52.8
// → 19: 54.8
// → 20: 84.7
// → 21: 94
