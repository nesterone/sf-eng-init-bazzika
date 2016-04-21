/* global valley */

(function () {
  'use strict';

  var plan = ['#####################################',
    '#####         V         ###    ######',
    '##   ***                        ~**##',
    '#   *##**         **  o           *##',
    '#    ***     o      ##**           *#',
    '#       o         ##***             #',
    '#                 ##**      V       #',
    '#                                   #',
    '#                                   #',
    '#   o       #*                      #',
    '#*           ~   #**       o        #',
    '#***        ##**    o             **#',
    '##****     ###***                *###',
    '#    V                              #',
    '#                                   #',
    '#                        V          #',
    '#                                   #',
    '#####################################'];

  var directions;
  var directionNames;
  var actionTypes;

  function Vector(x, y) {
    this.x = x;
    this.y = y;
  }

  Vector.prototype.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
  };

  function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
  }

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

  function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  directionNames = 'n ne e se s sw w nw'.split(' ');

  function BouncingCritter() {
    this.direction = randomElement(directionNames);
  }

  BouncingCritter.prototype.act = function (view) {
    if (view.look(this.direction) !== ' ') {
      this.direction = view.find(' ') || 's';
    }

    return { type: 'move', direction: this.direction };
  };

  function elementFromChar(legend, ch) {
    var element;

    if (ch === ' ') {
      return null;
    }

    element = new legend[ch]();
    element.originChar = ch;
    return element;
  }

  function World(map, legend) {
    var x;
    var gridWorld = new Grid(map[0].length, map.length);
    this.grid = gridWorld;
    this.legend = legend;

    map.forEach(function (line, y) {
      for (x = 0; x < line.length; x++) {
        gridWorld.set(new Vector(x, y), elementFromChar(legend, line[x]));
      }
    });
  }

  function charFromElement(element) {
    if (element === null) {
      return ' ';
    }

    return element.originChar;
  }

  World.prototype.toString = function () {
    var output = '';
    var y;
    var x;
    var element;

    for (y = 0; y < this.grid.height; y++) {
      for (x = 0; x < this.grid.width; x++) {
        element = this.grid.get(new Vector(x, y));
        output += charFromElement(element);
      }
      output += '\n';
    }

    return output;
  };

  function Wall() {}

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

  World.prototype.turn = function () {
    var acted = [];
    this.grid.forEach(function (critter, vector) {
      if (critter.act && acted.indexOf(critter) === -1) {
        acted.push(critter);
        this.letAct(critter, vector);
      }
    }, this);
  };

  function View(worldView, vector) {
    this.world = worldView;
    this.vector = vector;
  }

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
    if (directions.hasOwnProperty(action.direction)) {
      destination = vector.plus(directions[action.direction]);
      if (this.grid.isInside(destination)) {
        return destination;
      }
    }
    return destination;
  };

  View.prototype.look = function (dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target)) {
      return charFromElement(this.world.grid.get(target));
    }

    return '#';
  };

  View.prototype.findAll = function (ch) {
    var found = [];
    var dir;

    for (dir in directions) {
      if (this.look(dir) === ch && directions.hasOwnProperty(dir)) {
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

  function dirPlus(dir, n) {
    var ind = directionNames.indexOf(dir);

    return directionNames[(ind + n + 8) % 8];
  }

  function WallFollower() {
    this.dir = 's';
  }

  WallFollower.prototype.act = function (view) {
    var start = this.dir;

    if (view.look(dirPlus(this.dir, -3)) !== ' ') {
      start = this.dir = dirPlus(this.dir, -2);
    }

    while (view.look(this.dir) !== ' ') {
      this.dir = dirPlus(this.dir, 1);

      if (this.dir === start) {
        break;
      }
    }

    return { type: 'move', direction: this.dir };
  };

  function LifelikeWorld(map, legend) {
    World.call(this, map, legend);
  }

  LifelikeWorld.prototype = Object.create(World.prototype);

  actionTypes = Object.create(null);

  LifelikeWorld.prototype.letAct = function (critter, vector) {
    var action = critter.act(new View(this, vector));
    var handled = action && action.type in actionTypes &&
      actionTypes[action.type].call(this, critter, vector, action);
    if (!handled) {
      arguments[0].energy -= 0.2;
      if (critter.energy <= 0) {
        this.grid.set(vector, null);
      }
    }
  };

  actionTypes.grow = function () {
    arguments[0].energy += 0.5;

    return true;
  };

  actionTypes.move = function (critter, vector, action) {
    var destination = this.checkDestination(action, vector);

    if (destination === null || critter.energy <= 1 ||
      this.grid.get(destination) !== null) {
      return false;
    }

    arguments[0].energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(destination, critter);

    return true;
  };

  actionTypes.eat = function (critter, vector, action) {
    var destination = this.checkDestination(action, vector);
    var atDestination;
    atDestination = (destination !== null && this.grid.get(destination));

    if (!atDestination || atDestination.energy === null) {
      return false;
    }

    arguments[0].energy += atDestination.energy;
    this.grid.set(destination, null);

    return true;
  };

  actionTypes.reproduce = function (critter, vector, action) {
    var baby = elementFromChar(this.legend, critter.originChar);
    var destination = this.checkDestination(action, vector);

    if (destination === null || critter.energy <= 2 * baby.energy ||
      this.grid.get(destination) !== null) {
      return false;
    }

    arguments[0].energy -= 2 * baby.energy;
    this.grid.set(destination, baby);
    return true;
  };

  function Plant() {
    this.energy = 3 + Math.random() * 4;
  }

  Plant.prototype.act = function (view) {
    var space;

    if (this.energy > 15) {
      space = view.find(' ');
      if (space) {
        return { type: 'reproduce', direction: space };
      }
    }

    if (this.energy < 20) {
      return { type: 'grow' };
    }

    return undefined;
  };

  function PlantEater() {
    this.energy = 20;
  }

  PlantEater.prototype.act = function (view) {
    var space = view.find(' ');
    var plant = view.find('*');

    if (this.energy > 60 && space) {
      return { type: 'reproduce', direction: space };
    }

    if (plant) {
      return { type: 'eat', direction: plant };
    }

    if (space) {
      return { type: 'move', direction: space };
    }

    return undefined;
  };

  function CritterEater() {
    this.energy = 30;
  }

  CritterEater.prototype.act = function (view) {
    var space = view.find(' ');
    var critter = view.find('o');
    var plant = view.find('*');

    if (this.energy > 60 && space) {
      return { type: 'reproduce', direction: space };
    }

    if (critter) {
      return { type: 'eat', direction: critter };
    }

    if (plant) {
      return { type: 'eat', direction: plant };
    }

    if (space) {
      return { type: 'move', direction: space };
    }

    return undefined;
  };

  window.valley = new LifelikeWorld(plan, {
    '#': Wall,
    o: PlantEater,
    '*': Plant,
    V: CritterEater,
    '~': WallFollower
  });
}());
