var lastTime = null;

function updateAnimation() {
  // Your code here.
}

function frame(time) {
  if (lastTime !== null) {
    updateAnimation(Math.min(100, time - lastTime) / 1000);
  }
  lastTime = time;
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
