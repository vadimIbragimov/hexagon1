import React from 'react'
import {Layer, Rect, Stage, Group, Shape} from 'react-konva'
import Konva from 'konva'
import Hexagon from "./Hexagon.jsx";

class PrintedArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hexagons: []
        };
        this.hexagons = []
        this.handleRenderHexagon = this.handleRenderHexagon.bind(this);
        console.log('created printedArea')
    }

    handleRenderHexagon(hexagon){
        this.hexagons.push(hexagon)
    }

    printGrid(gridSizes) {
        const ret = []
        const l = gridSizes.L, m = gridSizes.M, n = gridSizes.N
        let length = n
        this.hexagons = []
        for (let yPos = 0; yPos < (l + m) - 1; yPos++) {
            let xBais = yPos < l ? Math.floor((l - yPos - l % 2) / 2) : Math.floor((yPos - l + 1 + (l - 1) % 2) / 2); //смещение по x
            for (let xPos = xBais; xPos < xBais + length; xPos++) {
                const key = l.toString().concat(m, n, xPos, yPos, Date.now())
                const hexagon =
                ret.push((<Hexagon
                    key={key}
                    xPosition={xPos}
                    yPosition={yPos}
                    size={this.props.hexagonSize}
                    padding={this.props.padding}
                    probability={this.props.probability}
                    onRender={this.handleRenderHexagon}
                    onChangeValue={this.props.onChangeCellValue}
                />));
            }
            yPos < Math.min(l, m) - 1 ? length++ : yPos < Math.max(l, m) - 1 ? null : length-- //длина
        }
        return ret
    }


    render() {
        //console.log('render printedArea: ', this)
        if (this.props.gridSizes) {
            const hexagons = this.props.gridSizes ? this.printGrid(this.props.gridSizes) : []
            this.props.onRender(this.hexagons)
            const sizes = this.props.gridSizes
            const l = sizes.L, m = sizes.M, n = sizes.N, size = this.props.hexagonSize, padding = this.props.padding
            const height = size * (l + m - 1) + (l + m) * size * Math.cos(Math.PI / 3) + padding * 2
            const width = size * Math.sin(Math.PI / 3) *
                ((n + Math.min(l, m) - 1) * 2 + Math.max(l, m) - Math.min(l, m) + (l + 1) % 2) + padding * 2
            return (
                this.props.gridSizes ?
                    <Stage width={width} height={height} className='marginTop'>
                        <Layer>
                            {hexagons}
                        </Layer>
                    </Stage>
                    : null

            )
        } else return null
    }

}

export default PrintedArea
