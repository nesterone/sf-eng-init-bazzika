/* global chrome */

(function () {
  chrome.devtools.panels.create.call(this, 'Custom Tab',
		'../img/favicon.png',
		'../html/NewPanel.html',
		function () {
		});
}());
