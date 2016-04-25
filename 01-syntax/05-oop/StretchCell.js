/* global TextCell */

var anotherCell;

function StretchCell(inner, width, height) {
  var text = inner.text;
  var newHeight = height;
  this.inner = inner;

  while (height - text.length > 0 && text.length < height) {
    text = text.concat(['']);
    newHeight -= 1;
  }

  this.inner.text = text.map(function (row) {
    if (row.length < width) {
      return row.concat(TextCell.repeat(' ', width - row.length));
    }

    return row;
  });
}

StretchCell.prototype.draw = function (width, height) {
  return this.inner.draw(width, height);
};

StretchCell.prototype.minWidth = function () {
  return this.inner.minWidth();
};

StretchCell.prototype.minHeight = function () {
  return this.inner.minHeight();
};

anotherCell = new StretchCell(new TextCell('abc'), 1, 2);

console.log(anotherCell.minWidth());
// → 3
console.log(anotherCell.minHeight());
// → 2
console.log(anotherCell.draw(3, 2));
// → ["abc", "   "]
