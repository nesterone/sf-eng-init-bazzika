function asTabs(wrap) {
  var i;
  var button;
  var children = wrap.childNodes;
  var tabs = document.createElement('div');
  tabs.className = 'tabList';

  for (i = 0; i < children.length; i++) {
    if (children[i].nodeType === 1) {
      children[i].style.display = 'none';
      button = document.createElement('button');
      button.innerHTML = children[i].getAttribute('data-tabname');
      button.style.width = '150px';
      button.style.margin = '5px 10px';
      tabs.appendChild(button);

      // Next comment is here to allow use of functions inside loop
      // eslint-disable-next-line
      (function (index) {
        var j;
        button.addEventListener('click', function () {
          for (j = 0; j < tabs.childNodes.length; j++) {
            if (tabs.childNodes[j].tagName === 'BUTTON') {
              tabs.childNodes[j].style.background = 'buttonface';
            }
          }
          for (j = 0; j < children.length; j++) {
            if (children[j].nodeType === 1) {
              children[j].style.display = 'none';
            }
          }
          children[index].style.display = 'block';
          this.style.background = 'yellow';
        });
      }(i));
    }
  }
  document.body.insertBefore(tabs, wrap);
}

asTabs(document.querySelector('#wrapper'));
