import {Sequence} from "./Sequence.js";
import {getRandomInt} from "./getRandomInt.js";
import {defaults} from "less/lib/less/utils";

const checkAround = (xPos1,yPos1,xPos2,yPos2) => {
    let ret = false
    if(
        yPos1===yPos2 && (xPos1 === xPos2 +1 || xPos1 === xPos2 -1) ||
        (yPos1 === yPos2 -1 || yPos1 === yPos2 +1) && (xPos1 === (xPos2 + (yPos1%2===1 ? -1: 1)) || xPos1 === xPos2)
    ){
        ret = true
    }
    return ret
}

const getDomensAround = (xPos, yPos, domens) => {
    const domensAround = [];
    domens.forEach(domen => {
        for (let cell of domen.cells) {
            if (checkAround(xPos, yPos, cell.xPos, cell.yPos)){ //принадлежит домену
                if(!domensAround.includes(domen))domensAround.push(domen);
                break
            }
        }
    })
    return domensAround
}

const deleteOtherDomens = (domens, existsDomens) => {
    if(existsDomens.length > 0){
        for(let i = 0; i < domens.length;i++){
            let domen = domens[i];
            if(existsDomens.find((existsDomen, index)=> index !==0 && existsDomen.id === domen.id)){
                domens.splice(i,1)
                i--
            }
        }
    }
}

const cleanSingleCellDomens = (domens) => {
    for(let i = 0; i < domens.length;i++){
        let domen = domens[i];
        if(domen.cells.length < 2){
            domens.splice(i,1)
            i--
        }
    }
}

export default (hexagons) => {
    let domens = [];
    let domenSeq = new Sequence();
    hexagons.forEach(cell => {
        if (cell.value) {
            let existsDomens = getDomensAround(cell.xPos, cell.yPos, domens) //ищем домены вокруг ячейки
            if(existsDomens.length === 0){ //если вокруг нет доменов, то создаём
                domens.push({id: domenSeq.nextVal(), cells: [cell]})
            } else if (existsDomens.length === 1){ //если один домен, то добавляем ячейку с домену
                domens.find(domen=>domen.id===existsDomens[0].id)?.cells.push(cell)
            }else if(existsDomens.length > 1){//если несколько, то:
                let searchedDomen = domens.find(domen=>domen.id===existsDomens[0].id) //принимаем первый за итоговый
                searchedDomen.cells.push(cell); //кладём туда текущую ячейку
                //кладём в первый домен ячейки из других доменов
                existsDomens.forEach((domen, index)=> {
                    index !== 0 ? searchedDomen.cells.push(...domen.cells) : null
                })
                //удаляем другие окружающие домены
                deleteOtherDomens(domens,existsDomens)
            }
        }
    })
    //удаление одиночных доменов
    cleanSingleCellDomens(domens)
    return domens
}