import React, { Component } from "react";

class InputPctFooter extends Component{
    constructor(props) {
        super(props)
        this.set


    }


    render() {
        return(
            <div class="form-group">
                <label for="wi  thAppendLabel" class="input-label">{this.props.title}</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="withAppendLabel" value="enterValue" placeholder="Ex: 20" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                    <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">%</span>
                    </div>
                </div>
            </div>
        );
    }

}

export default InputPctFooter;