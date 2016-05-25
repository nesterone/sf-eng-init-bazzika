/* global valley LifelikeWorld plan Wall BouncingCritter WallFollower
 * Plant PlantEater RandomCritter Tiger BoomPlant RestoreEnergyPlant */

var valley = (function () {
  return new LifelikeWorld(plan, {
    '#': Wall,
    o: BouncingCritter,
    '~': WallFollower,
    '*': Plant,
    0: PlantEater,
    W: RandomCritter,
    '@': Tiger,
    '+': BoomPlant,
    S: RestoreEnergyPlant
  });
}());

console.log(valley);
