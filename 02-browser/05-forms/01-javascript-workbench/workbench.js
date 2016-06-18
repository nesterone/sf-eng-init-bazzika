/* eslint no-new-func: "off" */

var button = document.querySelector('button');
var output = document.querySelector('pre');
var code = document.querySelector('textarea');

button.addEventListener('click', function () {
  var func;
  var result;
  try {
    func = new Function('', code.value);
    result = func();
  } catch (e) {
    output.innerHTML = e.message;
    return;
  }
  output.innerHTML = result;
});
