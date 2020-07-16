import React from 'react'
import Sequence from '../classes/Sequence';

export default class DomensInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            calculations: [],
            domens: undefined
        }
        this.trSeq = new Sequence()

        this.setDomensInfo = this.setDomensInfo.bind(this)
        this.props.onCreate(this.setDomensInfo)
    }

    setDomensInfo(domens, hexagons, probability) {
        this.state.calculations.length > 9 ? this.state.calculations.splice(0, 1) : null
        this.setState({
            calculations: this.state.calculations.concat({
                id: this.trSeq.nextVal(),
                probability: probability ? probability : '',
                allDomens: domens.length,
                singleLinkDomens: domens.filter(domen => domen.cells.length > 2).length,
                cells: hexagons.length + ', ' + hexagons.filter(hexagon => hexagon.value === true).length
            }),
            domens: domens.length
        })
    }

    getRows() {
        return this.state.calculations.map(calc => (<tr key={calc.id}>
            <td>{calc.probability}</td>
            <td>{calc.allDomens}</td>
            <td>{calc.singleLinkDomens}</td>
            <td>{calc.cells}</td>
        </tr>))
    }

    render() {
        if (this.state.calculations.length > 0) {
            return (
                <div className='marginTop'>
                    <span>Количество доменов : <b>{this.state.domens}</b></span>
                    <table>
                        <tbody>
                        <tr>
                            <td rowSpan="2">Вероятность</td>
                            <td colSpan="2">Количество доменов в решётке</td>
                            <td rowSpan="2">Количество ячеек в решётке (L;M;N),<br/> из них имеющих значение 1</td>
                        </tr>
                        <tr>
                            <td>Всего</td>
                            <td>Из них неодносвязных</td>
                        </tr>
                        </tbody>
                        <tbody>
                        {this.getRows()}
                        </tbody>
                    </table>
                </div>
            )
        } else return null
    }
}