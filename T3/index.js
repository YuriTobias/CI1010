const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let diffX,
    diffY,
    diffEX,
    diffEY,
    num,
    den,
    coefAng,
    coefLin,
    result,
    begin,
    end;

let tgt = [];

let line = {
    points: 0,
    coordX: [],
    coordY: [],
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.coordX[0], this.coordY[0]);
        for (let i = 1; i < this.points; i++) {
            ctx.lineTo(this.coordX[i], this.coordY[i]);
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
    document.getElementById("coordX").value = event.clientX;
    document.getElementById("coordY").value = event.clientY;
}

/* Moves the element */
function moveElem(event) {
    /* Differences between the mouse click and line axis */
    // diffX = event.clientX - line.coordX[tgt];
    // diffY = event.clientY - line.coordY[tgt];
    // diffEX = event.clientX - line.endX[tgt];
    // diffEY = event.clientY - line.endY[tgt];

    if (event.button == 0) {
        /* Checks if it's an end of the line
         If so, then moves the point or points belonging to that end */
        for (i in line.coordX) {
            if (
                event.clientX >= line.coordX[i] - 5 &&
                event.clientX <= line.coordX[i] + 7
            ) {
                if (
                    event.clientY >= line.coordY[i] - 5 &&
                    event.clientY <= line.coordY[i] + 5
                ) {
                    tgt.push(i);
                    canvas.addEventListener("mousemove", pointMover);
                }
            }
        }

        /* Checks if it's over some line */
        // if (tgt >= 0) {
        //     if (
        //         (event.clientY > line.coordY[tgt] + 5 &&
        //             event.clientY < line.endY[tgt] - 5) ||
        //         (event.clientY > line.endY[tgt] + 5 &&
        //             event.clientY < line.coordY[tgt] - 5) ||
        //         (event.clientX > line.coordX[tgt] + 5 &&
        //             event.clientX < line.endX[tgt] - 5) ||
        //         (event.clientX > line.endX[tgt] + 5 &&
        //             event.clientX < line.coordX[tgt] - 5)
        //     ) {
        //         console.log("metade");
        //         if (
        //             belongsToEquation(
        //                 event,
        //                 tgt,
        //                 line.coordX[tgt],
        //                 line.coordY[tgt],
        //                 line.endX[tgt],
        //                 line.endY[tgt]
        //             )
        //         ) {
        //             canvas.addEventListener("mousemove", mover);
        //         }
        //     }
        // }
    }

    // if (event.button == 2 && tgt >= 0) {
    //     console.log("tgt inside: " + tgt);
    //     begin = line.endX[tgt];
    //     end = line.endY[tgt];
    //     line.endX[tgt] = event.clientX;
    //     line.endY[tgt] = event.clientY;
    //     line.coordX.push(event.clientX);
    //     line.coordY.push(event.clientY);
    //     line.endX.push(begin);
    //     line.endY.push(end);
    //     line.draw();
    // }

    canvas.addEventListener("mouseup", dropper);
}

/* The function that change the values of the element's axis */
function mover(event) {
    console.log("tgt: " + tgt);
    clear();
    if (tgt == 0) {
        line.coordX[tgt] = event.clientX - diffX;
        line.coordY[tgt] = event.clientY - diffY;
    } else {
        line.endX[tgt - 1] = event.clientX - diffX;
        line.endY[tgt - 1] = event.clientY - diffY;
    }
    line.endX[tgt] = event.clientX - diffEX;
    line.endY[tgt] = event.clientY - diffEY;
    line.draw();
}

/* The function that change the values of the element's top axis */
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
    canvas.removeEventListener("mousemove", mover);
    canvas.removeEventListener("mousemove", pointMover);
    for (n in tgt) {
        tgt.pop();
    }
    tgt.pop();
}

/* Verifies if mouse is over the line */
function belongsToEquation(event, tgt, x1, y1, x2, y2) {
    if (y2 > y1) {
        num = y2 - y1;
        den = x2 - x1;
    } else {
        num = y1 - y2;
        den = x1 - x2;
    }

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

line.coordX.push(250);
line.coordY.push(100);
line.points++;
line.coordX.push(250);
line.coordY.push(400);
line.points++;
// line.coordX.push(300);
// line.coordY.push(400);
// line.points++;
// line.coordX.push(250);
// line.coordY.push(100);
// line.points++;
line.draw();
console.log(line.coordX);
console.log(line.coordY);
