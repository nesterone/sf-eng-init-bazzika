/**
 *  [Deep comparation](file:///projects/Eloquent-JavaScript/html/04_data.html#h_IJBU+aXOIC)
 *
 */
/* global deepEqual */

var obj = {};

// → Your code here.

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
