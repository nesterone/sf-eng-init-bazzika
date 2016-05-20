/* global lifeArea worldCreate */

var plantAndCritter = (function () {
  'use strict';

  var lifeObject = {
    WallFollower: function () {
      this.dir = 's';
    },

    Plant: function () {
      this.energy = 3 + Math.random() * 4;
    },

    TastyPlant: function () {
      this.energy = 10;
    },

    SwoopingPlant: function () {},

    SmartPlantEater: function () {
      this.energy = 20;
      this.dir = worldCreate.randomElement(lifeArea.directionNames);
    },

    Tiger: function () {
      this.energy = Infinity;
      this.dir = worldCreate.randomElement(lifeArea.directionNames);
    }
  };

  lifeObject.dirPlus = function (dir, n) {
    var ind = lifeArea.directionNames.indexOf(dir);

    return lifeArea.directionNames[(ind + n + 8) % 8];
  };

  lifeObject.WallFollower.prototype.act = function (view) {
    var start = this.dir;

    if (view.look(lifeObject.dirPlus(this.dir, -3)) !== ' ') {
      start = this.dir = lifeObject.dirPlus(this.dir, -2);
    }

    while (view.look(this.dir) !== ' ') {
      this.dir = lifeObject.dirPlus(this.dir, 1);

      if (this.dir === start) {
        break;
      }
    }

    return { type: 'move', direction: this.dir };
  };

  lifeObject.Plant.prototype.act = function (view) {
    var space;

    if (this.energy > 40) {
      space = view.find(' ');
      if (space) {
        return { type: 'reproduce', direction: space };
      }
    }

    if (this.energy <= 40) {
      return { type: 'grow' };
    }

    return undefined;
  };

  lifeObject.TastyPlant.prototype.act = function (view) {
    var space;

    if (this.energy > 100) {
      space = view.find(' ');
      if (space) {
        return { type: 'reproduce', direction: space };
      }
    }

    if (this.energy <= 100) {
      return { type: 'grow' };
    }

    return undefined;
  };

  lifeObject.SwoopingPlant.prototype.act = function (view) {
    var smartMeal = view.find('o');
    var tigerMeal = view.find('@');
    var plantMeal = view.find('*');

    if (smartMeal) {
      return { type: 'eat', direction: smartMeal };
    }

    if (tigerMeal) {
      return { type: 'eat', direction: tigerMeal };
    }

    if (plantMeal) {
      return { type: 'eat', direction: plantMeal };
    }

    return undefined;
  };

  lifeObject.SmartPlantEater.prototype.act = function (view) {
    var space = view.find(' ');
    var plant = view.find('*');
    var tastyPlant = view.find('&');

    if (this.energy > 50 && space) {
      return { type: 'reproduce', direction: space };
    }

    if (plant && view.findAll('*').length > 1) {
      return { type: 'eat', direction: plant };
    }

    if (tastyPlant) {
      return { type: 'eat', direction: tastyPlant };
    }

    if ((view.look(this.dir) === '#' || view.look(this.dir) === 'o') && space) {
      this.dir = worldCreate.randomElement(lifeArea.directionNames);
      return { type: 'move', direction: this.dir };
    }

    return { type: 'move', direction: this.dir };
  };

  lifeObject.Tiger.prototype.act = function (view) {
    var space = view.find(' ');
    var critter = view.find('o');

    if (critter) {
      return { type: 'eat', direction: critter };
    }

    if (view.look(this.dir) !== ' ' && space) {
      this.dir = worldCreate.randomElement(lifeArea.directionNames);
      return { type: 'move', direction: this.dir };
    }

    return { type: 'move', direction: this.dir };
  };

  return lifeObject;
}());

if (plantAndCritter) {
  console.log('plantAndCritter module is loaded!');
}
