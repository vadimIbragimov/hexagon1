import {Hexagon} from "./Hexagon.js";

let area = document.getElementById('area');
let canvas = area.getContext('2d');
let l = 3;
let m = 5;
let n = 7;

const size = 20;

let hexagons = [];

for(let i = l;i>0;i--){

}
hexagons.push(new Hexagon(0,0,size,canvas));
hexagons.push(new Hexagon(1,0,size,canvas));
hexagons.push(new Hexagon(0,1,size,canvas));
hexagons.push(new Hexagon(1,3,size,canvas));
hexagons.push(new Hexagon(3,2,size,canvas));
let checkCoordinates = (x, y, c) => {
    let ret = true;
    for(let i=0;i<c.length;i++){
        let k;
        if(i<c.length-1){k=i+1}else{k=0}
        let xh = (y - c[i].y) * (c[k].x - c[i].x) / (c[k].y - c[i].y) + c[i].x;
        let yh = (x - c[i].x) * (c[k].y - c[i].y) / (c[k].x - c[i].x) + c[i].y;
        console.log('i-', i, 'x-', x, 'y-', y, 'k-', k, 'zh-', xh, 'yh-', yh);
        if (
            !(i >= 0 && x < xh && i < 3 || i >= 3 && x > xh && i <= c.length - 1) &&
            !((i === 5 || i === 0) && y > yh || ((i === 2 || y === 3) && y < yh))
        ) {
            ret = false;
            break;
        }

    }
    return ret;
};

area.addEventListener('click', e => {
    for(let hg of hexagons){
        console.log(hg);
        if(checkCoordinates(e.layerX, e.layerY, hg.border.coordinates)){
            hg.changeValue(canvas,'#5268ff');
            break;
        }
        //console.log(hg.coordinates);
    }
    //console.log(checkCoordinates(e.layerX, e.layerY));
});
console.log(hexagons)


