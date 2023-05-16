const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let diffX, diffY, diffEX, diffEY, tgt, num, den, coefAng, coefLin, result, begin, end;

let line = {
    startX: [],
    startY: [],
    endX: [],
    endY: [],
    draw() {
        ctx.beginPath();
        for (i in this.startX) {
            ctx.moveTo(this.startX[i], this.startY[i]);
            ctx.lineTo(this.endX[i], this.endY[i]);
        }
        ctx.lineWidth = 3;
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
    document.getElementById("startX").value = event.clientX;
    document.getElementById("startY").value = event.clientY;
}

/* Moves the element */
function moveElem(event) {
    /* Gets the target line */
    for (i in line.startX) {
        console.log("entrei");
        if (
            (event.clientX >= line.startX[i] - 5 && event.clientX <= line.endX[i] + 7) ||
            (event.clientX >= line.endX[i] - 7 && event.clientX <= line.startX[i] + 5)
        ) {
            if (
                (event.clientY >= line.startY[i] - 5 && event.clientY <= line.endY[i] + 5) ||
                (event.clientY >= line.endY[i] - 5 && event.clientY <= line.startY[i] + 5)
            ) {
                console.log(i);
                tgt = i;
            }
        }
    }

    /* Differences between the mouse click and line axis */
    diffX = event.clientX - line.startX[tgt];
    diffY = event.clientY - line.startY[tgt];
    diffEX = event.clientX - line.endX[tgt];
    diffEY = event.clientY - line.endY[tgt];

    if (event.button == 0) {
        /* If it's the top end of the line */
        if (event.clientX >= line.startX[tgt] - 5 && event.clientX <= line.startX[tgt] + 7) {
            if (event.clientY >= line.startY[tgt] - 5 && event.clientY <= line.startY[tgt] + 5) {
                console.log("ponta superior");
                canvas.addEventListener("mousemove", topTipMover);
            }
        }

        /* If it's the bottom end of the line */
        if (event.clientX >= line.endX[tgt] - 5 && event.clientX <= line.endX[tgt] + 7) {
            if (event.clientY >= line.endY[tgt] - 5 && event.clientY <= line.endY[tgt] + 5) {
                console.log("ponta inferior");
                canvas.addEventListener("mousemove", botTipMover);
            }
        }

        /* If it's half the line */
        if (tgt >= 0) {
            if (
                (event.clientY > line.startY[tgt] + 5 && event.clientY < line.endY[tgt] - 5) ||
                (event.clientY > line.endY[tgt] + 5 && event.clientY < line.startY[tgt] - 5) ||
                (event.clientX > line.startX[tgt] + 5 && event.clientX < line.endX[tgt] - 5) ||
                (event.clientX > line.endX[tgt] + 5 && event.clientX < line.startX[tgt] - 5)
            ) {
                console.log("metade");
                if (belongsToEquation(event, tgt, line.startX[tgt], line.startY[tgt], line.endX[tgt], line.endY[tgt])) {
                    canvas.addEventListener("mousemove", mover);
                }
            }
        }
    }

    if (event.button == 2 && tgt >= 0) {
        console.log("tgt inside: " + tgt);
        begin = line.endX[tgt];
        end = line.endY[tgt];
        line.endX[tgt] = event.clientX;
        line.endY[tgt] = event.clientY;
        line.startX.push(event.clientX);
        line.startY.push(event.clientY);
        line.endX.push(begin);
        line.endY.push(end);
        line.draw();
    }

    canvas.addEventListener("mouseup", dropper);
}

/* The function that change the values of the element's axis */
function mover(event) {
    console.log("tgt: " + tgt);
    clear();
    if (tgt == 0) {
        line.startX[tgt] = event.clientX - diffX;
        line.startY[tgt] = event.clientY - diffY;
    } else {
        line.endX[tgt - 1] = event.clientX - diffX;
        line.endY[tgt - 1] = event.clientY - diffY;
    }
    line.endX[tgt] = event.clientX - diffEX;
    line.endY[tgt] = event.clientY - diffEY;
    line.draw();
}

/* The function that change the values of the element's top axis */
function topTipMover(event) {
    clear();
    line.startX[tgt] = event.clientX - diffX;
    line.startY[tgt] = event.clientY - diffY;
    line.draw();
}

/* The function that change the values of the element's bottom axis */
function botTipMover(event) {
    clear();
    line.endX[tgt] = event.clientX - diffEX;
    line.endY[tgt] = event.clientY - diffEY;
    line.draw();
}

/* Function that end the movement */
function dropper(event) {
    canvas.removeEventListener("mouseup", dropper);
    canvas.removeEventListener("mousemove", mover);
    canvas.removeEventListener("mousemove", topTipMover);
    canvas.removeEventListener("mousemove", botTipMover);
}

/* Verifies if mouse is over the line */
function belongsToEquation(event, tgt, x1, y1, x2, y2) {
    num = y2 - y1;
    den = x2 - x1;
    coefAng = num / den;
    coefLin = y1 - coefAng * x1;

    if (coefAng == Infinity) {
        if (diffX >= -5 && diffX <= 7) {
            return true;
        }
    }

    console.log("coefLin: " + coefLin);
    if (coefAng != Infinity && coefLin != Infinity) {
        result = Math.trunc(coefAng * event.clientX + coefLin);
        if (result >= event.clientY - 5 && result <= event.clientY + 5) {
            return true;
        }
    }

    return false;
}

line.startX.push(250);
line.startY.push(100);
line.endX.push(250);
line.endY.push(400);
line.draw();
