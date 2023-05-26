const deleteButton = document.querySelector('.delete');
const paintButton = document.querySelector('.paint');
const sizeSlider = document.querySelector('#pi_input');
const colorPicker = document.querySelector('.color-picker');

document.addEventListener("touchstart", touchMovePhone, false);
document.addEventListener("touchmove", touchsStartPhone, false);

let x1 = null;
let y1 = null;
let acrZise = 10;

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let isMouseDown = false;
let coords = [];
let keshMemory = [];


colorPicker.addEventListener('input', function () {
    const color = colorPicker.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineWidth = 20;

sizeSlider.addEventListener('change', () => ctx.lineWidth = (sizeSlider.value * 4));
sizeSlider.addEventListener('change', () => acrZise = (sizeSlider.value * 2));

canvas.addEventListener("mousedown", function (event) {
    if (event.button == 0) {
        isMouseDown = true;
        keshMemory = [];
        console.log('mouse is down')
    }
});

canvas.addEventListener("mouseup", function () {
    isMouseDown = false;
    ctx.beginPath();
    keshMemory.push('mouseup');
    coords.push('mouseup');
    console.log('mouse is up')
});

function mousePaint(item) {
    if (isMouseDown) {
        coords.push([item.clientX, item.clientY]);
        keshMemory.push([item.clientX, item.clientY]);

        const color = colorPicker.value;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        ctx.lineTo(item.clientX, item.clientY - 45.6);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(item.clientX, item.clientY - 45.6, acrZise, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(item.clientX, item.clientY - 45.6);

        console.log(keshMemory);
    }
}

function mouseDelete(item) {
    if (isMouseDown) {

        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';

        ctx.lineTo(item.clientX, item.clientY - 45.6);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(item.clientX, item.clientY - 45.6, acrZise, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(item.clientX, item.clientY - 45.6);
    }
}

function delete1() {
    canvas.addEventListener("mousemove", mouseDelete, false);
    canvas.removeEventListener("mousemove", mousePaint, false);
}

function paint1() {
    canvas.addEventListener("mousemove", mousePaint, false);
    canvas.removeEventListener("mousemove", mouseDelete, false);
}

deleteButton.addEventListener('click', delete1, false);
paintButton.addEventListener('click', paint1, false);

function clearPaint() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = "black";
}

function savePaint() {
    localStorage.setItem("coords", JSON.stringify(coords));
}

function replyPaint() {
    let timer = setInterval(function (event) {
        if (!coords.length) {
            clearInterval(timer);
            ctx.beginPath();
            return;
        }

        let crd = coords.shift();
        let item = {
            clientX: crd['0'],
            clientY: crd['1']
        };

        ctx.lineTo(item.clientX, item.clientY - 45.6);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(item.clientX, item.clientY - 45.6, acrZise, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(item.clientX, item.clientY - 45.6);

    }, -100);
}

function deleteTheDraw() {
    let timeToWork = setInterval(function (event) {
        if (!keshMemory.length) {
            clearInterval(timeToWork);
            ctx.beginPath();
            return;
        }

        let crdForKesh = keshMemory.shift();
        let item = {
            clientX: crdForKesh['0'],
            clientY: crdForKesh['1']
        };

        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";

        ctx.lineTo(item.clientX, item.clientY - 45.6);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(item.clientX, item.clientY - 45.6, acrZise, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(item.clientX, item.clientY - 45.6);
    }, 10);

}


document.addEventListener("keydown", function (event) {
    console.log(event.code);

    if (event.code == "KeyS") {
        savePaint();
    }

    if (event.code == "KeyR") {
        coords = JSON.parse(localStorage.getItem("coords"));

        clearPaint();
        replyPaint();
    }

    if (event.code == "KeyC") {
        clearPaint();
    }

    if (event.code == "KeyB") {
        deleteTheDraw();
    }
});