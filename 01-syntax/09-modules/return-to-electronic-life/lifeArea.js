var lifeArea = (function () {
  var directions;
  var directionNames;

  function Vector(x, y) {
    this.x = x;
    this.y = y;
  }

  function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
  }

  directionNames = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

  directions = {
    n: new Vector(0, -1),
    ne: new Vector(1, -1),
    e: new Vector(1, 0),
    se: new Vector(1, 1),
    s: new Vector(0, 1),
    sw: new Vector(-1, 1),
    w: new Vector(-1, 0),
    nw: new Vector(-1, -1)
  };

  Vector.prototype.plus = function (other) {
    return new lifeArea.Vector(this.x + other.x, this.y + other.y);
  };

  Grid.prototype.isInside = function (vector) {
    return vector.x >= 0 && vector.x < this.width &&
      vector.y >= 0 && vector.y < this.height;
  };

  Grid.prototype.get = function (vector) {
    return this.space[vector.x + this.width * vector.y];
  };

  Grid.prototype.set = function (vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
  };

  Grid.prototype.forEach = function (f, context) {
    var y;
    var x;
    var value;

    for (y = 0; y < this.height; y++) {
      for (x = 0; x < this.width; x++) {
        value = this.space[x + y * this.width];

        if (value !== null) {
          f.call(context, value, new Vector(x, y));
        }
      }
    }
  };
  return {
    Vector: Vector,
    Grid: Grid,
    directions: directions,
    directionNames: directionNames
  };
}());

if (lifeArea) {
  console.log('lifeArea module is loaded!');
}
