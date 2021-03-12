import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import { Col, Card } from 'react-bootstrap';

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
        <Col md={12}>
            <div className="card h-100">
                <div className="tab-content" id="navTabContent1">
                    <div className="tab-pane fade p-4 show active" id="nav-result1" role="tabpanel" aria-labelledby="nav-resultTab1">
                        {/*Chart Legends*/}
                        <div className="row align-items-sm-center mb-4">
                            <div className="col-sm mb-3 mb-sm-0"></div>
                            <div className="col-sm-auto">
                                <div className="row font-size-sm">
                                    <div className="col-auto">
                                        <span className="legend-indicator bg-primary"></span> {this.props.new_way}
                                    </div>
                        
                                    <div className="col-auto">
                                        <span className="legend-indicator bg-info"></span> {this.props.old_way}
                                    </div>
                                </div>
                            </div>
                            </div>
                
                        <Line data={this.props.data} datasetKeyProvider={datasetKeyProvider} options={this.props.options}/>
                    </div>
                </div>
            </div>
        </Col>
    )
}}

export default LineChart;
