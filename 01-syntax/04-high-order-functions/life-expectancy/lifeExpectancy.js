/* global ancestry lifeExpectancy */
function average(array) {
  function plus(a, b) {
    return a + b;
  }

  return array.reduce(plus) / array.length;
}
console.log(average([2, 2, 2]));
// → 2
function lifeExpectancy(ancestry) {
  var ages;
  var curcentury;
  var currentAge;
  function groupBy(array, viaCentury) {
    var century = {};
    array.forEach(function (person) {
      var keycentury;
      keycentury = viaCentury(person);
      if (keycentury in century) {
        century[keycentury].push(person);
      } else {
        century[keycentury] = [];
      }
    });
    return century;
  }

  curcentury = groupBy(ancestry, function (person) {
    return Math.ceil(person.died / 100);
  });
  for (currentAge in curcentury) {
    if (curcentury.hasOwnProperty(currentAge)) {
      ages = curcentury[currentAge].map(function (person) {
        return person.died - person.born;
      });
      curcentury[currentAge] = ages;
    }
  }
  return curcentury;
}
console.log(lifeExpectancy(ancestry));
// → 16: 43.5
// → 17: 51.2
// → 18: 52.8
// → 19: 54.8
// → 20: 84.7
// → 21: 94
