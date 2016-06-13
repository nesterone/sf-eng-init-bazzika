var elements = [];
var element;
var i;
var count = 0;
for (i = 0; i < 30; i++) {
  element = document.createElement('div');
  element.className = 'trail';
  document.body.appendChild(element);
  elements.push(element);
}
addEventListener('mousemove', function movement(event) {
  elements[count].style.top = event.pageY + 'px';
  elements[count].style.left = event.pageX + 'px';
  count++;
  if (count === 29) {
    count = 0;
  }
});
