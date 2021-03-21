import React, { Component } from "react";
import { Line } from 'react-chartjs-2';

class LineChart extends Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    //creates the list of inputs that are displayed upfront to the user
    }



render(){
    const datasetKeyProvider=()=>{ 
        return btoa(Math.random()).substring(0,12)
    } 
    
    return(
        <div class="chart-container" style={this.props.style}>

            <Line data={this.props.data} datasetKeyProvider={datasetKeyProvider} options={this.props.options}/>
        </div>
    )
}}

export default LineChart;
