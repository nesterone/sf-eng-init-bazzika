document.addEventListener('mousemove', function (event) {
  'use strict';

  var trail = document.createElement('div');
  trail.className = 'trail';
  trail.style.top = event.pageY + 'px';
  trail.style.left = event.pageX + 'px';
  document.body.appendChild(trail);

  setTimeout(function () {
    document.body.removeChild(trail);
  }, 500);
});
