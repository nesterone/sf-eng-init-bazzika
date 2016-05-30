var cat = document.querySelectorAll('img')[0];
var hat = document.querySelectorAll('img')[1];
var angle = 0;
var lastTime = null;
function animate(time) {
  if (lastTime !== null) {
    angle += (time - lastTime) * 0.001;
  }
  lastTime = time;
  cat.style.top = (Math.sin(angle) * 100) + 'px';
  cat.style.left = (Math.cos(angle) * 100) + 'px';
  hat.style.top = (Math.cos(angle) * 270) + 'px';
  hat.style.left = (Math.sin(angle) * 500) + 'px';
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
