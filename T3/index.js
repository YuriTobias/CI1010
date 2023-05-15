const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let diffX, diffY, diffEX, diffEY, tgt;

let line = {
    height: [],
    coordX: [],
    coordY: [],
    endX: [],
    endY: [],
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.coordX[0], this.coordY[0]);
        for (i in this.height) {
            ctx.lineTo(this.endX[i], this.endY[i]);
        }
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
    },
};

line.height.push(300);
line.coordX.push(250);
line.coordY.push(100);
line.endX.push(250);
line.endY.push(400);
line.draw();

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
    for (i in line.height) {
        if (event.clientX >= line.coordX[i] && event.clientX <= line.endX[i] + 2) {
            if (event.clientY >= line.coordY[i] && event.clientY <= line.endY[i]) {
                console.log(i);
                tgt = i;
            }
        }
    }

    /* Differences between the mouse click and line axis */
    diffX = event.clientX - line.coordX[tgt];
    diffY = event.clientY - line.coordY[tgt];
    diffEX = event.clientX - line.endX[tgt];
    diffEY = event.clientY - line.endY[tgt];

    console.log((line.endX[tgt] - line.coordX[tgt]) / 2 - 5);
    console.log((line.endX[tgt] - line.coordX[tgt]) / 2 + 7);
    console.log(diffX);
    console.log(line.height[tgt] / 2 - 5);
    console.log(line.height[tgt] / 2 + 5);
    console.log(diffY);

    if (event.button == 0) {
        /* If it's half the line */
        if (diffX >= (line.endX[tgt] - line.coordX[tgt]) / 2 - 5 && diffX <= (line.endX[tgt] - line.coordX[tgt]) / 2 + 7) {
            console.log("Ola");
            if (diffY >= line.height[tgt] / 2 - 5 && diffY <= line.height[tgt] / 2 + 5) {
                canvas.addEventListener("mousemove", mover);
            }
        }

        /* If it's the top end of the line */
        if (diffX >= -5 && diffX <= 5) {
            if (diffY >= -5 && diffY <= 5) {
                canvas.addEventListener("mousemove", topTipMover);
            }
        }

        /* If it's the bottom end of the line */
        if (diffEX >= -5 && diffEX <= 5) {
            if (diffEY >= -5 && diffEY <= 5) {
                canvas.addEventListener("mousemove", botTipMover);
            }
        }
    }

    if (event.button == 2) {
        line.height[tgt] = line.height[tgt] / 2;
        line.endY[tgt] = line.endY[tgt] - line.height[tgt];
        line.height.push(line.height[tgt]);
        line.coordX.push(line.coordX[tgt]);
        line.coordY.push(line.endY[tgt]);
        line.endX.push(line.endX[tgt]);
        line.endY.push(line.endY[tgt] + line.height[tgt]);
        line.draw();
    }

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
    line.height[tgt] = line.endY[tgt] - line.coordY[tgt];
    line.draw();
}

/* The function that change the values of the element's top axis */
function topTipMover(event) {
    clear();
    line.coordX[tgt] = event.clientX - diffX;
    line.coordY[tgt] = event.clientY - diffY;
    line.height[tgt] = line.endY[tgt] - line.coordY[tgt];
    line.draw();
}

/* The function that change the values of the element's bottom axis */
function botTipMover(event) {
    clear();
    line.endX[tgt] = event.clientX - diffEX;
    line.endY[tgt] = event.clientY - diffEY;
    line.height[tgt] = line.endY[tgt] - line.coordY[tgt];
    line.draw();
}

/* Function that end the movement */
function dropper(event) {
    canvas.removeEventListener("mouseup", dropper);
    canvas.removeEventListener("mousemove", mover);
    canvas.removeEventListener("mousemove", topTipMover);
    canvas.removeEventListener("mousemove", botTipMover);
}
