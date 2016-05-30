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

function UnderlinedCell(inner) {
  this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function () {
  return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function () {
  return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function (width, height) {
  return this.inner.draw(width, height - 1)
    .concat([repeat('-', width)]);
};


function StretchCell(inner, width, height) {
  var text = inner.text;
  var cellHeight = height;
  this.inner = inner;
  if (text.length < cellHeight) {
    while (cellHeight - text.length > 0) {
      text = text.concat(['']);
      cellHeight--;
    }
  }
  this.inner.text = text.map(function (txt) {
    if (txt.length < width) {
      return txt + repeat(' ', width - txt.length);
    }
    return txt;
  });
}

StretchCell.prototype.minHeight = function () {
  return this.inner.minHeight();
};
StretchCell.prototype.minWidth = function () {
  return this.inner.minWidth();
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
