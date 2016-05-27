addEventListener('mousemove', function (event) {
  var trails;
  var tail = document.createElement('div');
  tail.className = 'trail';
  tail.style.top = event.pageY + 'px';
  tail.style.left = event.pageX + 'px';
  document.body.appendChild(tail);
  setTimeout(function () {
    document.body.removeChild(tail);
  }, 2000);
  trails = document.querySelectorAll('.trail');
  if (trails.length > 150) {
    trails[0].parentNode.removeChild(trails[0]);
  }
});
