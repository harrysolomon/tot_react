import React, { Component } from "react";

class ModalInputs extends Component {
  constructor(props) {
    super(props);
  }

//card
    render() {

        return (
                <div class="form-group">
                    <label for={this.props.name} class="input-label">{this.props.label}</label>
                    <div class="input-group">
                        <input name={this.props.name} type="text" class="form-control" id={this.props.name} value={this.props.submitVal} onChange={this.props.changedVal} placeholder="Ex: 20" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                        <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2">%</span>
                        </div>
                    </div>
                </div> 
        );
    }
}

export default ModalInputs;