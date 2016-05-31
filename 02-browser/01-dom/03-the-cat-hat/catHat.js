var section = document.querySelector('section');
var cat = document.getElementById('cat');
var hat = document.getElementById('hat');
var angle = 0;
var lastTime = null;

section.style = 'margin: 20vw 0 0 40vw';

function animate(time) {
  if (lastTime !== null) {
    angle += (time - lastTime) * 0.001;
  }
  lastTime = time;
  cat.style.top = Math.sin(angle) * 50 + 'px';
  cat.style.left = Math.cos(angle) * 200 + 'px';
  hat.style.top = Math.cos(angle) * 200 + 'px';
  hat.style.left = Math.sin(angle) * 550 + 'px';
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
