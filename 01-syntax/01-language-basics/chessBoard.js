var chessLine = '';
var outerLoop;
var innerLoop;
var leftDivider;
var rightDivider;

for (outerLoop = 1; outerLoop <= 8; outerLoop++) {
  if (outerLoop % 2 !== 0) {
    leftDivider = '#';
    rightDivider = ' ';
  } else {
    leftDivider = ' ';
    rightDivider = '#';
  }

  for (innerLoop = 1; innerLoop <= 8; innerLoop++) {
    if (innerLoop % 2 === 0) {
      chessLine += leftDivider;
    } else {
      chessLine += rightDivider;
    }
  }

  chessLine += '\n';
}

console.log(chessLine);
