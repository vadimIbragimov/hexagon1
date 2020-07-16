import React from 'react'
import SizesForm from './SizesForm.jsx'
import AutoForm from './AutoForm.jsx'
import Hexagon from "./Hexagon.jsx";
import DomensInfo from "./DomensInfo.jsx";
import Grid from "../classes/Grid.jsx";
import Sequence from "../classes/Sequence";

const hexagonSize = 20
const padding = 2

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            cells: undefined
        }
        this.gridSeq = new Sequence()

        this.handleClickCell = this.handleClickCell.bind(this)
        this.handleSubmitSizesForm = this.handleSubmitSizesForm.bind(this)
        this.handleSubmitAutoForm = this.handleSubmitAutoForm.bind(this)
        this.handleSearchDomensClick = this.handleSearchDomensClick.bind(this)
        this.handleCreateDomensInfo = this.handleCreateDomensInfo.bind(this)
    }

    handleSubmitSizesForm(gridSizes) {
        this.grid = new Grid(gridSizes, this.gridSeq.nextVal(), hexagonSize, padding)
        this.setState({
            cells: this.grid.cells
        })
    }

    handleClickCell(key) {
        this.grid?.toggleCellValue(key)
        this.setState({...this.state})
    }

    handleSubmitAutoForm(probability) {
        this.grid.setRandomCellValues(probability)
        this.grid.findDomens()
        this.setState({...this.state})
        this.setDomensInfoFunc ? this.setDomensInfoFunc(this.grid.domens, this.state.cells, probability) : null
    }

    handleSearchDomensClick() {
        this.grid.findDomens()
        this.setState({...this.state})
        this.setDomensInfoFunc ? this.setDomensInfoFunc(this.grid.domens, this.state.cells) : null
    }

    handleCreateDomensInfo(setInfoFunc) {
        this.setDomensInfoFunc = setInfoFunc
    }

    render() {
        return (
            <div>
                <SizesForm onSubmit={this.handleSubmitSizesForm}/>
                {this.state.cells?.length > 0 ?
                    (<div>
                        {this.grid.getSvg(this.handleClickCell)}
                        <AutoForm onSubmit={this.handleSubmitAutoForm}/>
                        <button className='marginTop' onClick={this.handleSearchDomensClick}>Посчитать домены</button>
                        <DomensInfo onCreate={this.handleCreateDomensInfo}/>
                    </div>)
                    : null}
            </div>
        )
    }
}

export default App

