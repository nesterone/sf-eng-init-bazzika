var paragraph = document.querySelector('p');

function byTagName(element, tag) {
  var result = [];
  function countElements(el) {
    var i;
    if (el.nodeType === document.ELEMENT_NODE) {
      for (i = 0; i < el.childNodes.length; i++) {
        if (el.childNodes[i].tagName === tag.toUpperCase()) {
          result.push(el.childNodes[i]);
        }
        if (el.childNodes[i].nodeName !== '#text') {
          countElements(el.childNodes[i]);
        }
      }
    }
  }
  countElements(element);
  return result;
}

console.log(byTagName(document.body, 'h1').length);
// → 1
console.log(byTagName(document.body, 'span').length);
// → 3
console.log(byTagName(paragraph, 'span').length);
// → 2

