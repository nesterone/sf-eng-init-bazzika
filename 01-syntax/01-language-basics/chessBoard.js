var chessLine = '';
var size = 8;
var outerLoop;
var innerLoop;
var leftDivider;
var rightDivider;

for (outerLoop = 1; outerLoop <= size; outerLoop++) {
  if (outerLoop % 2 !== 0) {
    leftDivider = '#';
    rightDivider = ' ';
  } else {
    leftDivider = ' ';
    rightDivider = '#';
  }

  for (innerLoop = 1; innerLoop <= size; innerLoop++) {
    if (innerLoop % 2 === 0) {
      chessLine += leftDivider;
    } else {
      chessLine += rightDivider;
    }
  }

  chessLine += '\n';
}

console.log(chessLine);
