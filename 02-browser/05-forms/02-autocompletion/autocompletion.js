/* global $ */

var terms = [];
var name;

for (name in window) {
  if (window.hasOwnProperty('name')) {
    terms.push(name);
  }
}

$('#field').on('input', function () {
  var inputText = $(this).val();

  $('#suggestions').text('').prop('disabled', true);

  $.each(terms, function (index, value) {
    if (value.indexOf(inputText) === 0 && inputText.length) {
      $('#suggestions').text(value);
    }
  });
});

$('#suggestions').click(function () {
  $('#field').val($(this).text());
  $(this).text('');
});
