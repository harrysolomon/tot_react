import React, { Component } from "react";
import { Link } from 'react-router-dom';


class FinalResult extends Component {
    constructor(props) {
      super(props);
      this.state = {
          newData: [-3,0,2,5,7,9,15,20,30,40,50,100],
          percentLoan: "",
          percentScholarship: "",
          percentOutOfPocket: "",
          result: {
            type: "line",
            data: {
                labels: ["Y0","Y1","Y2","Y3","Y4","Y5","Y6","Y7","Y8","Y9","Y10","Y11"],
                datasets: [
                    {
                    data: [-1,-3,-5,-7,5,11,20,45,70,100,115,140],
                    backgroundColor: "transparent",
                    borderColor: "#377dff",
                    borderWidth: 2,
                    pointRadius: 0,
                    hoverBorderColor: "#377dff",
                    pointBackgroundColor: "#377dff",
                    pointBorderColor: "#fff",
                    pointHoverRadius: 0
                    },
                    {
                    data: [0,10,20,30,40,50,60,70,90,100,110,120],
                    backgroundColor: "transparent",
                    borderColor: "#00c9db",
                    borderWidth: 2,
                    pointRadius: 0,
                    hoverBorderColor: "#00c9db",
                    pointBackgroundColor: "#00c9db",
                    pointBorderColor: "#fff",
                    pointHoverRadius: 0
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                    gridLines: {
                        color: "#e7eaf3",
                        drawBorder: false,
                        zeroLineColor: "#e7eaf3"
                    },
                    ticks: {
                        min: 0,
                        max: 160,
                        stepSize: 20,
                        fontColor: "#97a4af",
                        fontFamily: "Open Sans, sans-serif",
                        padding: 10,
                        postfix: "k"
                    }
                    }],
                    xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        fontSize: 12,
                        fontColor: "#97a4af",
                        fontFamily: "Open Sans, sans-serif",
                        padding: 5
                    }
                    }]
                },
                tooltips: {
                prefix: "$",
                postfix: "k",
                hasIndicator: true,
                mode: "index",
                intersect: false,
                lineMode: true,
                lineWithLineColor: "rgba(19, 33, 68, 0.075)"
                },
                hover: {
                mode: "nearest",
                intersect: true
                }
            }
            }
      };
      this.handleChange = this.handleChange.bind(this);
    }


    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        });
    }
    
    onSubmitTask = (e) => {
        let newResult = JSON.parse(JSON.stringify(this.state.result));
        newResult.data.datasets[0].data = this.state.newData;
        this.setState({
            result: newResult,
        });
    }


render() {

    const chartStyle = {
        height: "18rem;"
    };
        return(
            <div class="content container-fluid">
                    
                    <Link to="/">
                        <div class="page-header">
                            <div class ="row align-items-center">
                                <div class="col-sm mb-2 mb-sm-0">
                                    <h1 class="page-header-title">This or That?</h1>
                                </div>
                            </div>
                        </div>
                    </Link>
                    
                    <section class="jumbotron text-center">
                        <div class="container">
                            <p class="lead text-muted">According to BLS, great investment!</p>
                        </div>
                    </section>
                    {/* start of second row*/}
                    <div class="row gx-2 gx-lg-3">
                        {/*Line Chart*/}
                        <div class="col-8">
                            <div class="card">
                                <div class="tab-content" id="navTabContent1">
                                    <div class="tab-pane fade p-4 show active" id="nav-result1" role="tabpanel" aria-labelledby="nav-resultTab1">
                                        {/*Chart Legends*/}
                                        <div class="row align-items-sm-center mb-4">
                                            <div class="col-sm mb-3 mb-sm-0"></div>
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
                                            <canvas class="js-chart" data-hs-chartjs-options={JSON.stringify(this.state.result)}>
                                            </canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Chart End*/}

                        <div class="col-4">
                            <div class="card">
                                <div class="card-header">
                                    Bachelors Degree
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="percentLoan" class="input-label">Percent Loan
                                        </label>
                                        <div class="input-group">
                                            <input name="percentLoan" type="text" class="form-control" id="percentLoan" value={this.state.percentLoan} onChange={this.handleChange} placeholder="Ex: 20" aria-label="Recipient's username" aria-describedby="basic-addon2">
                                            </input>
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="basic-addon2">%</span>
                                            </div>
                                        </div>
                                    </div> 
                                    
                                    <div class="form-group">
                                        <label for="percentScholarship" class="input-label">Percent Scholarship
                                        </label>
                                        <div class="input-group">
                                            <input name="percentScholarship" type="text" class="form-control" id="percentScholarship" value={this.state.percentScholarship} onChange={this.handleChange} placeholder="Ex: 20" aria-label="Recipient's username" aria-describedby="basic-addon2">
                                            </input>
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="basic-addon2">%</span>
                                            </div>
                                        </div>
                                    </div> 

                                    <div class="form-group">
                                        <label for="percentOutOfPocket" class="input-label">Percent Out of Pocket
                                        </label>
                                        <div class="input-group">
                                            <input name="percentOutOfPocket" type="text" class="form-control" id="percentOutOfPocket" value={this.state.percentOutOfPocket} onChange={this.handleChange} placeholder="Ex: 20" aria-label="Recipient's username" aria-describedby="basic-addon2">
                                            </input>
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="basic-addon2">%</span>
                                            </div>
                                        </div>
                                    </div> 

                                </div>
                                <div class="card-footer">
                                    <button type="button" class="btn btn-primary" onClick={this.onSubmitTask}>Submit</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default FinalResult;
        