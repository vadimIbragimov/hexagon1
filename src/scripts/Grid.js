import findDomens from './findDomens'
import Konva from 'konva'

const defaultColor = '#FFF'

export default class Grid {
    constructor(gridSizes, id, size, padding) {
        this.id = id
        this.cells = []
        this.gridSizes = gridSizes
        this.createGrid(size, padding)

        this.toggleCellValue = this.toggleCellValue.bind(this)
    }

    createGrid(size, padding) {
        const l = this.gridSizes.L, m = this.gridSizes.M, n = this.gridSizes.N
        let length = n
        for (let yPos = 0; yPos < (l + m) - 1; yPos++) {
            let xBais = yPos < l ? Math.floor((l - yPos - l % 2) / 2) : Math.floor((yPos - l + 1 + (l - 1) % 2) / 2); //смещение по x
            for (let xPos = xBais; xPos < xBais + length; xPos++) {
                const center = this.getCenterByGridPosition(xPos, yPos, size, padding)
                const cell = {
                    xPosition: xPos,
                    yPosition: yPos,
                    center: center,
                    vertices: this.getHexagonVertices(center.x, center.y, size),
                    value: false,
                    color: defaultColor
                }
                this.setCellKey(cell)
                this.cells.push(cell)
            }
            yPos < Math.min(l, m) - 1 ? length++ : yPos < Math.max(l, m) - 1 ? null : length-- //подсчет длины следующей строки
        }
        this.heightArea = size * (l + m - 1) + (l + m) * size * Math.cos(Math.PI / 3) + padding * 2
        this.widthArea = size * Math.sin(Math.PI / 3) *
            ((n + Math.min(l, m) - 1) * 2 + Math.max(l, m) - Math.min(l, m) + (l + 1) % 2) + padding * 2
    }

    getCenterByGridPosition(xPosition, yPosition, size, padding) {
        const heightTriangle = size * Math.cos(Math.PI / 3)
        const widthTriangle = size * Math.sin(Math.PI / 3)
        return {
            x: xPosition * (widthTriangle * 2) + (1 + yPosition % 2) * widthTriangle + padding,
            y: yPosition * (size + heightTriangle) + heightTriangle + size / 2 + padding
        }
    }

    getHexagonVertices(xCenter, yCenter, size) {
        const vertices = [];
        let x = xCenter, y = yCenter - ((size * Math.cos(Math.PI / 3)) + size / 2);

        for (let side = 0; side < 6; side++) {
            vertices.push({x, y});
            x = x + size * Math.sin(Math.PI / 3 - side * Math.PI / 3);
            y = y + size * Math.cos(Math.PI / 3 - side * Math.PI / 3);
        }
        return vertices
    }

    setRandomCellValues(probability) {
        this.cells.forEach(cell => {
            cell.value = probability ? Math.random() >= 1 - probability : false
            cell.color = defaultColor
            this.setCellKey(cell)
        })
        return this
    }

    setColorsForDomens(domens) {
        this.domens.forEach(domen => {
            const color = Konva.Util.getRandomColor()
            domen.cells.forEach(domenCell => {
                let cell = this.cells.find(
                    cell => domenCell.xPos === cell.xPosition && domenCell.yPos === cell.yPosition
                )
                cell ? cell.color = color : null
                this.setCellKey(cell)
            })
        })
    }

    toggleCellValue(key) {
        const cell = this.cells.find(cell => cell.key === key)
        cell ? cell.value = !cell.value : null
        this.setCellKey(cell)
        return this
    }

    setCellKey(cell) {
        cell ?
            cell.key = [
                ...Object.values(this.gridSizes), this.id, cell.xPosition, cell.yPosition, cell.value, cell.color
            ].join('_') :
            null
    }

    findDomens() {
        this.domens = findDomens(this.cells.map(cell => {
            return {xPos: cell.xPosition, yPos: cell.yPosition, value: cell.value}
        }))
        this.setColorsForDomens()
        return this
    }
}