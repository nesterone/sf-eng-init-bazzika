var terms = [];
var name;
var field = document.getElementById('field');
var resultField = document.getElementById('suggestions');
for (name in window) {
  if (window.hasOwnProperty('name')) terms.push(name);
}

field.addEventListener('keydown', function () {
  var allTerms = terms.slice();
  var filtered;
  resultField.innerHTML = '';
  // use setTimeout to get updated value from field
  setTimeout(function () {
    var pattern = '^' + field.value.trim();
    filtered = allTerms.filter(function (el) {
      var regExp = new RegExp(pattern, 'g');
      return regExp.test(el);
    });

    if (filtered.length === 0) {
      resultField.textContent = 'No matches found :(';
    }

    filtered.forEach(function (el) {
      var div = document.createElement('DIV');
      div.textContent = el;
      div.addEventListener('click', function () {
        field.value = this.textContent;
      });
      resultField.appendChild(div);
    });
  }, 0);
});
