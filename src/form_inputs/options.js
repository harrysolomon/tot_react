import React, { Component } from "react";

class SelectOptions extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
        this.props.options.map((option, option_index) => {
                <option key={option_index} value={option_index}>{option.name}</option>}))

    }
}

export default SelectOptions