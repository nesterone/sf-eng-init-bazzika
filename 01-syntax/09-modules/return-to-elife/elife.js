/* global valley LifelikeWorld plan Wall BouncingCritter WallFollower
 * Plant PlantEater RandomCritter Tiger BoomPlant RestoreEnergyPlant */

window.valley = new LifelikeWorld(plan, { '#': Wall,
  o: BouncingCritter,
  '~': WallFollower,
  '*': Plant,
  0: PlantEater,
  W: RandomCritter,
  '@': Tiger,
  '+': BoomPlant,
  S: RestoreEnergyPlant });
