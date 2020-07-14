import React from 'react'

class SizesForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            L: 3,
            M: 5,
            N: 7
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({...this.state, [event.target.name]: parseInt(event.target.value)})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                {Object.entries(this.state).map((size, index) => {
                    return (
                        <label key={index} style={{marginRight: '1em'}}>
                            {size[0]}{' '}
                            <input type="number" name={size[0]} defaultValue={size[1]} min="1" max="30"
                                   required/>
                        </label>
                    )
                })}
                <br/><input type="submit" value="Построить" style={{marginTop: '10px',}}/>
            </form>
        )
    }
}

export default SizesForm