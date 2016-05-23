/* global worldCreate */

var lifeBehave = (function () {
  'use strict';
  var actionTypes;

  function LifelikeWorld(map, legend) {
    worldCreate.World.call(this, map, legend);
  }

  actionTypes = Object.create(null);

  LifelikeWorld.prototype = Object.create(worldCreate.World.prototype);

  LifelikeWorld.prototype.letAct = function (critter, vector) {
    var action = critter.act(new worldCreate.View(this, vector));
    var handled = action && action.type in actionTypes &&
      actionTypes[action.type].call(this, critter, vector, action);
    if (!handled) {
      arguments[0].energy -= 0.2;
      if (critter.energy <= 0) {
        this.grid.set(vector, null);
      }
    }
  };

  actionTypes.grow = function () {
    arguments[0].energy += 1;

    return true;
  };

  actionTypes.move = function (critter, vector, action) {
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

  actionTypes.eat = function (critter, vector, action) {
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

  actionTypes.reproduce = function (critter, vector, action) {
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

  return {
    LifelikeWorld: LifelikeWorld,
    actionTypes: actionTypes
  };
}());

if (lifeBehave) {
  console.log('lifeBehavior module is loaded!');
}
