const defaultColor = '#FFF'

export default class Cell {
    constructor(xPos, yPos, size, padding, keyPrefix) {
        this.xPosition = xPos
        this.yPosition = yPos
        this.value = false
        this.color = defaultColor
        this.center = this.getCenterByGridPosition(xPos, yPos, size, padding)
        this.vertices = this.getHexagonVertices(this.center.x, this.center.y, size)
        this.keyPrefix = keyPrefix
        this.setKey()
        this.textSize = size
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

    setKey(cell) {
        this.key = [this.keyPrefix, this.xPosition, this.yPosition, this.value, this.color].join('_')
    }

    setRandomValue(probability) {
        this.value = probability ? Math.random() >= 1 - probability : false
        this.color = defaultColor
        this.setKey()
    }

    setColor(color) {
        this.color = color
        this.setKey()
    }

    toggleValue(){
        this.value = !this.value
        !this.value ? this.color = defaultColor : null
        this.setKey()
    }
}
