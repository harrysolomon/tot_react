import React, { Component } from "react";

class LineChart extends Component{
    constructor(props) {
        super(props)
    }


    render() {
        const chartStyle = {
            height: "18rem;"
        };
        return(
            <div class="col-8">
                <div class="card">
                    <div class="tab-content" id="navTabContent1">
                        <div class="tab-pane fade p-4 show active" id="nav-result1" role="tabpanel" aria-labelledby="nav-resultTab1">
                            <div class="row align-items-sm-center mb-4">
                                <div class="col-sm mb-3 mb-sm-0">

                                </div>

                                <div class="col-sm-auto">
              
                                    <div class="row font-size-sm">
                                        <div class="col-auto">
                                            <span class="legend-indicator bg-primary"></span> College Diploma
                                        </div>
                                        <div class="col-auto">
                                            <span class="legend-indicator bg-info"></span> HS Diploma
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                                    <div class="chartjs-custom" style={{height: '18rem'}}>
                                        <canvas class="js-chart"
                                                data-hs-chartjs-options={this.props.lineData}>
                                        </canvas>
                                    </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default LineChart;