import React, { Component } from "react";

class NavForm extends Component{
    constructor(props) {
        super(props)
    }


    render() {
        return(
                <button type="button" class="btn btn-primary" onClick={this.props.onClick}>{this.props.title}</button>
        );
    }

}

export default NavForm;