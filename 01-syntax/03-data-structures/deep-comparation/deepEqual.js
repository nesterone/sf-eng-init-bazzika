/**
 *  [Deep comparation](file:///projects/Eloquent-JavaScript/html/04_data.html#h_IJBU+aXOIC)
 *
 */
/* global deepEqual */

var obj;
var obj2;

function deepEqual(item1, item2) {
  var key1;
  var key2;
  var match;

  function isObject(testObject) {
    if (typeof testObject === 'object') return true;
    return false;
  }

  if (isObject(item1) && isObject(item2) && item1 && item2) {
    if (Object.keys(item1).length !== Object.keys(item2).length) return false;
    for (key1 in item1) {
      if (item1.hasOwnProperty(key1)) {
        match = false;
        for (key2 in item2) {
          if (key1 === key2) {
            if (isObject(item1[key1]) && isObject(item2[key2])
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
obj2 = {
  one: 5,
  two: {
    three: {
      four: 4
    }
  }
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
console.log(deepEqual(obj2, obj2));
// → true
console.log(deepEqual(obj2, {
  one: 5,
  two: {
    three: {
      four: 4
    }
  }
}));
// → true
console.log(deepEqual(obj2, {
  one: 5,
  two: {
    three: {
      four: {
        five: 5
      }
    }
  }
}));
// → false
console.log(deepEqual({
  one: [1, 2, 3],
  two: [{ one: 1 }, { one: 1, two: 2 }]
}, {
  one: [1, 2, 3],
  two: [{ one: 1 }, { one: 1, two: 2 }]
}));
// → true
console.log(deepEqual({
  one: [1, 2, 3],
  two: [{ one: 2 }, { one: 1, two: 2 }]
}, {
  one: [1, 2, 3],
  two: [{ one: 1 }, { one: 1, two: 2 }]
}));
// → false
console.log(deepEqual({
  one: [1, 2, 3],
  two: [{ one: [{ pf: 1 }] }, { one: 1, two: 2 }]
}, {
  one: [1, 2, 3],
  two: [{ one: [{ pf: 1 }] }, { one: 1, two: 2 }]
}));
// → true
console.log(deepEqual({
  one: [1, 2, 3],
  two: [{ one: [{ pf: 1 }] }, { one: 1, two: 2 }]
}, {
  one: [1, 2, 3],
  two: [{ one: [{ pf: 1, mmm: 3 }] }, { one: 1, two: 2 }]
}));
// → false
console.log(deepEqual({
  one: [1, 2, 3, 4],
  two: [{ one: 1 }, { one: 1, two: 2 }]
}, {
  one: [1, 2, 3],
  two: [{ one: 1 }, { one: 1, two: 2 }]
}));
// → false
console.log(deepEqual({
  one: [1, 2, 3],
  two: [{ one: 1, two: { t: [1, { w: 2 }] } }, { one: 1, two: 2 }]
}, {
  one: [1, 2, 3],
  two: [{ one: 1, two: { t: [1, { w: 2 }] } }, { one: 1, two: 2 }]
}));
// → true
console.log(deepEqual({
  one: [1, 2, 3],
  two: [{ one: 1, two: { t: [1, { w: 2 }] } }, { one: 1, two: 2 }]
}, {
  one: [1, 2, 3],
  two: [{ one: 1, two: { t: [1, { w: 2, k: 5 }] } }, { one: 1, two: 2 }]
}));
// → false
console.log(deepEqual(undefined, {}));
// → false
console.log(deepEqual({}, {}));
// → true
console.log(deepEqual({ a: [{ b: [{ c: [1] }] }] },
  { a: [{ b: [{ c: [1] }] }] }));
// → true
console.log(deepEqual({ a: [{ b: [{ c: [1] }] }] },
  { a: [{ b: [{ c: [2] }] }] }));
// → false
