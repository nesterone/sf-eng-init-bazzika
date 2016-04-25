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
      console.log('Failed. Trying to multiply again...');
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64
