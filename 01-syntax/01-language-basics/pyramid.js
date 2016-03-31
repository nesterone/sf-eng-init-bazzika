var pyramidLine = '';
var maxPyramidSize = 15;

function buildPyramid(minLength, maxLength) {
  var addSpaces = 1;
  var addPieces = 1;
  var getReadyValue;

  if (minLength === maxPyramidSize + 2) {
    getReadyValue = pyramidLine;
  } else {
    for (; addSpaces < maxLength / 2; addSpaces++) {
      pyramidLine += ' ';
    }

    for (; addPieces <= minLength; addPieces++) {
      pyramidLine += '^';
    }

    pyramidLine += '\n';

    getReadyValue = buildPyramid(minLength + 2, maxLength - 2);
  }

  return getReadyValue;
}

console.log(buildPyramid(1, maxPyramidSize));
