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

/* Moves the element: can be both the line or some point */
function moveElem(event) {
    /* Left button */
    if (event.button == 0) {
        /* Checks if it's an end of the line
         If so, then moves the point or points belonging to that end */
        for (i = 0; i < line.points; i++) {
            if (distanceBwTwoPoints(event.clientX, event.clientY, line.coordX[i], line.coordY[i]) <= 5 && tgt == 0) {
                tgt.push(i);
                canvas.addEventListener("mousemove", pointMover);
                canvas.addEventListener("mouseup", dropper);
            }
        }

        /* Checks if it's over some line */
        for (i = 0; i < line.points - 1; i++) {
            if (
                distanceBwPointLine(event.clientX, event.clientY, line.coordX[i], line.coordY[i], line.coordX[i + 1], line.coordY[i + 1]) <=
                    10 &&
                distanceBwTwoPoints(event.clientX, event.clientY, line.coordX[i], line.coordY[i]) > 5 &&
                distanceBwTwoPoints(event.clientX, event.clientY, line.coordX[i + 1], line.coordY[i + 1]) > 5 &&
                tgt == 0
            ) {
                tgt.push(i);
                tgt.push(i + 1);

                /* Differences between the mouse click and line end axes */
                diffX0 = event.clientX - line.coordX[tgt[0]];
                diffY0 = event.clientY - line.coordY[tgt[0]];
                diffX1 = event.clientX - line.coordX[tgt[1]];
                diffY1 = event.clientY - line.coordY[tgt[1]];
                canvas.addEventListener("mousemove", lineMover);
                canvas.addEventListener("mouseup", dropper);
            }
        }
    }

    /* Right button */
    if (event.button == 2) {
        for (i = 0; i < line.points - 1; i++) {
            if (
                distanceBwPointLine(event.clientX, event.clientY, line.coordX[i], line.coordY[i], line.coordX[i + 1], line.coordY[i + 1]) <=
                    10 &&
                distanceBwTwoPoints(event.clientX, event.clientY, line.coordX[i], line.coordY[i]) > 5 &&
                distanceBwTwoPoints(event.clientX, event.clientY, line.coordX[i + 1], line.coordY[i + 1]) > 5
            ) {
                line.coordX.splice(i + 1, 0, event.clientX);
                line.coordY.splice(i + 1, 0, event.clientY);
                line.points++;
                line.draw();
            }
        }
    }

    canvas.addEventListener("mouseup", dropper);
}

/* The function that moves some line */
function lineMover(event) {
    clear();
    if (
        tgt[0] === 0 &&
        line.coordX[line.coordX.length - 1] === line.coordX[tgt[0]] &&
        line.coordY[line.coordY.length - 1] === line.coordY[tgt[0]]
    ) {
        line.coordX[tgt[0]] = event.clientX - diffX0;
        line.coordY[tgt[0]] = event.clientY - diffY0;
        line.coordX[tgt[1]] = event.clientX - diffX1;
        line.coordY[tgt[1]] = event.clientY - diffY1;
        line.coordX[line.coordX.length - 1] = line.coordX[tgt[0]];
        line.coordY[line.coordY.length - 1] = line.coordY[tgt[0]];
    } else if (tgt[1] === line.points - 1 && line.coordX[0] === line.coordX[tgt[1]] && line.coordY[0] === line.coordY[tgt[1]]) {
        line.coordX[tgt[0]] = event.clientX - diffX0;
        line.coordY[tgt[0]] = event.clientY - diffY0;
        line.coordX[tgt[1]] = event.clientX - diffX1;
        line.coordY[tgt[1]] = event.clientY - diffY1;
        line.coordX[0] = line.coordX[tgt[1]];
        line.coordY[0] = line.coordY[tgt[1]];
    } else {
        line.coordX[tgt[0]] = event.clientX - diffX0;
        line.coordY[tgt[0]] = event.clientY - diffY0;
        line.coordX[tgt[1]] = event.clientX - diffX1;
        line.coordY[tgt[1]] = event.clientY - diffY1;
    }
    line.draw();
}

/* The function that changes the values of an element tip */
function pointMover(event) {
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
    canvas.removeEventListener("mousemove", lineMover);
    canvas.removeEventListener("mousemove", pointMover);
    for (i = 0; i < tgt.length; i++) {
        tgt.pop();
    }
    tgt.pop();
}

/* Outside function used to calculate the distance between a point and a line */
function distanceBwPointLine(x, y, x1, y1, x2, y2) {
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

/* Function used to calculate the distance between two points */
function distanceBwTwoPoints(x, y, x1, y1) {
    return Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
}

/* Function that draws a single line */
function drawLine() {
    let x = [250, 250];
    let y = [100, 400];
    for (i in x) {
        line.coordX.push(x[i]);
        line.coordY.push(y[i]);
        line.points++;
    }
    line.draw();
}

/* Function that draws a single triangle */
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

/* Function that draws a single square */
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

/* Function that draws a single pentagon */
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

/* Function that draws a single hexagon */
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

/* Function that draws a single heptagon */
function drawHeptagon() {
    let x = [250, 400, 430, 320, 180, 70, 100, 250];
    let y = [100, 180, 310, 400, 400, 310, 180, 100];
    for (i in x) {
        line.coordX.push(x[i]);
        line.coordY.push(y[i]);
        line.points++;
    }
    line.draw();
}

/* Function that draws a single octogon */
function drawOctogon() {
    let x = [390, 323, 250, 178, 110, 178, 250, 323, 390];
    let y = [250, 298, 327, 298, 250, 203, 174, 203, 250];
    for (i in x) {
        line.coordX.push(x[i]);
        line.coordY.push(y[i]);
        line.points++;
    }
    line.draw();
}

/* Function that checks the input value to show the correct draw */
function checkInput(event) {
    event.preventDefault();
    let answer = document.getElementById("inputValue");

    switch (+answer.value) {
        case 3:
            clear();
            line.coordX = [];
            line.coordY = [];
            line.points = 0;
            drawTriangle();
            break;
        case 4:
            clear();
            line.coordX = [];
            line.coordY = [];
            line.points = 0;
            drawSquare();
            break;
        case 5:
            clear();
            line.coordX = [];
            line.coordY = [];
            line.points = 0;
            drawPentagon();
            break;
        case 6:
            clear();
            line.coordX = [];
            line.coordY = [];
            line.points = 0;
            drawHexagon();
            break;
        case 7:
            clear();
            line.coordX = [];
            line.coordY = [];
            line.points = 0;
            drawHeptagon();
            break;
        case 8:
            clear();
            line.coordX = [];
            line.coordY = [];
            line.points = 0;
            drawOctogon();
            break;
        default:
            break;
    }
}

drawLine();
