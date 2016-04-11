/* global ancestry */

var byName = {};
var personsWithMother;
var diffMotherAndKidAge;

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

personsWithMother = ancestry.filter(function (person) {
  return byName[person.mother];
});


diffMotherAndKidAge = personsWithMother.map(function (person) {
  return person.born - byName[person.mother].born;
});

console.log(average(diffMotherAndKidAge));

// → 31.2
