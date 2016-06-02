function asTabs(wrap) {
  var div = [];
  var divIndex;
  var button;
  var divText;
  var buttonIndex;
  var buttonContainer;
  var eventIndex;

  for (divIndex = 0; divIndex < wrap.childNodes.length; divIndex++) {
    if (wrap.childNodes[divIndex].nodeType === document.ELEMENT_NODE) {
      div.push(wrap.childNodes[divIndex]);
    }
  }

  for (buttonIndex = 0; buttonIndex < div.length; buttonIndex++) {
    button = document.createElement('button');
    divText = document.createTextNode(div[buttonIndex].getAttribute('data-tabname'));
    button.appendChild(divText);
    document.body.insertBefore(button, wrap);
  }

  buttonContainer = document.getElementsByTagName('button');

  for (eventIndex = 0; eventIndex < buttonContainer.length; eventIndex++) {
    buttonContainer[eventIndex].onclick = function (event) {
      div.map(function (index, value) {
        if (div[value].getAttribute('data-tabname') === event.target.innerHTML) {
          event.target.setAttribute('style', 'background-color: orange');
          div[value].setAttribute('style', 'display: block; font-size: 5em;' +
            'padding: 15% 0 0 5%; text-shadow: 2px 2px 2px orange');
        } else {
          div[value].style.display = 'none';
          buttonContainer[value].style.backgroundColor = '#ccc';
        }
        return undefined;
      });
    };
  }
}

asTabs(document.querySelector('#wrapper'));
