var size = 8;
var board = '';
var i;
var j;

for (j = 0; j < size; j++) {
  if (j % 2 === 0) {
    board += ' ';
  }
  for (i = 0; i < size; i++) {
    if (i % 2 === 0) {
      board += '#';
    } else {
      board += ' ';
    }
  }
  board += '\n';
}

console.log(board);
