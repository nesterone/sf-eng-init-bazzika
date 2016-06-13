(function () {
  'use strict';

  var unifiedLoader = 'http://eloquentjavascript.net/author';

  function getContent(url, type) {
    var req = new XMLHttpRequest();

    req.open('GET', url, false);
    req.setRequestHeader('Accept', type || 'text/plain');
    req.send(null);

    return req.responseText;
  }

  console.log(getContent(unifiedLoader, 'text/plain'));
  console.log(getContent(unifiedLoader, 'text/html'));
  console.log(getContent(unifiedLoader, 'application/json'));
  console.log(getContent(unifiedLoader, 'application/rainbows+unicorns'));
}());
