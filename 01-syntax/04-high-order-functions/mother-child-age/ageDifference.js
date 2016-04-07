/* global ancestry */
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
diff = ancestry.filter(function (person) {
  return byName[person.mother] != null;
}).map(function (person) {
  return person.born - byName[person.mother].born;
});
console.log(average(diff));
// → 31.2
