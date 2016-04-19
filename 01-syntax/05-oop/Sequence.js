/* global Sequence RangeSeq logFive*/

function Sequence(arr) {
  this.arr = arr;
  this.position = 0;
}

Sequence.prototype.fillObjArray = function (start, end) {
  while (start <= end) {
    this.arr.push(start);
    arguments[0]++;
  }
};

Sequence.prototype.iterator = function () {
  if (this.position < this.arr.length) {
    return this.arr[this.position++];
  }

  return undefined;
};

function RangeSeq(start, end) {
  var obj = new Sequence([]);
  obj.fillObjArray(start, end);
  return obj;
}

function logFive(obj) {
  var index;

  for (index = obj.position; index < obj.arr.length && index < 5; index++) {
    console.log(obj.iterator());
  }
}

logFive(new Sequence([1, 2]));

logFive(new RangeSeq(100, 1000));
