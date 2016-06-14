/* eslint-disable no-new-func */

document.getElementById('button').onclick = function () {
  var textArea = document.getElementById('code');
  var pre = document.getElementById('output');
  var reply;

  try {
    reply = new Function('', textArea.value)();
  } catch (error) {
    reply = error.message;
  } finally {
    pre.innerHTML = reply;
  }
};
