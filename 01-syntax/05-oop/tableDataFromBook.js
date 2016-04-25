function TextCell(text) {
  this.text = text.split('\n');
}

TextCell.repeat = function repeat(string, times) {
  var result = '';
  var index;

  for (index = 0; index < times; index++) {
    result += string;
  }

  return result;
};

TextCell.prototype.minWidth = function () {
  return this.text.reduce(function (width, line) {
    return Math.max(width, line.length);
  }, 0);
};

TextCell.prototype.minHeight = function () {
  return this.text.length;
};

TextCell.prototype.draw = function (width, height) {
  var result = [];
  var index;
  var row;

  for (index = 0; index < height; index++) {
    row = this.text[index] || '';
    result.push(row + TextCell.repeat(' ', width - row.length));
  }

  return result;
};
