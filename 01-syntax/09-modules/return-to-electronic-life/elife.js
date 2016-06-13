/* global animate plantAndCritter worldCreate lifeBehave */

function init(getType) {
  'use strict';

  var wilderness = ['####################################################',
    '#                 ####         ****              ###',
    '#   *  @  ##                 ########       oo    ##',
    '#   *    ##    W   o o                 ****       *#',
    '#       ##*                &       ##########     *#',
    '#      ##***  *         ****                     **#',
    '#* **  #  *  ***      #########          &       **#',
    '#* **  #      *               #   *              **#',
    '#     ##              #   o   #  ***          ######',
    '#*            @       #       #   *    W   o  #    #',
    '#*      W             #  ######                 ** #',
    '###          ****          ***                  ** #',
    '#       o                        @         o       #',
    '#   *     ##  ##  ##  ##               ###      *  #',
    '#   **         #              *       #####  o     #',
    '##  **  o   o  #  #    ***  ***        ###      ** #',
    '###               #   *****                    ****#',
    '####################################################'];
  var smallArea = ['############################',
    '#      #    #      o      ##',
    '#                          #',
    '#          #####           #',
    '##         #   #    ##     #',
    '###           ##     #     #',
    '#           ###      #     #',
    '#   ####                   #',
    '#   ##       o             #',
    '# o  #         o       ### #',
    '#    #                     #',
    '############################'];
  var mountain = ['############################',
    '#      #    #      o      ##',
    '#             #            #',
    '#            ###           #',
    '##          #####    #     #',
    '###                 ###    #',
    '###                #####   #',
    '#   #     #                #',
    '#  ###   ###  o            #',
    '# o            o       ### #',
    '#                          #',
    '############################'];
  var sky = ['####################################################',
    '#                              ****                #',
    '#   *  @                                    oo     #',
    '#   *          W   o o                 ****       *#',
    '#         *                &                      *#',
    '#        ***  *         ****                     **#',
    '#* **     *  ***                         &       **#',
    '#* **         *                   *              **#',
    '#                         o      ***               #',
    '#*            @                   *    W   o       #',
    '#*      W                                       ** #',
    '#            ****          ***                  ** #',
    '#       o                        @         o       #',
    '#   *                                           *  #',
    '#   **                        *              o     #',
    '#   **  o   o          ***  ***                 ** #',
    '#                     *****                    ****#',
    '####################################################'];
  var swoopsPitfall = ['####################################################',
    '#                              ****                #',
    '#   *  @    ######              #####       oo     #',
    '#   *            # o o       #      #  ****       *#',
    '#         * #    #         & #    W #             *#',
    '#        ***# *  #      **** #      #            **#',
    '#* **     * #    #           ########    &       **#',
    '#* **       #  W #                *              **#',
    '#           ######        o      ***               #',
    '#*    ######  @  #                *        o       #',
    '#*      o  #                                    ** #',
    '#    #     # ****          ***                  ** #',
    '#    #  W  #                     @         o       #',
    '#   *#######                       #  ###       *  #',
    '#   **      #                  *   #    #     o     #',
    '#   **  o   o          ***  ***    #    #       ** #',
    '#                     *****        #  W #      ****#',
    '####################################################'];

  var areasContainer = [wilderness, smallArea, mountain, sky, swoopsPitfall];

  return new lifeBehave.LifelikeWorld(areasContainer[getType], {
    '#': worldCreate.Wall,
    o: plantAndCritter.SmartPlantEater,
    '*': plantAndCritter.Plant,
    '~': plantAndCritter.WallFollower,
    '@': plantAndCritter.Tiger,
    '&': plantAndCritter.TastyPlant,
    W: plantAndCritter.SwoopingPlant
  });
}

window.onload = function () {
  var areaSelector;

  areaSelector = document.getElementsByTagName('select')[0];
  areaSelector.onchange = function (event) {
    document.body.removeChild(document.getElementsByTagName('div')[0]);
    animate.animateWorld(init(event.target.selectedIndex));
  };

  animate.animateWorld(init(0));
};
