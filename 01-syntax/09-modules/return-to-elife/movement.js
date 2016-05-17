/* global getCharFromElement getRandomElement getElementFromChar */

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

function dirPlus(dir, n) {
  var index = directions.indexOf(dir);
  return directions[(index + n + 8) % 8];
}

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

actionTypes.restore = function (critter, vector) {
  var key;
  var tempCritter;
  for (key in dirs) {
    if (dirs.hasOwnProperty(key)) {
      tempCritter = this.grid.get(vector.plus(dirs[key]));
      if (tempCritter && tempCritter.energy) {
        tempCritter.energy += 1;
      }
    }
  }
};

// Avoid 'never-use' section
console.log(dirPlus);
