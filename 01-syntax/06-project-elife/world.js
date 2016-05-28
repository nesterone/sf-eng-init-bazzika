/* global elife */

elife.world = (function () {
  var actionTypes;
  function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function elementFromChar(legend, ch) {
    var element;
    if (ch === ' ') {
      return null;
    }
    element = new legend[ch]();
    element.originChar = ch;
    return element;
  }

  function charFromElement(element) {
    if (element === null) {
      return ' ';
    }
    return element.originChar;
  }

  function View(world, vector) {
    this.world = world;
    this.vector = vector;
  }
  View.prototype.look = function (dir) {
    var target = this.vector.plus(elife.grid.directions[dir]);
    if (this.world.grid.isInside(target)) {
      return charFromElement(this.world.grid.get(target));
    }
    return '#';
  };
  View.prototype.findAll = function (ch) {
    var found = [];
    var dir;
    for (dir in elife.grid.directions) {
      if (this.look(dir) === ch) {
        found.push(dir);
      }
    }
    return found;
  };
  View.prototype.find = function (ch) {
    var found = this.findAll(ch);
    if (found.length === 0) return null;
    return randomElement(found);
  };
  function World(map, legend) {
    var grid = new elife.grid.Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;
    map.forEach(function (line, y) {
      var x;
      for (x = 0; x < line.length; x++) {
        grid.set(new elife.grid.Vector(x, y),
          elementFromChar(legend, line[x]));
      }
    });
  }
  World.prototype.toString = function () {
    var output = '';
    var y;
    var x;
    var element;
    for (y = 0; y < this.grid.height; y++) {
      for (x = 0; x < this.grid.width; x++) {
        element = this.grid.get(new elife.grid.Vector(x, y));
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
    var dest;
    var action = critter.act(new View(this, vector));
    if (action && action.type === 'move') {
      dest = this.checkDestination(action, vector);
      if (dest && this.grid.get(dest) === null) {
        this.grid.set(vector, null);
        this.grid.set(dest, critter);
      }
    }
  };
  World.prototype.checkDestination = function (action, vector) {
    var dest;
    if (elife.grid.directions.hasOwnProperty(action.direction)) {
      dest = vector.plus(elife.grid.directions[action.direction]);
      if (this.grid.isInside(dest)) {
        return dest;
      }
    }
    return dest;
  };
  function LifelikeWorld(map, legend) {
    World.call(this, map, legend);
  }
  LifelikeWorld.prototype = Object.create(World.prototype);
  actionTypes = Object.create(null);

  actionTypes.grow = function (critter) {
    var creatures = critter;
    creatures.energy += 0.5;
    return true;
  };
  actionTypes.move = function (critter, vector, action) {
    var creatures = critter;
    var dest = this.checkDestination(action, vector);
    if (dest === null ||
      creatures.energy <= 1 ||
      this.grid.get(dest) !== null) {
      return false;
    }
    creatures.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
  };
  actionTypes.eat = function (critter, vector, action) {
    var creatures = critter;
    var dest = this.checkDestination(action, vector);
    var atDest = dest !== null && this.grid.get(dest);
    if (!atDest || atDest.energy === null) {
      return false;
    }
    creatures.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
  };
  actionTypes.reproduce = function (critter, vector, action) {
    var creatures = critter;
    var baby = elementFromChar(this.legend,
      creatures.originChar);
    var dest = this.checkDestination(action, vector);
    if (dest === null ||
      creatures.energy <= 2 * baby.energy ||
      this.grid.get(dest) !== null) {
      return false;
    }
    creatures.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
  };
  LifelikeWorld.prototype.letAct = function (critter, vector) {
    var creatures = critter;
    var action = creatures.act(new View(this, vector));
    var handled = action &&
        action.type in actionTypes &&
        actionTypes[action.type].call(this, creatures,
            vector, action);
    if (!handled) {
      creatures.energy -= 0.2;
      if (creatures.energy <= 0) {
        this.grid.set(vector, null);
      }
    }
  };
  return {
    World: World,
    View: View,
    LifelikeWorld: LifelikeWorld,
    directions: elife.grid.directions
  };
}());
console.log(elife.world);
