function get(url, accept) {
  var acceptHeader = accept || 'text/html';
  var xhr = new XMLHttpRequest();
  xhr.open('get', url, false);
  xhr.setRequestHeader('Accept', acceptHeader);
  xhr.send(null);
  return xhr.responseText;
}

console.log(get('http://eloquentjavascript.net/author', 'text/plain'));
console.log(get('http://eloquentjavascript.net/author', 'text/html'));
console.log(get('http://eloquentjavascript.net/author', 'application/json'));
console.log(get('http://eloquentjavascript.net/author', 'application/rainbows+unicorns'));
