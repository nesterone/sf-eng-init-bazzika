/* global Vector View dirs actionTypes */

var plan = ['###############################################',
  '#@0 ###          ****     ###     #     o     #',
  '#   +#     ####       #                       #',
  '#         #    #      #        #####+         #',
  '# **      #           #   ~        ##     #   #',
  '# *       #   ###     #   +             #     #',
  '#         #    #      #                       #',
  '#   S      ####       ######                  #',
  '#  #             0   W             #       0  #',
  '#      ** #                        #######    #',
  '# # #           #         ***         ##      #',
  '# 0           ~ #       *****        +## o    #',
  '#  ###          #  +           @      ###     #',
  '#          ***        +             *         #',
  '#*      o *****      #       #      ***       #',
  '#*                             S              #',
  '#*                                            #',
  '#* S    ######*   @  #       #      ***       #',
  '#*      o *****              #      ***       #',
  '# # #           #         ***         ##   @  #',
  '###############################################'];

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

function Wall() {}

function LifelikeWorld(map, legend) {
  World.call(this, map, legend);
}

LifelikeWorld.prototype = Object.create(World.prototype);

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

// Avoid 'never-use' section
console.log(plan);
console.log(getRandomElement);
console.log(Wall);
