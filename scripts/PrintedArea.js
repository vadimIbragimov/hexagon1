import {Hexagon} from "./Hexagon.js";
import {getRandomInt} from "./getRandomInt.js";
import {Sequence} from "./Sequence.js";

export class PrintedArea {
    constructor(sizes) {
        const size = 30;
        let printedArea = this;
        let paddingLeft = 2;
        let paddingTop = 2;
        let printedAreaDiv = document.getElementById('printedArea');
        let menu = document.getElementById('menu');
        menu.removeAttribute('hidden');
        let area;
        printedAreaDiv.childNodes?.forEach(n=>{n.remove()});
        area = document.createElement('canvas');
        area.setAttribute('style', 'margin: 10px;');
        area.setAttribute(
            'height',
            size * (sizes.l + sizes.m - 1) + (sizes.l + sizes.m) * size * Math.cos(Math.PI / 3) +
            paddingTop + 1
        );
        area.setAttribute(
            'width',
            size * Math.sin(Math.PI / 3) *
            ((sizes.n + Math.min(sizes.l, sizes.m) - 1) * 2 + Math.max(sizes.l, sizes.m) - Math.min(sizes.l, sizes.m)+1) +
            paddingLeft + 2
        );
        printedAreaDiv.append(area);
        this.canvas = area.getContext('2d');
        this.hexagons = [];
        this.printAll(sizes.l, sizes.m, sizes.n, size, paddingLeft, paddingTop);
        area.addEventListener('click', e => {
            for (let hg of this.hexagons) {
                if (printedArea.checkCoordinates(e.layerX, e.layerY, hg.border.coordinates)) {
                    hg.changeValue();
                    break;
                }
            }
        });
    }

    checkCoordinates(x, y, c) {
        let ret = true;
        for (let i = 0; i < c.length; i++) {
            let k;
            if (i < c.length - 1) {
                k = i + 1
            } else {
                k = 0
            }
            let xh = (y - c[i].y) * (c[k].x - c[i].x) / (c[k].y - c[i].y) + c[i].x;
            let yh = (x - c[i].x) * (c[k].y - c[i].y) / (c[k].x - c[i].x) + c[i].y;
            if (
                !(i >= 0 && x < xh && i < 3 || i >= 3 && x > xh && i <= c.length - 1) &&
                !((i === 5 || i === 0) && y > yh || ((i === 2 || y === 3) && y < yh))
            ) {
                ret = false;
                break;
            }

        }
        return ret;
    }

    printAll(l, m, n, size, paddingLeft, paddingTop) {
        let xStart = Math.floor(l / 2);
        let xEnd = n + xStart;
        for (let i = 0; i < l + m - 1; i++) {
            for (let j = xStart; j < xEnd; j++) {
                this.hexagons.push(new Hexagon(j, i, size, this.canvas, paddingLeft, paddingTop));
            }
            if (l <= m) {
                if (i < l - 1) {
                    if (i % 2 === 0) {
                        xStart--;
                    } else {
                        xEnd++;
                    }
                } else {
                    if (i % 2 === 1) {
                        xStart++;
                        if (i < m - 1) {
                            xEnd++;
                        }
                    } else {
                        if (i >= m - 1) {
                            xEnd--;
                        }
                    }
                }
            } else {
                if (i < l - 1) {
                    if (i % 2 === 0) {
                        xStart--;
                        if (i >= m - 1) {
                            xEnd--;
                        }
                    } else {
                        if (i < m - 1) {
                            xEnd++;
                        }
                    }
                } else {
                    if (i % 2 === 1) {
                        xStart++;
                    } else {
                        xEnd--;
                    }
                }
            }
        }
    }

    findDomens(callback) {
        let domens = [];
        let domenSeq = new Sequence();
        let printedArea = this;
        for (let hg of this.hexagons) {
            if (hg.value) {
                let existsDomens = [];
                for (let domen of domens) {
                    for (let domenHg of domen.hgs) {
                        if (
                            (domenHg.y === hg.y - 1 || domenHg.y === hg.y + 1) && (
                                hg.x === domenHg.x ||
                                hg.y % 2 === 0 && hg.x === domenHg.x + 1 ||
                                hg.y % 2 === 1 && hg.x === domenHg.x - 1
                            ) || (domenHg.y === hg.y) && (hg.x === domenHg.x - 1 || hg.x === domenHg.x + 1)
                        ) {
                            //принадлежит домену
                            if(!existsDomens.includes(domen))existsDomens.push(domen);
                        }
                    }
                }
                if(existsDomens.length === 0){
                    //создать домен
                    let domen = {
                        id:domenSeq.nextVal(),
                        hgs:[hg]
                    };
                    domens.push(domen);
                }else if(existsDomens.length === 1){
                    domens.find(domen=>domen.id===existsDomens[0].id)?.hgs.push(hg);
                    //existsDomens[0].push(hg);
                }else if(existsDomens.length > 1){
                    //склеиваем домены и помещаем в итоговый текущий шестиугольник
                    let searchedDomen = domens.find(domen=>domen.id===existsDomens[0].id);
                    let hgs = [];
                    hgs.push(hg);
                    for(let j=1;j<existsDomens.length;j++){
                        hgs = hgs.concat(existsDomens[j].hgs);
                    }
                    searchedDomen.hgs = searchedDomen.hgs.concat(hgs);
                    for(let i = 0; i < domens.length;i++){
                        let domen = domens[i];
                        for(let j=1;j<existsDomens.length;j++){
                            if(domen.id === existsDomens[j].id){
                                domens.splice(i,1);
                                i--;
                                break;
                            }
                        }
                    }
                }
            }
        }
        for(let i=0;i<domens.length;i++){
            if(domens[i].hgs.length<2){
                domens.splice(i,1);
                i--;
            }else {
                let fillColor = `rgba(${getRandomInt(0,256)},${getRandomInt(0,256)},${getRandomInt(0,256)},${getRandomInt(40,81)})`;
                domens[i].hgs[0].canvas.fillStyle = `rgb(${getRandomInt(0,256)},${getRandomInt(0,256)},${getRandomInt(0,256)})`;
                for (let hg of domens[i].hgs){
                    hg.canvas.fillStyle = fillColor;
                    hg.canvas.fill(hg.fill.object);
                    hg.canvas.stroke(hg.border.object);
                    hg.canvas.fillStyle = hg.mainColor;
                    hg.canvas.fillText(1, hg.xc - hg.size * 0.3, hg.yc + hg.size * 0.35);
                }
            }
            document.getElementById('domensQuantity').innerText = domens.length;
        }
        if (callback) {
            let qd, qnd, qh, qht;
            qd = domens.length;
            qnd = domens.filter(domen => domen.hgs.length > 2).length;//если неодносвязный - домен с количеством ячеек больше 2(больше одной связи в домене)
            qh = this.hexagons.length;
            qht = this.hexagons.filter(hg => hg.value ).length;
            callback(qd, qnd, qh, qht);
        }
    }
}