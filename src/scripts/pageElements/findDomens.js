import {Sequence} from "../Sequence.js";
import {getRandomInt} from "../getRandomInt.js";
import {defaults} from "less/lib/less/utils";

const checkAround = (xPos1,yPos1,xPos2,yPos2) => {
    let ret = false
    if(
        yPos1===yPos2 && (xPos1 === xPos2 +1 || xPos1 === xPos2 -1) ||
        (yPos1 === yPos2 -1 || yPos1 === yPos2 +1) && (xPos1 === (xPos2 + yPos1%2===1? 1: -1) || xPos1 === xPos2)
    ){
        ret === true
    }
    return ret
}

const getDomensAround = (domens) => {
    const domensAround = [];
    for (let domen of domens) {
        for (let domenHg of domen.domens) {
            if (
                (domenHg.y === hg.y - 1 || domenHg.y === hg.y + 1) && (
                    hg.x === domenHg.x ||
                    hg.y % 2 === 0 && hg.x === domenHg.x + 1 ||
                    hg.y % 2 === 1 && hg.x === domenHg.x - 1
                ) || (domenHg.y === hg.y) && (hg.x === domenHg.x - 1 || hg.x === domenHg.x + 1)
            ) {
                //принадлежит домену
                if(!domensAround.includes(domen))domensAround.push(domen);
            }
        }
    }
}

export default (hexagons ,callback) => {
    let domens = [];
    let domenSeq = new Sequence();
    hexagons.forEach(hg => {
        if (hg.value) {

        }
    })

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