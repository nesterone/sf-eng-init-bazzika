/**
 *  [Deep comparation](file:///projects/Eloquent-JavaScript/html/04_data.html#h_IJBU+aXOIC)
 *
 */
/* global deepEqual */
var obj = {
  here: {
    is: 'an'
  },
  object: 2
};
function deepEqual(object1, object2) {
  var number1 = 0;
  var number2 = 0;
  var prop;
  if (object1 === object2) {
    return true;
  }
  function checkObject(object) {
    var symbol = typeof boolean;
    if (typeof object !== 'object' || object === null) {
      symbol = false;
    }
    return symbol;
  }

  if (!checkObject(object1) || !checkObject(object2)) {
    return false;
  }
  for (prop in object1) {
    if (object1.hasOwnProperty(prop)) {
      number1++;
    }}
  for (prop in object2) {
    if (object2.hasOwnProperty(prop)) {
      number2++;
    }
    if (!(prop in object1) || !deepEqual(object1[prop], object2[prop])) {
      return false;
    }
  }
  return number1 === number2;
}
console.log(deepEqual(obj, obj));
// → true
console.log(
  deepEqual(obj, {
    here: 1,
    object: 2
  })
);
// → false
console.log(
  deepEqual(obj, {
    here: {
      is: 'an'
    },
    object: 2
  })
);
// → true
