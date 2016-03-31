var chessLine = '';
var outerLoop = 1;
var innerLoop;
var dividers = [];

function spaceOrSharp(rowIndex) {
  if (rowIndex % 2 !== 0) {
    dividers = ['#', ' '];
  } else {
    dividers = [' ', '#'];
  }

  return dividers;
}

for (; outerLoop <= 8; outerLoop++) {
  spaceOrSharp(outerLoop);

  for (innerLoop = 1; innerLoop <= 8; innerLoop++) {
    chessLine += dividers[innerLoop % 2];
  }

  chessLine += '\n';
}

console.log(chessLine);
