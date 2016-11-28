/* eslint no-new-func: 0 no-use-before-define: 0 */
var button = document.getElementById('button');
var output = document.getElementById('output');
var code = document.getElementById('code');
button.addEventListener('click', function () {
  var result;
  try {
    result = new Function(code.value);
    output.innerHTML = String(result);
  } catch (e) {
    output.innerHTML = e;
  }
});

