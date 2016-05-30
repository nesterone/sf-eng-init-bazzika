/* global lifeArea */

var worldCreate = (function () {
  'use strict';

  var elementFromChar;
  var charFromElement;

  function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function World(map, legend) {
    var x;
    var gridWorld = new lifeArea.Grid(map[0].length, map.length);
    this.grid = gridWorld;
    this.legend = legend;
    map.forEach(function (line, y) {
      for (x = 0; x < line.length; x++) {
        gridWorld.set(new lifeArea.Vector(x, y),
        elementFromChar(legend, line[x]));
      }
    });
  }

  function Wall() {}

  function View(worldView, vector) {
    this.world = worldView;
    this.vector = vector;
  }

  elementFromChar = function (legend, ch) {
    var element;

    if (ch === ' ') {
      return null;
    }

    element = new legend[ch]();
    element.originChar = ch;
    return element;
  };

  charFromElement = function (element) {
    if (element === null) {
      return ' ';
    }

    return element.originChar;
  };

  World.prototype.toString = function () {
    var output = '';
    var y;
    var x;
    var element;

    for (y = 0; y < this.grid.height; y++) {
      for (x = 0; x < this.grid.width; x++) {
        element = this.grid.get(new lifeArea.Vector(x, y));
        output += charFromElement(element);
      }
      output += '\n';
    }

    return output;
  };

  World.prototype.turn = function () {
    var acted = [];
    this.grid.forEach(function (critter, vector) {
      if (critter.act && acted.indexOf(critter) === -1) {
        acted.push(critter);
        this.letAct(critter, vector);
      }
    }, this);
  };

  World.prototype.letAct = function (critter, vector) {
    var destination;
    var action = critter.act(new View(this, vector));
    if (action && action.type === 'move') {
      destination = this.checkDestination(action, vector);
      if (destination && this.grid.get(destination) === null) {
        this.grid.set(vector, null);
        this.grid.set(destination, critter);
      }
    }
  };

  World.prototype.checkDestination = function (action, vector) {
    var destination;
    if (lifeArea.directions.hasOwnProperty(action.direction)) {
      destination = vector.plus(lifeArea.directions[action.direction]);
      if (this.grid.isInside(destination)) {
        return destination;
      }
    }
    return destination;
  };

  View.prototype.look = function (dir) {
    var target = this.vector.plus(lifeArea.directions[dir]);
    if (this.world.grid.isInside(target)) {
      return charFromElement(this.world.grid.get(target));
    }

    return '#';
  };

  View.prototype.findAll = function (ch) {
    var found = [];
    var dir;

    for (dir in lifeArea.directions) {
      if (this.look(dir) === ch && lifeArea.directions.hasOwnProperty(dir)) {
        found.push(dir);
      }
    }

    return found;
  };

  View.prototype.find = function (ch) {
    var found = this.findAll(ch);

    if (found.length === 0) {
      return null;
    }

    return randomElement(found);
  };

  return {
    randomElement: randomElement,
    World: World,
    Wall: Wall,
    View: View,
    elementFromChar: elementFromChar,
    charFromElement: charFromElement
  };
}());

if (worldCreate) {
  console.log('worldCreation module is loaded!');
}
