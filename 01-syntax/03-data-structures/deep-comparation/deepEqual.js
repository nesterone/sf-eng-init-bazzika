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

function deepEqual(firstObj, secondObj) {
  var theSame = false;
  var firstKey;
  var secondKey;

  if (Object.keys(firstObj).length !== Object.keys(secondObj).length) {
    return false;
  }
  for (firstKey in firstObj) {
    if (firstObj.hasOwnProperty(firstKey)) {
      for (secondKey in secondObj) {
        if (secondObj.hasOwnProperty(secondKey) && firstKey === secondKey) {
          if (firstObj[firstKey] === secondObj[secondKey]) {
            theSame = true;
            break;
          } else if (typeof firstObj[firstKey] === 'object' &&
            typeof secondObj[secondKey] === 'object' &&
            firstObj[firstKey] !== null && secondObj[secondKey] !== null) {
            return deepEqual(firstObj[firstKey], secondObj[secondKey]);
          }
        } else {
          theSame = false;
        }
      }

      if (theSame === false) {
        return false;
      }
    }
  }
  return true;
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
console.log(
  deepEqual(obj, {
    here: {
      is: 'an'
    },
    object: 2,
    testProperty: 5
  })
);
// → false
