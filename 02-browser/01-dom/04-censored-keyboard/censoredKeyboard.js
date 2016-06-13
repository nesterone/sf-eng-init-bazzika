var p = document.querySelector('p');
p.setAttribute('style', 'display: none;');

document.querySelector('input').addEventListener('keypress', function (event) {
  var input = String.fromCharCode(event.charCode);

  if (input === 'Q' || input === 'W' || input === 'X') {
    event.preventDefault();
    p.setAttribute('style', 'display: block; background-color: #800;' +
      'width: 15vw; color: #fff; text-align: center');
    setTimeout(function () {
      p.style.display = 'none';
    }, 1500);
  }
});
