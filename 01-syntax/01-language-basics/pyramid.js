var pyramidSize = 11;
var pyramid = '';
var addBricks = 1;
var bricksLength;
var spaces;
var rows;

for (rows = 0; rows < (pyramidSize / 2); rows++) {
  for (spaces = 0; spaces < pyramidSize / 2 - rows; spaces++) {
    pyramid += ' ';
  }

  for (bricksLength = 0; bricksLength < addBricks; bricksLength++) {
    pyramid += '^';
  }

  addBricks += 2;
  pyramid += '\n';
}

console.log(pyramid);
