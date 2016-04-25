/* global ancestry average ageDifference*/

function average(array) {
  function plus(a, b) {
    return a + b;
  }
  return array.reduce(plus) / array.length;
}

console.log(average([2, 2, 2]));
// → 2

function ageDifference(incomingAncestryArray) {
  var byName = {};
  var personsWithMother;
  var diffMotherAndKidAge;

  incomingAncestryArray.forEach(function (person) {
    byName[person.name] = person;
  });

  personsWithMother = incomingAncestryArray.filter(function (person) {
    return byName[person.mother];
  });

  diffMotherAndKidAge = personsWithMother.map(function (person) {
    return person.born - byName[person.mother].born;
  });

  return average(diffMotherAndKidAge);
}

console.log(ageDifference(ancestry));

// → 31.2
