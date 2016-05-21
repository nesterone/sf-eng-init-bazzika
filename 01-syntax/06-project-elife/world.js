elife.world = (function () {
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
  return {
    randomElement: randomElement,
    elementFromChar: elementFromChar,
    charFromElement: charFromElement,
    World: World
  };
}());
console.log(elife.world);
