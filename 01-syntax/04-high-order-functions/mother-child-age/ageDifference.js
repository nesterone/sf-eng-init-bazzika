/* global ancestry ageDifference */

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

// → Your code here

console.log(ageDifference(ancestry));

// → 31.2
