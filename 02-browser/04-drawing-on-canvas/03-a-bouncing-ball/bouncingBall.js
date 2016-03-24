var cx = document.querySelector("canvas").getContext("2d");

var lastTime = null;

function frame(time) {
    if (lastTime != null){
        updateAnimation(Math.min(100, time - lastTime) / 1000);
    }
    lastTime = time;
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

function updateAnimation(step) {
    // Your code here.
}