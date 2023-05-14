const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let diffX, diffY, diffEX, diffEY;

const line = {
    height: 300,
    coordX: 250,
    coordY: 100,
    endX: 250,
    endY: 400,
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.coordX, this.coordY);
        ctx.lineTo(this.endX, this.endY);
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
    diffX = event.clientX - line.coordX;
    diffY = event.clientY - line.coordY;
    diffEX = event.clientX - line.endX;
    diffEY = event.clientY - line.endY;

    /* If it's half the line */
    if (diffX >= (line.endX - line.coordX) / 2 - 5 && diffX <= (line.endX - line.coordX) / 2 + 7) {
        if (diffY >= line.height / 2 - 5 && diffY <= line.height / 2 + 5) {
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
    canvas.addEventListener("mouseup", dropper);
}

/* The function that change the values of the element's axis */
function mover(event) {
    clear();
    line.coordX = event.clientX - diffX;
    line.coordY = event.clientY - diffY;
    line.endX = event.clientX - diffEX;
    line.endY = event.clientY - diffEY;
    line.height = line.endY - line.coordY;
    line.draw();
}

/* The function that change the values of the element's top axis */
function topTipMover(event) {
    clear();
    line.coordX = event.clientX - diffX;
    line.coordY = event.clientY - diffY;
    line.height = line.endY - line.coordY;
    line.draw();
}

/* The function that change the values of the element's bottom axis */
function botTipMover(event) {
    clear();
    line.endX = event.clientX - diffEX;
    line.endY = event.clientY - diffEY;
    line.height = line.endY - line.coordY;
    line.draw();
}

/* Function that end the movement */
function dropper(event) {
    canvas.removeEventListener("mouseup", dropper);
    canvas.removeEventListener("mousemove", mover);
    canvas.removeEventListener("mousemove", topTipMover);
    canvas.removeEventListener("mousemove", botTipMover);
}

line.draw();
