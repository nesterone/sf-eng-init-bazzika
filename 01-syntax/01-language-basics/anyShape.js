var i;
var j;
var result = ' ########\n';
var rand;
var cow = '';

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

// One more

cow += ' ^__^\n';
cow += ' (oo)_______\n';
cow += ' (__)|       )\\/\\\n';
cow += '    ||----w |\n';
cow += '    ||     ||\n';

console.log(cow);
