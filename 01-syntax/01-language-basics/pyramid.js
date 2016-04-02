var pyramid = '';
var scale = 30;
var i;
var j;
for (i = 0; i <= scale / 2; i++) {
  for (j = 0; j <= scale; j++) {
    if ((j > (scale / 2 - i)) && (j < (scale / 2 + i))) {
      pyramid += '#';
    } else {
      pyramid += ' ';
    }
  }
  console.log(pyramid);
  pyramid = '';
}

