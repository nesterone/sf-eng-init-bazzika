function MultiplicatorUnitFailure() {
}
function primitiveMultiply(a, b) {
  if (Math.random() < 0.5) {
    return a * b;
  }
  throw new MultiplicatorUnitFailure();
}
function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch (err) {
    if (err instanceof MultiplicatorUnitFailure) {
      return primitiveMultiply(a, b);
    }
    throw err;
  }
}
console.log(reliableMultiply(8, 8));
// → 64
