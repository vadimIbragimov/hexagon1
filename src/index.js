let canvas = document.querySelector('#area').getContext('2d'),
    size = 20,
    x = 0,
    y = 0,
    xr = x * (size * Math.sin(Math.PI / 3) * 2) + size * Math.sin(Math.PI / 3),
    yr = y * (size + size * Math.cos(Math.PI / 3) * 2);

canvas.beginPath();
canvas.moveTo(xr, yr);
console.log(xr, yr)
let hexagon = new Path2D();

let xx = xr;
let yy = yr;
for (let side = 1; side < 5; side++) {
    xx = xx + size * Math.sin(side * Math.PI / 3);
    yy = yy + size * Math.cos(side * Math.PI / 3);
    hexagon.lineTo(xx, yy);
    console.log(xx, yy);
}

canvas.stroke(hexagon);
setTimeout(() => canvas.fill(hexagon), 2000);


