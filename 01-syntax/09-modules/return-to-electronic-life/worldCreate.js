/* global lifeArea */

var worldCreate = (function () {
  'use strict';

  var worldObject = {
    randomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    World: function (map, legend) {
      var x;
      var gridWorld = new lifeArea.Grid(map[0].length, map.length);
      this.grid = gridWorld;
      this.legend = legend;

      map.forEach(function (line, y) {
        for (x = 0; x < line.length; x++) {
          gridWorld.set(new lifeArea.Vector(x, y),
            worldObject.elementFromChar(legend, line[x]));
        }
      });
    },

    Wall: function () {},

    View: function (worldView, vector) {
      this.world = worldView;
      this.vector = vector;
    }
  };

  worldObject.elementFromChar = function (legend, ch) {
    var element;

    if (ch === ' ') {
      return null;
    }

    element = new legend[ch]();
    element.originChar = ch;
    return element;
  };

  worldObject.charFromElement = function (element) {
    if (element === null) {
      return ' ';
    }

    return element.originChar;
  };

  worldObject.World.prototype.toString = function () {
    var output = '';
    var y;
    var x;
    var element;

    for (y = 0; y < this.grid.height; y++) {
      for (x = 0; x < this.grid.width; x++) {
        element = this.grid.get(new lifeArea.Vector(x, y));
        output += worldObject.charFromElement(element);
      }
      output += '\n';
    }

    return output;
  };

  worldObject.World.prototype.turn = function () {
    var acted = [];
    this.grid.forEach(function (critter, vector) {
      if (critter.act && acted.indexOf(critter) === -1) {
        acted.push(critter);
        this.letAct(critter, vector);
      }
    }, this);
  };

  worldObject.World.prototype.letAct = function (critter, vector) {
    var destination;
    var action = critter.act(new worldObject.View(this, vector));
    if (action && action.type === 'move') {
      destination = this.checkDestination(action, vector);
      if (destination && this.grid.get(destination) === null) {
        this.grid.set(vector, null);
        this.grid.set(destination, critter);
      }
    }
  };

  worldObject.World.prototype.checkDestination = function (action, vector) {
    var destination;
    if (lifeArea.directions.hasOwnProperty(action.direction)) {
      destination = vector.plus(lifeArea.directions[action.direction]);
      if (this.grid.isInside(destination)) {
        return destination;
      }
    }
    return destination;
  };

  worldObject.View.prototype.look = function (dir) {
    var target = this.vector.plus(lifeArea.directions[dir]);
    if (this.world.grid.isInside(target)) {
      return worldObject.charFromElement(this.world.grid.get(target));
    }

    return '#';
  };

  worldObject.View.prototype.findAll = function (ch) {
    var found = [];
    var dir;

    for (dir in lifeArea.directions) {
      if (this.look(dir) === ch && lifeArea.directions.hasOwnProperty(dir)) {
        found.push(dir);
      }
    }

    return found;
  };

  worldObject.View.prototype.find = function (ch) {
    var found = this.findAll(ch);

    if (found.length === 0) {
      return null;
    }

    return worldObject.randomElement(found);
  };

  return worldObject;
}());

if (worldCreate) {
  console.log('worldCreation module is loaded!');
}
