/* global elife */

elife.ecosystem = (function () {
  function Wall() {
  }
  function Plant() {
    this.energy = 3 + Math.random() * 4;
  }
  Plant.prototype.act = function (view) {
    var space;
    var result;
    if (this.energy > 15) {
      space = view.find(' ');
      if (space) {
        result = { type: 'reproduce', direction: space };
      }
    }
    if (this.energy < 20) {
      result = { type: 'grow' };
    }
    return result;
  };
  function SmartPlantEater() {
    this.energy = 40;
  }
  SmartPlantEater.prototype.act = function (view) {
    var allPlant;
    var result;
    var space = view.find(' ');
    var plant = view.find('*');
    if (this.energy > 90 && space) {
      result = { type: 'reproduce', direction: space };
    } else {
      allPlant = view.findAll('*');
      if (allPlant.length > 1 && plant) {
        result = { type: 'eat', direction: plant };
      } else if (space) {
        result = { type: 'move', direction: space };
      }
    }
    return result;
  };
  function Tiger() {
    this.energy = 60;
  }
  Tiger.prototype.act = function (view) {
    var allCreatures;
    var result;
    var space = view.find(' ');
    var creatures = view.find('O');
    if (this.energy > 90 && space) {
      result = { type: 'reproduce', direction: space };
    } else {
      allCreatures = view.findAll('O');
    }
    if (allCreatures && allCreatures.length > 0) {
      result = { type: 'eat', direction: creatures };
    } else if (space) {
      result = { type: 'move', direction: space };
    }
    return result;
  };
  function Owl() {
    this.energy = 70;
  }
  Owl.prototype.act = function (view) {
    var allTiger;
    var result;
    var relative = view.find('W');
    var space = view.find(' ');
    var tiger = view.find('@');
    var plant = view.find('*');
    if (this.energy > 100 && space) {
      result = { type: 'reproduce', direction: space };
    } else {
      allTiger = view.findAll('@');
    }
    if (allTiger && allTiger.length > 4) {
      result = { type: 'eat', direction: tiger };
    } else if (relative) {
      result = { type: 'eat', direction: relative };
    } else if (this.energy > 150) {
      result = { type: 'eat', direction: plant };
    } else if (space) {
      result = { type: 'move', direction: space };
    }
    return result;
  };
  return {
    Wall: Wall,
    Plant: Plant,
    SmartPlantEater: SmartPlantEater,
    Tiger: Tiger,
    Owl: Owl
  };
}());
console.log(elife.ecosystem);
