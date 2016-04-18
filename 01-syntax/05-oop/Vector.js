function Vector(x, y) {
  this.x = x;
  this.y = y;
};
Vector.prototype.plus = function (anothervector) {
  this.x = this.x + anothervector.x;
  this.y = this.y + anothervector.y;
  return this;
}
Vector.prototype.minus = function (anothervector) {
  this.x = this.x - anothervector.x;
  this.y = this.y - anothervector.y;
  return this;
}
Object.defineProperty(Vector.prototype, 'length', {
  get: function () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
});
console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5
