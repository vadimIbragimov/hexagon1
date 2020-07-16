import findDomens from '../functions/findDomens'
import Cell from "./Cell"
import React from 'react'
import Hexagon from "../components/Hexagon.jsx";

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
};


export default class Grid {
    constructor(gridSizes, id, size, padding) {
        this.cells = []
        this.gridSizes = gridSizes
        this.createGrid(...Object.values(this.gridSizes), id, size, padding)

        this.toggleCellValue = this.toggleCellValue.bind(this)
    }

    createGrid(l,m,n, id, size, padding) {
        const keyPrefix = [l,m,n, id].join('_')
        let length = n
        for (let yPos = 0; yPos < (l + m) - 1; yPos++) {
            let xBais = yPos < l ? Math.floor((l - yPos - l % 2) / 2) : Math.floor((yPos - l + 1 + (l - 1) % 2) / 2); //смещение по x
            for (let xPos = xBais; xPos < xBais + length; xPos++) {
                this.cells.push(new Cell(xPos, yPos, size, padding, keyPrefix))
            }
            yPos < Math.min(l, m) - 1 ? length++ : yPos < Math.max(l, m) - 1 ? null : length-- //подсчет длины следующей строки
        }
        this.heightArea = size * (l + m - 1) + (l + m) * size * Math.cos(Math.PI / 3) + padding * 2
        this.widthArea = size * Math.sin(Math.PI / 3) *
            ((n + Math.min(l, m) - 1) * 2 + Math.max(l, m) - Math.min(l, m) + (l + 1) % 2) + padding * 2
    }

    setRandomCellValues(probability) {
        this.cells.forEach(cell => cell.setRandomValue(probability))
    }

    setColorsForDomens() {
        this.domens.forEach(domen => {
            const color = this.genColor();
            domen.cells.forEach(domenCell => {
                let cell = this.cells.find(
                    cell => domenCell.xPos === cell.xPosition && domenCell.yPos === cell.yPosition
                )?.setColor(color)
            })
        })
    }

    genColor(){
        return `rgba(${getRandomInt(0,256)},${getRandomInt(0,256)},${getRandomInt(0,256)},${getRandomInt(40,81)})`
    }

    toggleCellValue(key) {
        this.cells.find(cell => cell.key === key)?.toggleValue()
    }

    findDomens() {
        this.domens = findDomens(this.cells.map(cell => {
            return {xPos: cell.xPosition, yPos: cell.yPosition, value: cell.value}
        }))
        this.setColorsForDomens()
    }

    getSvg(onClick){
        return (
            <svg width={this.widthArea} height={this.heightArea} className='marginTop'>
                {this.cells.map(cell => (
                    <Hexagon
                        key={cell.key}
                        cellKey={cell.key}
                        center={cell.center}
                        vertices={cell.vertices}
                        value={cell.value}
                        fillColor={cell.color}
                        size={cell.textSize}
                        onClick={()=>{
                            cell.toggleValue()
                            onClick ? onClick() : null
                        }}
                    />
                ))}
            </svg>
        )
    }
}