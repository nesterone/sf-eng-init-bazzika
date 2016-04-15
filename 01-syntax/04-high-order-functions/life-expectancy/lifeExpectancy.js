var epoch;
var Century;
function average(array) {
  function plus(a, b) {
    return a + b;
  }
  return array.reduce(plus) / array.length;
}

console.log(average([2, 2, 2]));
// → 2
var century = {};
function ListCentury(person) {
   var cur_century;
  ancestry.forEach(function (person) {
    cur_century = Math.ceil(died/100);
    if (cur_century in century){
      century[cur_century].push(person);
    } else {
      century[cur_century] = [];
    }
  });
  return century;
}
for (cur_century in century){
  var ages = century[cur_century].map(function (person) {
    return person.died - person.born;
  });
  console.log(cur_century + average(ages));
}

// → 16: 43.5
// → 17: 51.2
// → 18: 52.8
// → 19: 54.8
// → 20: 84.7
// → 21: 94