/* global valley */

var plan = ['###############################################',
  '#   ###                   ###     #     o     #',
  '#    #     ####       #                       #',
  '#         #    #      #        ######         #',
  '#         #           #            ##     #   #',
  '#         #   ###     #                 #     #',
  '#  W      #    #      #        W              #',
  '#          ####       ######                  #',
  '#  #                               #          #',
  '#         #                        #######    #',
  '# # #           #                     ##      #',
  '#               #                    ### o    #',
  '#  ###          #                     ###     #',
  '#                                             #',
  '#       o            #       #                #',
  '###############################################'];

var valley;
var dirs;
var directions = 'n ne e se s sw w nw'.split(' ');

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
    return { type: 'eat', direction: this.direction };
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
  if (action && action.type === 'eat') {
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

function Wall() {}

valley = new World(plan, { '#': Wall, o: BouncingCritter, W: RandomCritter });
