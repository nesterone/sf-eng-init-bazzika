function ArraySeq(arr) {
  var i;
  this.sequence = [];
  for (i = arr[0]; i <= arr[1]; i++) {
    this.sequence.push(i);
  }
}

ArraySeq.prototype.printElements = function (quantity) {
  var i;
  var quantityToPrint = quantity;
  if (quantityToPrint > this.sequence.length) {
    quantityToPrint = this.sequence.length;
  }
  for (i = 0; i < quantityToPrint; i++) {
    console.log(this.sequence[i]);
  }
};

ArraySeq.prototype.getSum = function () {
  return this.sequence.reduce(function (a, b) { return a + b; });
};

ArraySeq.prototype.getElement = function (element) {
  var elem = element;
  if (element < 1) {
    elem = 0;
  }
  if (this.sequence[elem]) return this.sequence[elem - 1];
  return undefined;
};

function RangeSeq(from, to) {
  var i;
  this.sequence = [];
  for (i = from; i <= to; i++) {
    this.sequence.push(i);
  }
}

RangeSeq.prototype.printElements = ArraySeq.prototype.printElements;

function logFive(obj) {
  obj.printElements(5);
}

logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104
console.log(new ArraySeq([1, 10]).getSum());
// → 55
console.log(new ArraySeq([1, 10]).getElement(3));
// → 3
