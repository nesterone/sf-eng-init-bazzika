var plan = ['############################',
  '#                          #',
  '#                          #',
  '#                          #',
  '#                          #',
  '#                          #',
  '#                          #',
  '#                          #',
  '#                          #',
  '#                          #',
  '#                          #',
  '############################'];
var directions;
var world;
var directionNames;
var nextButton = document.getElementById('next');
var autoButton = document.getElementById('run');
var interval;

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
Grid.prototype.forEach = function (f, context) {
  var y;
  var x;
  var value;
  for (y = 0; y < this.height; y++) {
    for (x = 0; x < this.width; x++) {
      value = this.space[x + y * this.width];
      if (value !== null) f.call(context, value, new Vector(x, y));
    }
  }
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

function Wall() {}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

directionNames = 'n ne e se s sw w nw'.split(' ');

function Life() {
  this.direction = randomElement(directionNames);
  this.life = 1;
}

Life.prototype.act = function (view) {
  var neighbours = view.findAll('o').length;
  if (this.life === 1 && (neighbours < 2 || neighbours > 3)) this.life = 0;
  if (this.life === 0 && neighbours === 3) this.life = 1;
  if (view.look(this.direction) !== ' ') this.direction = view.find(' ') || 's';
  return { type: 'move', direction: this.direction };
};

function Dead() {
  this.direction = randomElement(directionNames);
  this.life = 0;
}

Dead.prototype.act = function (view) {
  var neighbours = view.findAll('o').length;
  if (this.life === 1 && (neighbours < 2 || neighbours > 3)) this.life = 0;
  if (this.life === 0 && neighbours === 3) this.life = 1;
  if (view.look(this.direction) !== ' ') this.direction = view.find(' ') || 's';
};

function charFromElement(element) {
  if (element === null) return ' ';
  return element.originChar;
}

function elementFromChar(legend, ch) {
  var element;
  element = new legend[ch]();
  element.originChar = ch;
  return element;
}

function View(ourWorld, vector) {
  this.world = ourWorld;
  this.vector = vector;
}
View.prototype.look = function (dir) {
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target)) return charFromElement(this.world.grid.get(target));
  return '#';
};
View.prototype.findAll = function (ch) {
  var found = [];
  var dir;
  for (dir in directions) {
    if (this.look(dir) === ch) found.push(dir);
  }
  return found;
};
View.prototype.find = function (ch) {
  var found = this.findAll(ch);
  if (found.length === 0) return null;
  return randomElement(found);
};

function World(map, legend, newGrid) {
  var grid = newGrid || new Grid(map[0].length, map.length);
  this.grid = grid;
  this.nextGenGrid = new Grid(map[0].length, map.length);
  this.legend = legend;

  map.forEach(function (line, y) {
    var x;
    var random;
    for (x = 0; x < line.length; x++) {
      random = Math.random();
      if (random < 0.2 && line[x] !== '#') {
        grid.set(new Vector(x, y), elementFromChar(legend, 'o'));
      } else {
        grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
      }
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
      element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += '\n';
  }
  return output;
};
World.prototype.turn = function (auto) {
  var acted = [];
  this.grid.forEach(function (critter, vector) {
    if (critter.act && acted.indexOf(critter) === -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
  world = new World(plan, { '#': Wall,
         o: Life, ' ': Dead }, this.nextGenGrid);
  if (auto) {
    interval = setInterval(function () {
      world = new World(plan, {
        '#': Wall, o: Life, ' ': Dead
      }, this.nextGenGrid);
      world.turn();
      console.log(world.toString());
    }, 500);
  }
};

World.prototype.letAct = function (critter, vector) {
  critter.act(new View(this, vector));
  if (critter.life === 1) {
    this.nextGenGrid.set(vector, elementFromChar(this.legend, 'o'));
  } else {
    this.nextGenGrid.set(vector, elementFromChar(this.legend, ' '));
  }
};

World.prototype.checkDestination = function (action, vector) {
  var dest;
  if (directions.hasOwnProperty(action.direction)) {
    dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest)) return dest;
  }
  return undefined;
};

world = new World(plan, { '#': Wall,
  o: Life, ' ': Dead });

nextButton.addEventListener('click', function () {
  clearInterval(interval);
  world.turn();
  console.log(world.toString());
});

autoButton.addEventListener('click', function () {
  world.turn(true);
});
