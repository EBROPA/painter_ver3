const value = document.querySelector("#value")
const input = document.querySelector("#pi_input")

value.textContent = input.value

function widthOfPaint(event) {
    value.textContent = event.target.value;
    let paintWidthOfValue = parseInt(value.textContent);
    let x = event;
    console.log(paintWidthOfValue * 10);
    return x * paintWidthOfValue;
}

input.addEventListener("input", widthOfPaint, false);
