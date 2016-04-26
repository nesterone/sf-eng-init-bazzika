/* global ancestry ageDifference */

var diff = [];

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

function findByName(personName) {
  var byName = null;
  ancestry.forEach(function (p) {
    if (personName === p.name) {
      byName = p;
    }
  });
  return byName;
}

function getAllDifferencies(arr) {
  arr.forEach(function (person) {
    var mother = findByName(person.mother);
    if (mother) {
      diff.push(person.born - mother.born);
    }
  });
  console.log(average(diff));
}

getAllDifferencies(ancestry);
// → 31.2
