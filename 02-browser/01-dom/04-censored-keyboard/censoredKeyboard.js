var field = document.querySelector('input');
field.addEventListener('keypress', function (event) {
  var input = String.fromCharCode(event.charCode);
  var div = document.querySelector('div');
  if (input === 'Q' || input === 'W' || input === 'X') {
    event.preventDefault();
    div.style.display = 'block';
    setTimeout(function () { div.style.display = 'none'; }, 500);
  }
});
