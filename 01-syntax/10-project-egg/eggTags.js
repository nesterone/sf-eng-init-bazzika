/* global run */

var eggScriptTags = document.querySelectorAll('script[type=\'text/egg\']');
var program = '';
var i;

for (i = 0; i < eggScriptTags.length; i++) {
  program = eggScriptTags[i].innerText;
  run(program);
}
