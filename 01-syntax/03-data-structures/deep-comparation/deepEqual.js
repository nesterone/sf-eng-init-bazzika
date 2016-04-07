/**
 *  [Deep comparation](file:///projects/Eloquent-JavaScript/html/04_data.html#h_IJBU+aXOIC)
 *
 */
/* global deepEqual */

var obj;

function deepEqual(item1, item2) {
  var key1;
  var key2;
  var match;
  if (typeof item1 === 'object' && typeof item2 === 'object' && item1 && item2) {
    if (Object.keys(item1).length !== Object.keys(item2).length) return false;
    for (key1 in item1) {
      if (item1.hasOwnProperty(key1)) {
        match = false;
        for (key2 in item2) {
          if (key1 === key2) {
            if (typeof item1[key1] === 'object' && typeof item2[key2] === 'object'
              && item1[key1] && item2[key2]) {
              match = deepEqual(item1[key1], item2[key2]);
            } else {
              match = (item1[key1] === item2[key2]);
            }
          }
        }
        if (!match) return false;
      }
    }
    return true;
  }
  if (item1 === item2) {
    return true;
  }
  return false;
}

obj = {
  here: {
    is: 'an'
  },
  object: 2
};

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
