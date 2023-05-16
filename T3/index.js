const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let diffX0, diffY0, diffX1, diffY1;
let tgt = [];

let line = {
    points: 0,
    coordX: [],
    coordY: [],
    draw() {
        ctx.beginPath();
        ctx.lineJoin = "miter";
        ctx.lineWidth = 3;
        ctx.moveTo(this.coordX[0], this.coordY[0]);
        for (let i = 1; i < this.points; i++) {
            ctx.lineTo(this.coordX[i], this.coordY[i]);
        }
        ctx.stroke();
        ctx.closePath();
    },
};

/* Clean the screen */
function clear() {
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* Get the mouse cursor */
function findMouseCursor(event) {
    document.getElementById("coordX").value = event.clientX;
    document.getElementById("coordY").value = event.clientY;
}

/* Moves the element */
function moveElem(event) {
    if (event.button == 0) {
        /* Checks if it's an end of the line
         If so, then moves the point or points belonging to that end */
        for (i = 0; i < line.points; i++) {
            if (
                distanceBwTwoPoints(
                    event.clientX,
                    event.clientY,
                    line.coordX[i],
                    line.coordY[i]
                ) <= 5 &&
                tgt == 0
            ) {
                tgt.push(i);
                canvas.addEventListener("mousemove", pointMover);
                canvas.addEventListener("mouseup", dropper);
            }
        }

        /* Checks if it's over some line */
        for (i = 0; i < line.points - 1; i++) {
            if (
                pDistance(
                    event.clientX,
                    event.clientY,
                    line.coordX[i],
                    line.coordY[i],
                    line.coordX[i + 1],
                    line.coordY[i + 1]
                ) <= 10 &&
                distanceBwTwoPoints(
                    event.clientX,
                    event.clientY,
                    line.coordX[i],
                    line.coordY[i]
                ) > 5 &&
                distanceBwTwoPoints(
                    event.clientX,
                    event.clientY,
                    line.coordX[i + 1],
                    line.coordY[i + 1]
                ) > 5 &&
                tgt == 0
            ) {
                tgt.push(i);
                tgt.push(i + 1);

                /* Differences between the mouse click and line axis */
                diffX0 = event.clientX - line.coordX[tgt[0]];
                diffY0 = event.clientY - line.coordY[tgt[0]];
                diffX1 = event.clientX - line.coordX[tgt[1]];
                diffY1 = event.clientY - line.coordY[tgt[1]];
                canvas.addEventListener("mousemove", midMover);
                canvas.addEventListener("mouseup", dropper);
            }
        }
    }

    // if (event.button == 2 && tgt >= 0) {
    //     console.log("tgt inside: " + line.draw();tgt);
    //     begin = line.endX[tgt];
    //     end = line.endY[tgt];
    //     line.endX[tgt] = event.clientX;
    //     line.endY[tgt] = event.cldiffX0 = event.clientX - line.coordX[tgt[0]];
    //     line.coordX.push(event.clientX);
    //     line.coordY.push(event.clientY);
    //     line.endX.push(begin);
    //     line.endY.push(end);
    //     line.draw();
    // }

    canvas.addEventListener("mouseup", dropper);
}

/* The function that change the values of the element's axis */
function midMover(event) {
    clear();
    line.coordX[tgt[0]] = event.clientX - diffX0;
    line.coordY[tgt[0]] = event.clientY - diffY0;
    line.coordX[tgt[1]] = event.clientX - diffX1;
    line.coordY[tgt[1]] = event.clientY - diffY1;
    if (tgt[0] == 0 && line.points > 3) {
        console.log("Entrei no troço");
        line.coordX[line.coordX.length - 1] = line.coordX[tgt[0]];
        line.coordY[line.coordY.length - 1] = line.coordY[tgt[0]];
    } else if (tgt[1] == line.points - 1 && line.points > 3) {
        console.log("Entrei no troço 2");
        line.coordX[0] = line.coordX[tgt[1]];
        line.coordY[0] = line.coordY[tgt[1]];
    }
    line.draw();
}

/* The function that change the values of the element's top axis */
function pointMover(event) {
    console.log("Entrei no point mover " + tgt);
    clear();
    if (tgt.length == 2) {
        line.coordX[tgt[0]] = event.clientX;
        line.coordY[tgt[0]] = event.clientY;
        line.coordX[tgt[1]] = event.clientX;
        line.coordY[tgt[1]] = event.clientY;
    }
    if (tgt.length == 1) {
        line.coordX[tgt[0]] = event.clientX;
        line.coordY[tgt[0]] = event.clientY;
    }
    line.draw();
}

/* Function that end the movement */
function dropper(event) {
    canvas.removeEventListener("mouseup", dropper);
    canvas.removeEventListener("mousemove", midMover);
    canvas.removeEventListener("mousemove", pointMover);
    for (i = 0; i < tgt.length; i++) {
        tgt.pop();
    }
    tgt.pop();
}

function pDistance(x, y, x1, y1, x2, y2) {
    var A = x - x1;
    var B = y - y1;
    var C = x2 - x1;
    var D = y2 - y1;

    var dot = A * C + B * D;
    var len_sq = C * C + D * D;
    var param = -1;
    if (len_sq != 0)
        //in case of 0 length line
        param = dot / len_sq;

    var xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    var dx = x - xx;
    var dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
}

function distanceBwTwoPoints(x, y, x1, y1) {
    return Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
}

function drawTriangle() {
    let x = [250, 150, 350, 250];
    let y = [100, 300, 300, 100];
    for (i in x) {
        line.coordX.push(x[i]);
        line.coordY.push(y[i]);
        line.points++;
    }
    line.draw();
}

function drawSquare() {
    let x = [100, 100, 400, 400, 100];
    let y = [100, 400, 400, 100, 100];
    for (i in x) {
        line.coordX.push(x[i]);
        line.coordY.push(y[i]);
        line.points++;
    }
    line.draw();
}

function drawPentagon() {
    let x = [250, 100, 175, 325, 400, 250];
    let y = [100, 225, 400, 400, 225, 100];
    for (i in x) {
        line.coordX.push(x[i]);
        line.coordY.push(y[i]);
        line.points++;
    }
    line.draw();
}

function drawHexagon() {
    let x = [150, 350, 400, 350, 150, 100, 150];
    let y = [100, 100, 250, 400, 400, 250, 100];
    for (i in x) {
        line.coordX.push(x[i]);
        line.coordY.push(y[i]);
        line.points++;
    }
    line.draw();
}

function drawHeptagon() {
    let x = [250, 347, 400, 347, 250, 154, 100, 250];
    let y = [400, 347, 250, 154, 100, 154, 250, 400];
    for (i in x) {
        line.coordX.push(x[i]);
        line.coordY.push(y[i]);
        line.points++;
    }
    line.draw();
}

function drawOctogon() {
    let x = [250, 150, 350, 250];
    let y = [100, 300, 300, 100];
    for (i in x) {
        line.coordX.push(x[i]);
        line.coordY.push(y[i]);
        line.points++;
    }
    line.draw();
}

// line.coordX.push(250);
// line.coordY.push(100);
// line.points++;
// line.coordX.push(250);
// line.coordY.push(400);
// line.points++;
// line.coordX.push(300);
// line.coordY.push(400);
// line.points++;
// line.coordX.push(250);
// line.coordY.push(100);
// line.points++;
// line.draw();
