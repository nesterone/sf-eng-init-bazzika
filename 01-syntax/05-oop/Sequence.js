function Interface(arr) {
  this.arr = arr;
}

Interface.prototype.fillObjArray = function (start, end) {
  while (start <= end) {
    this.arr.push(start);
    arguments[0]++;
  }
};

Interface.prototype.start = function () {
  this.indexPosition = 0;
  return this.indexPosition;
};

Interface.prototype.current = function () {
  return this.indexPosition++;
};

Interface.prototype.finish = function () {
  return this.arr.length;
};

Interface.prototype.iterator = function (curIndex) {
  if (curIndex < this.arr.length) {
    return this.arr[curIndex];
  }
  return undefined;
};

function ArraySeq(arr) {
  return new Interface(arr);
}

function RangeSeq(start, end) {
  var obj = new Interface([]);
  obj.fillObjArray(start, end);
  return obj;
}

function logFive(obj) {
  var index;

  for (index = obj.start(); index < obj.finish() && index < 5; index++) {
    console.log(obj.iterator(obj.current()));
  }
}

logFive(new ArraySeq([1, 2]));

logFive(new RangeSeq(100, 1000));
