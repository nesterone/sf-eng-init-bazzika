/* global ancestry */

var byName = {};

function average(array) {
  function plus(a, b) {
    return a + b;
  }

  return array.reduce(plus) / array.length;
}

console.log(average([2, 2, 2]));
// → 2

ancestry.forEach(function (person) {
  byName[person.name] = person;
});

console.log(average(ancestry.filter(function (property) {
  return byName[property.mother];
}).map(function (property) {
  return property.born - byName[property.mother].born;
})));

// → 31.2
