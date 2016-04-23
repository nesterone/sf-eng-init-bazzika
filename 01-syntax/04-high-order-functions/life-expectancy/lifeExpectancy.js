/* global ancestry lifeExpectancy */
function lifeExpectancy(ancestry) {
  var currentCentury;
  function groupBy(array, viaCentury) {
    return array.reduce(function (memo, person) {
      var keyCentury;
      var century = memo;
      keyCentury = viaCentury(person);
      if (keyCentury in century) {
        century[keyCentury].push(person);
      } else {
        century[keyCentury] = [];
        century[keyCentury].push(person);
      }
      return century;
    }, {});
  }

  currentCentury = groupBy(ancestry, function (person) {
    return Math.ceil(person.died / 100);
  });
  Object.keys(currentCentury).forEach(function (age) {
    currentCentury[age] = currentCentury[age].map(function (person) {
      return person.died - person.born;
    }).reduce(function average(a, b, index, array) {
      var result;
      if (index < array.length - 1) {
        result = a + b;
      } else {
        result = Math.round(((a + b) / array.length) * 10) / 10;
      }
      return result;
    });
  });
  return currentCentury;
}
console.log(lifeExpectancy(ancestry));
// → 16: 43.5
// → 17: 51.2
// → 18: 52.8
// → 19: 54.8
// → 20: 84.7
// → 21: 94
