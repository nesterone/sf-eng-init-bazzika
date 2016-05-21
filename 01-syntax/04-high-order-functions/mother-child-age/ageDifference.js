/* global ancestry ageDifference */

var byName = {};
var diff;
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

// TODO: you have to move your solution under `ageDifference` function
diff = ancestry.filter(function (person) {
  return (byName[person.mother] !== null && byName[person.mother] !== undefined);
}).map(function (person) {
  return person.born - byName[person.mother].born;
});
console.log(average(diff));
// → 31.2
