function Sequence(arr) {
  this.arr = arr;
}

function RangeSeq(start, end) {
  var obj = new Sequence([]);
  obj.fillObjArray(start, end);

  return obj;
}

Sequence.prototype.fillObjArray = function (start, end) {
  var newStart = start;

  while (newStart <= end) {
    this.arr.push(newStart);
    newStart += 1;
  }
};

Sequence.prototype.toString = function (amount) {
  var index = 0;
  var properties = this.arr.entries();
  var iterator = properties.next();
  iterator.done = false;

  while (index < amount && !iterator.done) {
    console.log(iterator.value[1]);
    iterator = properties.next();
    index++;
  }
};

function logFive(obj) {
  return obj.toString(5);
}

logFive(new Sequence([1, 2]));

logFive(new RangeSeq(100, 1000));
