/* global getRandomElement directions dirPlus Vector */

var ecosystem = function () {
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
      view.look(this.lastMove) === '+' || view.look(this.lastMove) === 'S') {
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

  function BoomPlant() {
  }

  BoomPlant.prototype.act = function () {
    var chanceToBoom = Math.random();
    if (chanceToBoom < 0.01) {
      return { type: 'boom', direction: new Vector(0, 0) };
    }
    return null;
  };

  function RestoreEnergyPlant() {
  }

  RestoreEnergyPlant.prototype.act = function () {
    return { type: 'restore', direction: new Vector(0, 0) };
  };

  return {
    BouncingCritter: BouncingCritter,
    RandomCritter: RandomCritter,
    WallFollower: WallFollower,
    Plant: Plant,
    PlantEater: PlantEater,
    Tiger: Tiger,
    BoomPlant: BoomPlant,
    RestoreEnergyPlant: RestoreEnergyPlant
  };
};

console.log(ecosystem);
