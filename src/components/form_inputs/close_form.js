import React, { Component } from "react";

class CloseForm extends Component{
    constructor(props) {
        super(props)
    }


    render() {
        return(
            <button type="button" class="btn btn-white" data-dismiss="modal" onClick={this.props.onClick}>Close</button>
        );
    }

}

export default CloseForm;