var lifeArea = (function () {
  var areaObject = {
    Vector: function (x, y) {
      this.x = x;
      this.y = y;
    },

    Grid: function (width, height) {
      this.space = new Array(width * height);
      this.width = width;
      this.height = height;
    },

    directionNames: ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']
  };

  areaObject.directions = {
    n: new areaObject.Vector(0, -1),
    ne: new areaObject.Vector(1, -1),
    e: new areaObject.Vector(1, 0),
    se: new areaObject.Vector(1, 1),
    s: new areaObject.Vector(0, 1),
    sw: new areaObject.Vector(-1, 1),
    w: new areaObject.Vector(-1, 0),
    nw: new areaObject.Vector(-1, -1)
  };

  areaObject.Vector.prototype.plus = function (other) {
    return new lifeArea.Vector(this.x + other.x, this.y + other.y);
  };

  areaObject.Grid.prototype.isInside = function (vector) {
    return vector.x >= 0 && vector.x < this.width &&
      vector.y >= 0 && vector.y < this.height;
  };

  areaObject.Grid.prototype.get = function (vector) {
    return this.space[vector.x + this.width * vector.y];
  };

  areaObject.Grid.prototype.set = function (vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
  };

  areaObject.Grid.prototype.forEach = function (f, context) {
    var y;
    var x;
    var value;

    for (y = 0; y < this.height; y++) {
      for (x = 0; x < this.width; x++) {
        value = this.space[x + y * this.width];

        if (value !== null) {
          f.call(context, value, new areaObject.Vector(x, y));
        }
      }
    }
  };
  return areaObject;
}());

if (lifeArea) {
  console.log('lifeArea module is loaded!');
}
