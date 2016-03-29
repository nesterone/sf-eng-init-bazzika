var line = "";
for (var i = 0; i < 8; i++) {
  for (var j = 0; j < 8; j++) {
    if ((i+j) % 2 == 0) {
      line += "#";
    } else {
      line += " ";
  }}
  line += "\n";
}
console.log(line);



