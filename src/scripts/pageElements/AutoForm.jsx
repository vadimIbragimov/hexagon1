import React from 'react'

class AutoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 0.5};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: parseFloat(event.target.value)});
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.onSubmit(this.state.value)
        console.log(this.state.value)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Вероятность:
                    <input type="number" defaultValue={this.state.value} onChange={this.handleChange} min="0.01"
                           max="0.99" step="0.01" required/>
                </label>
                <input type="submit" value="АВТО" style={{marginTop: '10px',}}/>
            </form>
        );
    }
}

export default AutoForm