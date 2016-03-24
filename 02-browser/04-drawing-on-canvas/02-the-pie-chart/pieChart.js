var cx = document.querySelector("canvas").getContext("2d");
var total = results.reduce(function(sum, choice) {
    return sum + choice.count;
}, 0);

var currentAngle = -0.5 * Math.PI;
var centerX = 300, centerY = 150;

// Add code to draw the slice labels in this loop.
// Your code here

results.forEach(function(result) {
    var sliceAngle = (result.count / total) * 2 * Math.PI;
    cx.beginPath();
    cx.arc(centerX, centerY, 100, currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;
    cx.fill();
});