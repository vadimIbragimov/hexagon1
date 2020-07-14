import  React from 'react'
import SizesForm from './pageElements/SizesForm.jsx'
import AutoForm from './pageElements/AutoForm.jsx'
import PrintedArea from  './pageElements/PrintedArea.jsx'
import {Layer, Rect, Stage, Group} from 'react-konva'
import Hexagon from "./pageElements/Hexagon.jsx";


class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            gridSizes: undefined,
            probability: undefined,
            domens: []
        }
        this.hexagons = []
        this.handleSubmitSizesForm = this.handleSubmitSizesForm.bind(this)
        this.handleChangeCellValue = this.handleChangeCellValue.bind(this)
        this.handleSubmitAutoForm = this.handleSubmitAutoForm.bind(this)
        this.handleRenderGrid = this.handleRenderGrid.bind(this)
    }

    handleSubmitSizesForm(gridSizes){
        this.state.probability = undefined
        this.setState({...this.state, gridSizes: gridSizes})
    }

    handleChangeCellValue(xPos,yPos,newValue){
        console.log(this)
        this.hexagons.find(hexagon => hexagon.xPos === xPos && hexagon.yPos === yPos).value = newValue
    }

    handleRenderGrid(hexagons){
        this.hexagons = hexagons
        console.log('app :',this)
    }

    handleSubmitAutoForm(probability){
        console.log(this)
        this.setState({...this.state, probability: probability})
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
                    domens={this.state.domens}
                    onChangeCellValue={this.handleChangeCellValue}
                    onRender={this.handleRenderGrid}
                />
                {this.state.gridSizes ?
                    <div id='Menu'>
                        <AutoForm onSubmit={this.handleSubmitAutoForm}/>
                        <button className='marginTop'>Посчитать домены</button>
                        {this.state.domens.length > 0 ?
                            <span>Количество доменов : <b>{this.state.domens.length}</b></span>
                        :null}
                    </div>
                : null}
            </div>
        )
    }
}

export default App

