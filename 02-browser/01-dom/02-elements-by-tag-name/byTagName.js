var paragraph = document.querySelector('p');

function byTagName(node, tag) {
  var tagCounter = [];

  function innerTag(innerNode) {
    var index;

    if (innerNode.nodeType === document.ELEMENT_NODE) {
      for (index = 0; index < innerNode.childNodes.length; index++) {
        if (innerNode.childNodes[index].tagName === tag.toUpperCase()) {
          tagCounter.push(innerNode.childNodes[index]);
        }

        if (innerNode.childNodes[index].nodeName !== Text) {
          innerTag(innerNode.childNodes[index]);
        }
      }
    }
  }

  innerTag(node);
  return tagCounter;
}

console.log(byTagName(document.body, 'h1').length);
// → 1
console.log(byTagName(document.body, 'span').length);
// → 3
console.log(byTagName(paragraph, 'span').length);
// → 2
