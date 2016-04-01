var i;
var j;
var result = ' ########\n';
var rand;

for (i = 0; i < 10; i++) {
  for (j = 0; j < 10; j++) {
    rand = Math.random();
    if (rand < 0.7) {
      result += '#        #';
      break;
    } else {
      result += ' ';
    }
  }
  result += '\n';
}

result += ' ######## ';
console.log(result);
