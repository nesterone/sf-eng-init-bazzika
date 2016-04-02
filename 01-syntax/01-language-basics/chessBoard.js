var line = '';
var scale = 15;
var i;
var j;
for (i = 0; i < scale; i++) {
  for (j = 0; j < scale; j++) {
    if ((i + j) % 2 === 0) {
      line += '#';
    } else {
      line += ' ';
    }
  }
  line += '\n';
}
console.log(line);
