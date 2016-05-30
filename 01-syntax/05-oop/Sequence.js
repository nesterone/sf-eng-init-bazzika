/* global Sequence */
function logFive(object) {
  var count = 0;
  var i;
  for (i = object.begin(); i < object.end(); i++) {
    if (i < 5) {
      console.log(object.sequence[i]);
      count++;
    } else break;
  }
}
function ArraySeq(object) {
  this.sequence = object;
}
ArraySeq.prototype.begin = function () {
  this.sequence.begin = 0;
  return this.sequence.begin;
};
ArraySeq.prototype.end = function () {
  return this.sequence.length;
};
function RangeSeq(begin, end) {
  var i;
  var count = 0;
  this.sequence = [];
  for (i = 0; i < (end - begin); i++) {
    count = begin + i;
    this.sequence.push(count);
  }
}
RangeSeq.prototype = Object.create(ArraySeq.prototype);
logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104
