export class Hexagon {
    constructor(x,y,size,canvas,) {

        this.value = false;
        let x0 = x * (size * Math.sin(Math.PI / 3) * 2) + size * Math.sin(Math.PI / 3) + 2,
            y0 = y * (size + size * Math.cos(Math.PI / 3) * 2) + 2;

        canvas.beginPath();
        canvas.moveTo(x0, y0);

        console.log('x0 ', x0, 'y0', y0);
        this.hexagon = new Path2D();
        this.hexagon.lineTo(x0, y0);

        let xh = x0;
        let yh = y0;
        this.coordinates = [];
        for (let side = 0; side < 6; side++) {
            this.coordinates.push({x: xh, y: yh});

            xh = xh + size * Math.sin(Math.PI / 3 - side * Math.PI / 3);
            yh = yh + size * Math.cos(Math.PI / 3 - side * Math.PI / 3);
            this.hexagon.lineTo(xh, yh);
            console.log(xh, yh);
        }
        canvas.lineWidth = 2;
        canvas.strokeStyle = '#ff0000';
        canvas.stroke(this.hexagon);
        canvas.fillStyle = '#ffffff';
        canvas.fill(this.hexagon);

        console.log(this.coordinates);
    }
    changeValue (canvas,color){
        if(!this.value){
            canvas.fillStyle = color;
            canvas.fill(this.hexagon);
            this.value = true;
        }else{
            canvas.fillStyle = '#ffffff';
            canvas.fill(this.hexagon);
            this.value = false;
        }
    }
}