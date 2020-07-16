import  React from 'react'
import SizesForm from './SizesForm.jsx'
import AutoForm from './AutoForm.jsx'
import PrintedArea from './PrintedArea.jsx'
import {Layer, Rect, Stage, Group} from 'react-konva'
import Hexagon from "./Hexagon.jsx";
import findDomens from "../findDomens";
import DomensInfo from "./DomensInfo.jsx";


class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            gridSizes: undefined,
            probability: undefined
        }
        this.hexagons = []
        this.domens = []
        this.handleSubmitSizesForm = this.handleSubmitSizesForm.bind(this)
        this.handleChangeCellValue = this.handleChangeCellValue.bind(this)
        this.handleSubmitAutoForm = this.handleSubmitAutoForm.bind(this)
        this.handleRenderGrid = this.handleRenderGrid.bind(this)
        this.handleSearchDomensClick = this.handleSearchDomensClick.bind(this)
        this.handleCreateDomensInfo = this.handleCreateDomensInfo.bind(this)
    }

    handleSubmitSizesForm(gridSizes){
        this.state.probability = undefined
        this.setState({...this.state, gridSizes: gridSizes})
    }

    handleChangeCellValue(xPos,yPos,newValue, changeValueFunc){
        this.hexagons.find(hexagon => hexagon.xPos === xPos && hexagon.yPos === yPos).value = newValue
        this.state.probability = undefined
        console.log(this)
    }

    handleRenderGrid(hexagons){
        this.hexagons = hexagons
        console.log('app :',this)
    }

    handleSubmitAutoForm(probability){
        console.log(this)
        this.setState({...this.state, probability: probability})
    }

    handleSearchDomensClick(){
        const domens = findDomens(this.hexagons)
        domens.forEach(domen => {
            const color = Konva.Util.getRandomColor()
            domen.cells.forEach(cell=>cell.changeColorFunc(color))
        })
        this.setDomensInfoFunc(domens,this.hexagons, this.state.probability)
    }

    handleCreateDomensInfo(setInfoFunc){
        this.setDomensInfoFunc = setInfoFunc
    }

    render(){
        return (
            <div>
                <SizesForm onSubmit={this.handleSubmitSizesForm}/>
                <PrintedArea
                    gridSizes={this.state.gridSizes}
                    hexagonSize={20}
                    padding={2}
                    probability={this.state.probability}
                    onChangeCellValue={this.handleChangeCellValue}
                    onRender={this.handleRenderGrid}
                />
                {this.state.gridSizes ?
                    <div id='Menu'>
                        <AutoForm onSubmit={this.handleSubmitAutoForm}/>
                        <button className='marginTop' onClick={this.handleSearchDomensClick}>Посчитать домены</button>
                        <DomensInfo onCreate={this.handleCreateDomensInfo}/>
                    </div>
                : null}
            </div>
        )
    }
}

export default App

