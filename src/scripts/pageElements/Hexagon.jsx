import React from 'react'
import {Group, Shape, Text} from 'react-konva'

class Hexagon extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.onClick(this.props.cellKey)
    }

    print(ctx, figure) {
        const center = this.props.center
        const vertices = this.props.vertices
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
        const hexagon = this
        return (
            <Group>
                <Shape fill={this.props.fillColor}
                       stroke='black'
                       onClick={this.handleClick}
                       sceneFunc={function (ctx) {
                           hexagon.print(ctx, this)
                       }}
                />
                {this.props.value ? <Text
                    x={this.props.center.x - this.props.size * 0.35}
                    y={this.props.center.y - this.props.size * 0.45}
                    text='1'
                    fill='black'
                    fontSize={this.props.size}
                    onClick={this.handleClick}
                    title={this.props.xPosition + ',' + this.props.yPosition}
                /> : null}
            </Group>
        )
    }
}

export default Hexagon
