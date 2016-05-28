var cat = document.querySelector('#cat');
var hat = document.querySelector('#hat');
var angle = 0;
var lastTime = null;
function animate(time) {
  if (lastTime !== null) {
    angle += (time - lastTime) * 0.001;
  }
  lastTime = time;
  cat.style.top = (Math.sin(angle) * 200) + 200 + 'px';
  cat.style.left = (Math.cos(angle) * 60) + 300 + 'px';
  hat.style.top = (Math.cos(angle) * 150) + 300 + 'px';
  hat.style.left = (Math.sin(angle) * 300) + 300 + 'px';
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
