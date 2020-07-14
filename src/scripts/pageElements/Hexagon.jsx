import React from 'react'
import {Layer, Rect, Stage, Group, Shape, Text} from 'react-konva'
import Konva from 'konva'

const getHexagonVertices = (xCenter, yCenter, size) => {
    const vertices = [];
    let x = xCenter, y = yCenter - ((size * Math.cos(Math.PI / 3)) + size / 2);

    for (let side = 0; side < 6; side++) {
        vertices.push({x, y});
        x = x + size * Math.sin(Math.PI / 3 - side * Math.PI / 3);
        y = y + size * Math.cos(Math.PI / 3 - side * Math.PI / 3);
    }
    return vertices
}

const getCenterByGridPosition = (xPosition,yPosition, size, padding) => {
    const heightTriangle = size * Math.cos(Math.PI / 3)
    const widthTriangle = size * Math.sin(Math.PI / 3)
    return {
        x: xPosition * (widthTriangle * 2) + (1 + yPosition % 2) * widthTriangle + padding,
        y: yPosition * (size + heightTriangle) + heightTriangle + size / 2 + padding
    }
}

console.log(getHexagonVertices(20, 20, 20))

class Hexagon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            center: getCenterByGridPosition(props.xPosition,props.yPosition,props.size, props.padding),
            size: props.size,
            color: '#FFF',
            value: !this.props.probability ? false : Math.random() >= 1 - this.props.probability
        };
        this.props.onRender({xPos: this.props.xPosition, yPos: this.props.yPosition, value: this.state.value})
        this.handleClick = this.handleClick.bind(this)
        this.print = this.print.bind(this)
    }

    handleClick() {
        this.setState({...this.state, value: !this.state.value})
        console.log(this.state)
    }

    print(ctx, figure) {
        const center = this.state.center
        const vertices = getHexagonVertices(center.x, center.y, this.state.size)
        let vertex;
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 0; i < vertices.length; i++) {
            let vertex;
            i < vertices.length - 1 ? vertex = vertices[i + 1] : vertex = vertices[0]
            ctx.lineTo(vertex.x, vertex.y)
        }
        ctx.closePath();
        ctx.fillStrokeShape(figure);
    }


    render() {
        //console.log('render hexagon: ', this)
        const hexagon = this
        return (
            <Group>
                <Shape fill={this.state.color}
                       stroke='black'
                       onClick={this.handleClick}
                       sceneFunc={function (ctx) {
                           hexagon.print(ctx, this)
                       }}
                />
                {this.state ? <Text
                    x={this.state.center.x - this.state.size * 0.55}
                    y={this.state.center.y - this.state.size * 0.45}
                    text={this.props.xPosition + ',' + this.props.yPosition}
                    fill='black'
                    fontSize={this.state.size}
                    onClick={this.handleClick}
                /> : null}
            </Group>
        )
    }
}

export default Hexagon
