/* global StretchCell TextCell repeat sc*/

var sc;

function StretchCell(inner, width, height) {
  var text = inner.text;
  this.inner = inner;

  while (height - text.length > 0 && text.length < height) {
    text = text.concat(['']);
    arguments[arguments.length - 1] -= 1;
  }

  this.inner.text = text.map(function (row) {
    if (row.length < width) {
      return row.concat(repeat(' ', width - row.length));
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

sc = new StretchCell(new TextCell('abc'), 1, 2);

console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]
