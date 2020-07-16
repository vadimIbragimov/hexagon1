import React from 'react'

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

    getPoints(){
        return this.props.vertices.reduce((acc, point)=>acc+point.x + ','+ point.y+' ', '')
    }


    render() {
        const hexagon = this
        return (
            <g>
                <polygon fill={this.props.fillColor}
                       stroke='black'
                       strokeWidth='2'
                       points={this.getPoints()}
                       onClick={this.handleClick}
                />
                {this.props.value ? <text
                    x={this.props.center.x - this.props.size * 0.25}
                    y={this.props.center.y + this.props.size * 0.35}
                    fill='black'
                    style={{cursor: 'default'}}
                    fontSize={this.props.size}
                    onClick={this.handleClick}
                >1</text> : null}
            </g>
        )
    }
}

export default Hexagon
