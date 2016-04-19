/**
 *  [Deep comparation](file:///projects/Eloquent-JavaScript/html/04_data.html#h_IJBU+aXOIC)
 *
 */
/* global deepEqual obj */

var obj = {
  here: {
    is: 'an'
  },
  object: 2
};

function deepEqual(firstObj, secondObj) {
  var firstKey;
  var secondKey;
  var same;

  function isObject(statement) {
    return (statement && typeof statement === 'object');
  }

  arguments[0] = firstObj || {};
  arguments[1] = secondObj || {};

  if (Object.keys(firstObj).length !== Object.keys(secondObj).length) {
    return false;
  } else if (firstObj === secondObj) {
    return true;
  }

  for (firstKey in firstObj) {
    if (firstObj.hasOwnProperty(firstKey)) {
      same = false;
      for (secondKey in secondObj) {
        if (secondObj.hasOwnProperty(secondKey) &&
          isObject(firstObj[firstKey]) &&
          isObject(secondObj[secondKey]) &&
          firstKey === secondKey) {
          same = deepEqual(firstObj[firstKey], secondObj[secondKey]);
        } else if (firstKey === secondKey) {
          same = (firstObj[firstKey] === secondObj[secondKey]);
        }
      }
      if (!same) {
        return false;
      }
    }
  }
  return true;
}

console.log(
  deepEqual({
    here: 1,
    arr: [1, 2]
  }, {
    here: 1,
    arr: [1, 2]
  }));
// → true

console.log(
  deepEqual({
    here: 1,
    arr: [1, 2]
  }, {
    here: 1,
    arr: [1, 2, 3]
  }));
// → false

console.log(
  deepEqual({
    here: 1,
    arr: [1, 2, 5]
  }, {
    here: 1,
    arr: [1, 2, 3]
  }));
// → false

console.log(
  deepEqual({
    here: 1,
    prop: 'string',
    arr: [1, 2, 5]
  }, {
    prop: 'string',
    arr: [1, 2, 5],
    here: 1
  }));
// → true

console.log(
  deepEqual({
    here: 1,
    prop: 'string',
    arr: {
      nestedPropFirst: 1,
      nestedPropSecond: [1, 2]
    }
  }, {
    here: 1,
    prop: 'string',
    arr: {
      nestedPropFirst: 1,
      nestedPropSecond: [1, 2]
    }
  })
);
// → true

console.log(
  deepEqual({
    here: 1,
    prop: 'string',
    arr: {
      nestedPropFirst: 1,
      nestedPropSecond: [1, 2]
    }
  }, {
    here: 1,
    prop: 'string',
    arr: {
      nestedPropFirst: 1,
      nestedPropSecond: [1, 0]
    }
  })
);
// → false

console.log(
  deepEqual({
    here: 1,
    prop: 'string',
    arr: {
      nestedPropFirst: 1,
      nestedPropSecond: [1, 2]
    }
  }, {
    here: 1,
    prop: 'string',
    arr: {
      nestedPropSecond: [1, 2],
      nestedPropFirst: 1
    }
  })
);
// → true

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
    object: 5
  })
);
// → false

console.log(
  deepEqual({
    here: {
      is: 'an',
      obj: 5
    },
    object: 2
  }, {
    here: {
      is: 'an',
      obj: 5
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

console.log(
  deepEqual(obj, {
    object: 10,
    here: {
      is: 'an'
    }
  }));
// → false

console.log(deepEqual(obj, null));
// → false

console.log(deepEqual(null, null));
// → true

console.log(deepEqual(undefined, obj));
// → false
