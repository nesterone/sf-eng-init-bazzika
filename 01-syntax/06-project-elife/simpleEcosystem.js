/* global elife */

elife.simpleEcosystem = (function () {
  function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function dirPlus(dir, n) {
    var index = elife.grid.directionNames.indexOf(dir);
    return elife.grid.directionNames[(index + n + 8) % 8];
  }

  function Wall() {
  }

  function BouncingCritter() {
    this.direction = randomElement(elife.grid.directionNames);
  }

  BouncingCritter.prototype.act = function (view) {
    if (view.look(this.direction) !== ' ') {
      this.direction = view.find(' ') || 's';
    }
    return {type: 'move', direction: this.direction};
  };
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
    return {type: 'move', direction: this.dir};
  };
  return {
    Wall: Wall,
    BouncingCritter: BouncingCritter,
    WallFollower: WallFollower
  }
}());
console.log(elife.simpleEcosystem);
