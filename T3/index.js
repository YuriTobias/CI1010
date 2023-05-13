var line = document.getElementById("line");
var ctx = line.getContext("2d");
ctx.strokeStyle = "red";
ctx.moveTo(250, 100);
ctx.lineTo(250, 400);
ctx.stroke();

function findMouseCursor(event) {
    document.getElementById("coordX").value = event.clientX;
    document.getElementById("coordY").value = event.clientY;
}
