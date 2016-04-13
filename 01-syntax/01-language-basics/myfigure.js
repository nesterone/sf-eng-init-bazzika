var moneyTreeSize = 20;
var moneyTree = '';
var addNeedle = 1;
var branchLength;
var spaces;
var rows;

for (rows = 0; rows < (moneyTreeSize / 2); rows++) {
  for (spaces = 0; spaces < moneyTreeSize / 2 - rows; spaces++) {
    moneyTree += ' ';
  }

  for (branchLength = 0; branchLength < addNeedle; branchLength++) {
    moneyTree += '$';
  }

  moneyTree += '\n';

  for (spaces = 0; spaces < moneyTreeSize / 2; spaces++) {
    moneyTree += ' ';
  }

  moneyTree += '#\n';
  addNeedle += 2;
}

while (moneyTreeSize + 2) {
  moneyTree += '+';
  moneyTreeSize -= 1;
}

console.log(moneyTree);
