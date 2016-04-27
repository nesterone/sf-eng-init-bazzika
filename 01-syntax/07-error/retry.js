function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5) return a * b;
  throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  var result;
  for (;;) {
    try {
      result = primitiveMultiply(a, b);
      return result;
    } catch (err) {
      if (err instanceof MultiplicatorUnitFailure) {
        console.log('Failed. Trying to multiply again...');
      } else {
        throw err;
      }
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64
