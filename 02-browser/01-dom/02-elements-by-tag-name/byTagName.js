var paragraph = document.querySelector('p');
function byTagName(allNodes, string) {
  var array = [];
  var tagName = string.toUpperCase();
  function inner(node) {
    var i;
    if (node.nodeType === document.ELEMENT_NODE) {
      for (i = 0; i <= node.childNodes.length - 1; i++) {
        if (node.childNodes[i].tagName === tagName) {
          array.push(node.childNodes[i].tagName);
        }
        inner(node.childNodes[i]);
      }
    }
    return array;
  }

  return inner(allNodes);
}
console.log(byTagName(document.body, 'h1').length);
// → 1
console.log(byTagName(document.body, 'span').length);
// → 3
console.log(byTagName(paragraph, 'span').length);
// → 2

