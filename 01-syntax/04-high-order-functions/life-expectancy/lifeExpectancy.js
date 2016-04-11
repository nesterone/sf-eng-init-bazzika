function average(array) {
  function plus(a, b) {
    return a + b;
  }
  return array.reduce(plus) / array.length;
}

console.log(average([2, 2, 2]));
// → 2

var ancestryByCentury = {};

ancestry.forEach(function(property) {
  var century = Math.ceil(property.died / 100);
  if (!ancestryByCentury[century]) {
    ancestryByCentury[century] = [];
  }
  ancestryByCentury[century].push(property.died - property.born);
});

for(var century in ancestryByCentury) {
  if (ancestryByCentury.hasOwnProperty(century)) {
    console.log(century + ': ', average(ancestryByCentury[century]));
  }
}

// → 16: 43.5
// → 17: 51.2
// → 18: 52.8
// → 19: 54.8
// → 20: 84.7
// → 21: 94
