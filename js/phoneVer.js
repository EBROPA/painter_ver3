function touchMovePhone(event) {
    console.log(event);
    x1 = event.touches[0].clientX;
    y1 = event.touches[0].clientY - 36.7;

    ctx.lineTo(event.touches[0].clientX, event.touches[0].clientY - 36.7);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x1, y1, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(event.touches[0].clientX, event.touches[0].clientY - 36.7);
}

function touchsStartPhone(event) {
    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY - 36.7;

    ctx.lineTo(event.touches[0].clientX, event.touches[0].clientY - 36.7);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x2, y2, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(event.touches[0].clientX, event.touches[0].clientY - 36.7);
}