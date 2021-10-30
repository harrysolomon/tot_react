import React, { Component } from "react";

class SelectOptions extends Component {
    constructor(props) {
        super(props)
    }

    render() {
            this.props.options.map((option, option_index) => {
                        return ( <
                            option key = { option_index }
                            value = { option_index } > { option.name } < /option>)})

                        }
                    }

                    export default SelectOptions;