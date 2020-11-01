import React, { Component } from "react";
import LineChart from "./charts/line_chart";
import Summary from "./charts/summary";
import PageHeader from "./page_header";
import ModalInputs from "./modal/modal_inputs";
import { Link } from 'react-router-dom';
import { multiply } from "./functions/generate_results"
import NavForm from "./form_inputs/nav_form"
import lineData from "./line_chart.json"

//import payments from './functions/loan_payment';
const lineDataString = JSON.stringify(lineData);
const lineDataLoc = lineData.data.datasets[0].data;

class FinalResult extends Component {
    constructor(props) {
      super(props);
      this.state = {
          rate: .03,
          presentValue: 500000,
          numPeriods: 60,
          savedData: lineData,
          dataString: lineDataString,
          //data: lineDataLoc,
          forecastRange: [1,2,3,4,5,6,7,8,9,10],
          newData: [-3,0,2,5,7,9,15,20,30,40,50,100],
          //formModal: true,
          //successModal: false,
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
   
    /*componentDidUpdate() {

    };*/


render() {

        console.log(JSON.stringify(this.state.result))
        //const { result } = this.state
        return(
            <div class="content container-fluid">
                    <Link to="/">
                        <PageHeader />
                    </Link>
                    
                    <Summary />
                    <div class="row gx-2 gx-lg-3">
                        <LineChart 
                            lineData={JSON.stringify(this.state.result)}/>
                        <div class="col-4">
                            <div class="card">
                                <div class="card-header">
                                    Bachelors Degree
                                </div>
                                <div class="card-body">
                                    <ModalInputs 
                                        label="Percent Loan"
                                        name="percentLoan"
                                        submitVal={this.state.percentLoan}
                                        changedVal={this.handleChange}/>
                                    <ModalInputs 
                                        label="Percent Scholarship"
                                        name="percentScholarship"
                                        submitVal={this.state.percentScholarship}
                                        changedVal={this.handleChange}/>
                                    <ModalInputs 
                                        label="Percent Out of Pocket"
                                        name="percentOutOfPocket"
                                        submitVal={this.state.percentOutOfPocket}
                                        changedVal={this.handleChange}/>
                                </div>
                                <div class="card-footer">
                                    <NavForm onClick={this.onSubmitTask} title="Submit"/>
                                </div>
                                
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default FinalResult;
        