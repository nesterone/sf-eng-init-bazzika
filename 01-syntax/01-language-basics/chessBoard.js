scale = 8;
var line = "";
for (var i = 0; i < scale; i++) {
  for (var j = 0; j < scale; j++) {
    if ((i+j) % 2 == 0) {
      line += "#";
    } else {
      line += " ";
  }}
  line += "\n";
}
console.log(line);



