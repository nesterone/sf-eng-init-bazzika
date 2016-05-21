/* global ancestry */

function ageDifference(incomingAncestry) {
  var diffAge = [];
  var byName = {};

  function average(array) {
    function plus(a, b) {
      return a + b;
    }

    return array.reduce(plus) / array.length;
  }

  ancestry.forEach(function (person) {
    byName[person.name] = person;
  });

  incomingAncestry.reduce(function (sum, current) {
    if (byName[current.mother]) {
      diffAge.push(current.born - byName[current.mother].born);
    }

    return undefined;
  }, 0);

  return average(diffAge);
}

console.log(ageDifference(ancestry));

// → 31.2
