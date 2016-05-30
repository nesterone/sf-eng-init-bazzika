/* global moneyTreeSize readyMoneyTree addNeedle branchLength spaces rows
*
* This program writes a money-tree - a fix-sized pine tree with dollars
* instead of branches and needles */

var moneyTreeSize;
var readyMoneyTree;
var branchLength;
var addNeedle;
var spaces;
var rows;

readyMoneyTree = '';
moneyTreeSize = 20;
addNeedle = 1;

for (rows = 0; rows < (moneyTreeSize / 2); rows++) {
  for (spaces = 0; spaces < moneyTreeSize / 2 - rows; spaces++) {
    readyMoneyTree += ' ';
  }

  for (branchLength = 0; branchLength < addNeedle; branchLength++) {
    readyMoneyTree += '$';
  }

  readyMoneyTree += '\n';

  for (spaces = 0; spaces < moneyTreeSize / 2; spaces++) {
    readyMoneyTree += ' ';
  }

  readyMoneyTree += '#\n';
  addNeedle += 2;
}

while (moneyTreeSize + 2) {
  readyMoneyTree += '+';
  moneyTreeSize -= 1;
}

console.log(readyMoneyTree);
