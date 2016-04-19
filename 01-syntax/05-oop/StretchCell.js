var MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, country: 'Tanzania' },
  { name: 'Everest', height: 8848, country: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, country: 'Japan' },
  { name: 'Mont Blanc', height: 4808, country: 'Italy/France' },
  { name: 'Vaalserberg', height: 323, country: 'Netherlands' },
  { name: 'Denali', height: 6168, country: 'United States' },
  { name: 'Popocatepetl', height: 5465, country: 'Mexico' }
];

var sc;

function rowHeights(rows) {
  return rows.map(function (row) {
    return row.reduce(function (max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

function colWidths(rows) {
  return rows[0].map(function (_, i) {
    return rows.reduce(function (max, row) {
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(function (block) {
      return block[lineNo];
    }).join(' ');
  }

  function drawRow(row, rowNum) {
    var blocks = row.map(function (cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);
    });
    return blocks[0].map(function (_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join('\n');
  }

  return rows.map(drawRow).join('\n');
}

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

function dataTable(data) {
  var keys = Object.keys(data[0]);
  var headers = keys.map(function (name) {
    return new UnderlinedCell(new TextCell(name));
  });
  var body = data.map(function (row) {
    return keys.map(function (name) {
      return new TextCell(String(row[name]));
    });
  });
  return [headers].concat(body);
}

console.log(drawTable(dataTable(MOUNTAINS)));

function StretchCell(inner, width, height) {
  var text = this.inner.text;
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
