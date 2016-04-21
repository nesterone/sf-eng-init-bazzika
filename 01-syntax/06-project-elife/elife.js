/* global valley */

var plan = ['###############################################',
  '#@0 ###          ****     ###     #     o     #',
  '#   +#     ####       #                       #',
  '#         #    #      #        #####+         #',
  '# **      #           #   ~        ##     #   #',
  '# *       #   ###     #   +             #     #',
  '#         #    #      #                       #',
  '#          ####       ######                  #',
  '#  #             0   W             #       0  #',
  '#      ** #                        #######    #',
  '# # #           #         ***         ##      #',
  '# 0           ~ #       *****        +## o    #',
  '#  ###          #  +           @      ###     #',
  '#          ***        +             *         #',
  '#*      o *****      #       #      ***       #',
  '###############################################'];

var dirs;
var directions = 'n ne e se s sw w nw'.split(' ');
var actionTypes;

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function (vector) {
  return new Vector(this.x + vector.x, this.y + vector.y);
};

dirs = {
  n: new Vector(0, -1),
  ne: new Vector(1, -1),
  e: new Vector(1, 0),
  se: new Vector(1, 1),
  s: new Vector(0, 1),
  sw: new Vector(-1, 1),
  w: new Vector(-1, 0),
  nw: new Vector(-1, -1)
};

function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}

Grid.prototype.isInside = function (vector) {
  return (vector.x < this.width && vector.y < this.height &&
  vector.x >= 0 && vector.y >= 0);
};

Grid.prototype.get = function (vector) {
  return this.space[vector.x + (vector.y * this.width)];
};

Grid.prototype.set = function (vector, value) {
  this.space[vector.x + (vector.y * this.width)] = value;
};

Grid.prototype.forEach = function (func, context) {
  var x;
  var y;
  var value;
  for (y = 0; y < this.height; y++) {
    for (x = 0; x < this.width; x++) {
      value = this.space[x + (y * this.width)];
      if (value !== null) {
        func.call(context, value, new Vector(x, y));
      }
    }
  }
};

function getRandomElement(space) {
  return space[Math.floor(Math.random() * space.length)];
}

function getElementFromChar(legend, char) {
  var elem;
  if (char === ' ') {
    return null;
  }
  elem = new legend[char]();
  elem.originChar = char;
  return elem;
}

function getCharFromElement(element) {
  if (element === null) {
    return ' ';
  }
  return element.originChar;
}

function BouncingCritter() {
  this.direction = getRandomElement(directions);
}

BouncingCritter.prototype.act = function (view) {
  if (view.look(this.direction) !== ' ') {
    this.direction = view.find(' ') || 's';
  }
  return { type: 'move', direction: this.direction };
};

function RandomCritter() {
  BouncingCritter.call(this);
}

RandomCritter.prototype.act = function (view) {
  this.direction = view.find('o');
  if (this.direction) {
    return { type: 'kill', direction: this.direction };
  }
  this.direction = view.find('0');
  if (this.direction) {
    return { type: 'kill', direction: this.direction };
  }
  this.direction = view.find('@');
  if (this.direction) {
    return { type: 'kill', direction: this.direction };
  }
  this.direction = view.find(' ');
  return { type: 'move', direction: this.direction };
};

function View(getWorld, vector) {
  this.world = getWorld;
  this.vector = vector;
}

View.prototype.look = function (dir) {
  var target = this.vector.plus(dirs[dir]);
  if (this.world.grid.isInside(target)) {
    return getCharFromElement(this.world.grid.get(target));
  }
  return '#';
};

View.prototype.findAll = function (ch) {
  var dir;
  var found = [];
  for (dir in dirs) {
    if (dirs.hasOwnProperty(dir)) {
      if (this.look(dir) === ch) found.push(dir);
    }
  }
  return found;
};

View.prototype.find = function (char) {
  var found = this.findAll(char);
  if (found.length === 0) return null;
  return getRandomElement(found);
};

function World(map, legend) {
  var x;
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;
  map.forEach(function (line, y) {
    for (x = 0; x < line.length; x++) {
      grid.set(new Vector(x, y),
        getElementFromChar(this.legend, line[x]));
    }
  }, this);
}

World.prototype.toString = function () {
  var x;
  var y;
  var result = '';
  for (y = 0; y < this.grid.height; y++) {
    for (x = 0; x < this.grid.width; x++) {
      result += getCharFromElement(this.grid.get(new Vector(x, y)));
    }
    result += '\n';
  }
  return result;
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
  if (action && action.type === 'kill') {
    dest = this.checkDestination(action, vector);
    if (dest) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};

World.prototype.checkDestination = function (action, vector) {
  var dest;
  if (dirs.hasOwnProperty(action.direction)) {
    dest = vector.plus(dirs[action.direction]);
    if (this.grid.isInside(dest)) return dest;
  }
  return null;
};

function dirPlus(dir, n) {
  var index = directions.indexOf(dir);
  return directions[(index + n + 8) % 8];
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
    if (this.dir === start) break;
  }
  return { type: 'move', direction: this.dir };
};

function Wall() {}

function LifelikeWorld(map, legend) {
  World.call(this, map, legend);
}

LifelikeWorld.prototype = Object.create(World.prototype);

actionTypes = Object.create(null);

actionTypes.grow = function (critter) {
  var crit = critter;
  crit.energy += 0.5;
  return true;
};

actionTypes.move = function (critter, vector, action) {
  var crit = critter;
  var dest = this.checkDestination(action, vector);
  if (dest === null ||
    crit.energy <= 1 ||
    this.grid.get(dest) !== null) return false;
  crit.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, crit);
  return true;
};

actionTypes.eat = function (critter, vector, action) {
  var crit = critter;
  var dest = this.checkDestination(action, vector);
  var atDest = dest !== null && this.grid.get(dest);
  if (!atDest || atDest.energy === null) return false;
  crit.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

actionTypes.kill = function (critter, vector) {
  var dest;
  var action = critter.act(new View(this, vector));
  if (action && action.type === 'kill') {
    dest = this.checkDestination(action, vector);
    if (dest) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};

actionTypes.reproduce = function (critter, vector, action) {
  var crit = critter;
  var baby = getElementFromChar(this.legend,
    crit.originChar);
  var dest = this.checkDestination(action, vector);
  if (dest === null ||
    crit.energy <= 2 * baby.energy ||
    this.grid.get(dest) !== null) return false;
  crit.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};

actionTypes.boom = function (critter, vector) {
  var key;
  for (key in dirs) {
    if (dirs.hasOwnProperty(key)) {
      this.grid.set(vector.plus(dirs[key]), null);
    }
  }
  this.grid.set(vector, null);
};

function Plant() {
  this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function (view) {
  var space;
  if (this.energy > 15) {
    space = view.find(' ');
    if (space) return { type: 'reproduce', direction: space };
  }
  if (this.energy < 20) return { type: 'grow' };
  return null;
};

function PlantEater() {
  this.energy = 20;
  this.lastMove = 's';
}
PlantEater.prototype.act = function (view) {
  var space = view.find(' ');
  var plant = view.find('*');
  var plantsAmount = view.findAll('*');
  if (this.energy > 100 && space) {
    return { type: 'reproduce', direction: space };
  }
  if (plantsAmount.length > 1) {
    if (plant) {
      this.lastMove = plant;
      return { type: 'eat', direction: this.lastMove };
    }
  }
  if (view.look(this.lastMove) === '#' || view.look(this.lastMove) === '0' ||
  view.look(this.lastMove) === '+') {
    if (space) {
      this.lastMove = space;
      return { type: 'move', direction: this.lastMove };
    }
  }
  return { type: 'move', direction: this.lastMove };
};

function Tiger() {
  this.energy = 50;
  this.direction = getRandomElement(directions);
}
Tiger.prototype.act = function (view) {
  this.direction = view.find('0');
  if (this.direction) {
    this.energy += 50;
    return { type: 'kill', direction: this.direction };
  }
  this.direction = view.find(' ');
  return { type: 'move', direction: this.direction };
};

function BoomPlant() {}

BoomPlant.prototype.act = function () {
  var chanceToBoom = Math.random();
  if (chanceToBoom < 0.005) {
    return { type: 'boom', direction: new Vector(0, 0) };
  }
  return null;
};

LifelikeWorld.prototype.letAct = function (critter, vector) {
  var crit = critter;
  var action = crit.act(new View(this, vector));
  var handled = action && action.type in actionTypes &&
    actionTypes[action.type].call(this, crit, vector, action);
  if (!handled) {
    crit.energy -= 0.2;
    if (crit.energy <= 0) {
      this.grid.set(vector, null);
    }
  }
};

window.valley = new LifelikeWorld(plan, { '#': Wall,
  o: BouncingCritter,
  '~': WallFollower,
  '*': Plant,
  0: PlantEater,
  W: RandomCritter,
  '@': Tiger,
  '+': BoomPlant });
