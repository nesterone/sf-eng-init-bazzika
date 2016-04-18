var sc;
function repeat(string, times) {
  var result = '';
  var i;
  for (i = 0; i < times; i++) {
    result += string;
  }
  return result;
}
function TextCell(text) {
  this.text = text.split('\n');
}
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
  var i;
  var line;
  for (i = 0; i < height; i++) {
    line = this.text[i] || '';
    result.push(line + repeat(' ', width - line.length));
  }
  return result;
};
function StretchCell(inner, width, height) {
  this.inner = inner;
  this.width = width;
  this.height = height;
  return this;
}
StretchCell.prototype.minWidth = function () {
  return this.inner.minWidth();
};
StretchCell.prototype.minHeight = function () {
  return this.inner.minHeight();
};
StretchCell.prototype.draw = function (width, height) {
  return this.inner.draw(width, height);
};
sc = new StretchCell(new TextCell('abc'), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]
