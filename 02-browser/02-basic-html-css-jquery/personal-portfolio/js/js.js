/* global $ */
var i;
var menu;

$(document).ready(function () {
  $('.fancybox').fancybox();
});
document.querySelector('button').addEventListener('click', function (event) {
  event.preventDefault();
});

menu = document.querySelector('.menu-open');
menu.addEventListener('click', function () {
  var items = document.querySelectorAll('nav ul li');
  if (items[1].style.display === 'block') {
    document.querySelector('nav').style.height = '60px';
    for (i = 0; i < items.length; i++) {
      items[i].style.display = 'none';
    }
    items[0].style.display = 'block';
    return;
  }
  document.querySelector('nav').style.height = '200px';
  for (i = 0; i < items.length; i++) {
    items[i].style.display = 'block';
  }
});
