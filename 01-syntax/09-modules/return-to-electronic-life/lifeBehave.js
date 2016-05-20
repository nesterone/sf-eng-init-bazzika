/* global worldCreate */

var lifeBehave = (function () {
  'use strict';

  var behavior = {
    LifelikeWorld: function (map, legend) {
      worldCreate.World.call(this, map, legend);
    },

    actionTypes: Object.create(null)

  };

  behavior.LifelikeWorld.prototype = Object.create(worldCreate.World.prototype);

  behavior.LifelikeWorld.prototype.letAct = function (critter, vector) {
    var action = critter.act(new worldCreate.View(this, vector));
    var handled = action && action.type in behavior.actionTypes &&
      behavior.actionTypes[action.type].call(this, critter, vector, action);
    if (!handled) {
      arguments[0].energy -= 0.2;
      if (critter.energy <= 0) {
        this.grid.set(vector, null);
      }
    }
  };

  behavior.actionTypes.grow = function () {
    arguments[0].energy += 1;

    return true;
  };

  behavior.actionTypes.move = function (critter, vector, action) {
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

  behavior.actionTypes.eat = function (critter, vector, action) {
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

  behavior.actionTypes.reproduce = function (critter, vector, action) {
    var baby = worldCreate.elementFromChar(this.legend, critter.originChar);
    var destination = this.checkDestination(action, vector);

    if (destination === null || critter.energy <= 2 * baby.energy ||
      this.grid.get(destination) !== null) {
      return false;
    }

    arguments[0].energy -= 2 * baby.energy;
    this.grid.set(destination, baby);
    return true;
  };

  return behavior;
}());

if (lifeBehave) {
  console.log('lifeBehavior module is loaded!');
}
