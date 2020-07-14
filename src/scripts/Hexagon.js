export class Hexagon {

    constructor(x, y, size, canvas,paddingLeft,paddingTop) {
        let lineWidth = 2;
        this.size = size;
        this.canvas = canvas;
        this.value = false;
        this.domen = undefined;
        this.x = x;
        this.y = y;
        this.mainColor = '#000000';
        let x0 = x * (size * Math.sin(Math.PI / 3) * 2) + (1 + y % 2) * size * Math.sin(Math.PI / 3) + paddingLeft;
        let y0;
        if (y > 0) {
            y0 = y * (size + size * Math.cos(Math.PI / 3)) + paddingTop;
        } else {
            y0 = y * (size + size * Math.cos(Math.PI / 3) * 2) + paddingTop;
        }
        this.xc = x0;
        this.yc = y0 + (size * Math.cos(Math.PI / 3)) + size / 2;
        this.border = this.print(size, x0, y0, this.canvas, lineWidth);
        this.fill = this.print(size, x0, y0, this.canvas, lineWidth, 'fill');
        this.canvas.lineWidth = lineWidth;
        this.canvas.strokeStyle = this.mainColor;
        this.canvas.stroke(this.border.object);
    }

    changeValue() {
        if (!this.value) {
            this.canvas.font = `${this.size}px Arial`;
            this.canvas.fillText('1', this.xc - this.size * 0.3, this.yc + this.size * 0.35);
            this.value = true;
        } else {
            this.canvas.fillStyle = '#fff';
            this.canvas.fill(this.fill.object);
            this.canvas.strokeStyle = this.mainColor;
            this.canvas.stroke(this.border.object);
            this.canvas.clearRect(this.xc - this.size * 0.3, this.yc - this.size * 0.5, this.size * 0.5, this.size);
            this.value = false;
        }
    }

    print(size, x0, y0, lineWidth, type = 'stroke') {
        let hexagon = {object: new Path2D()};
        let coordinates = [];
        let xh, yh;
        if (type === 'fill') {
            y0 = y0 + lineWidth;
            size = size - lineWidth;
        }
        this.canvas.beginPath();
        this.canvas.moveTo(x0, y0);
        hexagon.object.lineTo(x0, y0);
        xh = x0;
        yh = y0;
        for (let side = 0; side < 6; side++) {
            coordinates.push({x: xh, y: yh});
            xh = xh + size * Math.sin(Math.PI / 3 - side * Math.PI / 3);
            yh = yh + size * Math.cos(Math.PI / 3 - side * Math.PI / 3);
            hexagon.object.lineTo(xh, yh);
        }
        this.canvas.lineWidth = 2;
        hexagon.coordinates = coordinates;
        return hexagon;
    }
}