var pyramid = '';
var pyramidLine = '';
var i;
var j;

for (i = 0; i < 10; i++) {
  pyramidLine = pyramidLine.trim();
  pyramidLine = pyramidLine + '##';
  for (j = 10 - i; j > 0; j--) {
    pyramidLine = ' ' + pyramidLine;
  }
  pyramid += pyramidLine + '\n';
}

console.log(pyramid);
