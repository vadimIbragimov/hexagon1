export class Hexagon {
    constructor(x,y,size,canvas,) {
        let paddingLeft = 2;
        let paddingTop = 2;
        let lineWidth = 2;
        this.size = size;

        this.value = false;
        let x0 = x * (size * Math.sin(Math.PI / 3) * 2) + (1+y%2)*size * Math.sin(Math.PI / 3) + paddingLeft;
        let y0;

        if(y>0){
            y0 = y*(size + size * Math.cos(Math.PI / 3)) + paddingTop;
        } else {
            y0 = y * (size + size * Math.cos(Math.PI / 3) * 2) + paddingTop;
        }

        this.xc = x0;
        this.yc = y0+(size * Math.cos(Math.PI / 3))+size/2;

        this.border = this.print(size,x0,y0,canvas,lineWidth);
        this.fill = this.print(size,x0,y0,canvas,lineWidth, 'fill');

        canvas.lineWidth = lineWidth;
        canvas.strokeStyle = '#000000';
        canvas.stroke(this.border.object);
        //canvas.fillStyle = '#ffffff';
        //canvas.fill(this.hexagon);

        //console.log(this.coordinates);
    }
    changeValue (canvas,color){
        if(!this.value){
            /*canvas.fillStyle = color;
            canvas.fill(this.fill.object);*/
            canvas.font = `${this.size}px Arial`;
            canvas.fillText('1',this.xc-this.size*0.3,this.yc+this.size*0.35);
            console.log('print 1');
            this.value = true;
        }else{
            canvas.clearRect(this.xc-this.size*0.3,this.yc-this.size*0.5,this.size*0.5,this.size);
            /*canvas.fillStyle = '#ffffff';
            canvas.fill(this.fill.object);*/
            this.value = false;
        }
    }

    print(size,x0,y0,canvas,lineWidth,type = 'stroke'){
        let hexagon = {object: new Path2D()};
        if(type === 'fill'){
            y0 = y0 + lineWidth;
            size = size - lineWidth;
        }

        canvas.beginPath();
        canvas.moveTo(x0, y0);

        console.log('x0 ', x0, 'y0', y0);
        hexagon.object.lineTo(x0, y0);

        let xh = x0;
        let yh = y0;
        let coordinates = [];
        for (let side = 0; side < 6; side++) {
            coordinates.push({x: xh, y: yh});

            xh = xh + size * Math.sin(Math.PI / 3 - side * Math.PI / 3);
            yh = yh + size * Math.cos(Math.PI / 3 - side * Math.PI / 3);
            hexagon.object.lineTo(xh, yh);
            console.log(xh, yh);
        }
        canvas.lineWidth = 2;
        hexagon.coordinates = coordinates;
        return hexagon;
    }
}