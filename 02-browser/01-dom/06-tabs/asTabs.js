function asTabs(node) {
  var arrayNodes = [];
  var arrayButton = [];
  var newButton;
  var button;
  var newText;
  var i;
  for (i = 0; i <= node.childNodes.length - 1; i++) {
    if (node.childNodes[i].nodeType === document.ELEMENT_NODE) {
      arrayNodes.push(node.childNodes[i]);
    }
  }
  for (i = 0; i <= arrayNodes.length - 1; i++) {
    newButton = document.createElement('button');
    newText = document.createTextNode(arrayNodes[i].getAttribute('data-tabname'));
    newButton.appendChild(newText);
    document.body.appendChild(newButton);
  }
  button = document.body.getElementsByTagName('button');
  for (i = 0; i <= button.length - 1; i++) {
    arrayButton.push(button[i]);
  }
  arrayButton.forEach(function (element, j) {
    element.addEventListener('click', function () {
      var n;
      var elements = [];
      var newElement;
      for (n = 0; n <= arrayButton.length - 1; n++) {
        if (arrayButton[n].getAttribute('style') === 'background-color : red') {
          arrayButton[n].removeAttribute('style');
        }
      }
      element.setAttribute('style', 'background-color : red');
      elements = document.getElementsByTagName('button');
      if (elements[elements.length - 1].nextSibling !== null) {
        elements[elements.length - 1].nextSibling.remove();
      }
      newElement = document.createElement('div');
      newText = document.createTextNode(arrayNodes[j].textContent);
      newElement.appendChild(newText);
      document.body.appendChild(newElement);
    });
  });
}
asTabs(document.querySelector('#wrapper'));
