import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from "axios";


class FinalResult extends Component {
    constructor(props) {
      super(props);
      this.state = {
          newData: [-3,0,2,5,7,9,15,20,30,40,50,100],
          input0: "",
          input1: "",
          input2: "",
          form_inputs: [],
          data_loaded: false,
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
            legend: {
                display:false
            },
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
                //prefix: "$", deprecated
                //postfix: "k", deprecated
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
            
      };
      //this.handleChange = this.handleChange.bind(this);

    }
    createForm(){
        return this.state.form_inputs.map((item,i) => (
            <div class="form-group" key={i}>
                <label for={item.form_id} class="input-label">{item.form_name}
                </label>
                <div class="input-group">
                    <input name={item.form_id} type="text" class="form-control" id={item.form_id} value={item.state||''} onChange={this.handleChange.bind(this, i)} placeholder={item.default_value} aria-label="Recipient's username" aria-describedby="basic-addon2">
                    </input>
                    <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">%</span>
                    </div>
                </div>
            </div>))        
     }

     handleChange(i, event) {
        let values = [...this.state.form_inputs];
        values[i].state = event.target.value;
        this.setState({ values });
     }
    
    onSubmitTask = (e) => {
        let newResult = JSON.parse(JSON.stringify(this.state.result));
        newResult.data.datasets[0].data = this.state.newData;
        this.setState({
            result: newResult,
        });
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/5fac52be03ff66099d9a8ef4`)
          .then(res => {
            const form_inputs = res.data;
            this.setState({ 
                form_inputs,
                data_loaded: true 
            });
          })
      }


render() {

    const chartStyle = {
        height: "18rem;"
    };

    console.log(this.state.form_inputs);

    const datasetKeyProvider=()=>{ 
        return btoa(Math.random()).substring(0,12)
    } 

    if(this.state.data_loaded) {

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
                                
                                        <Line data={this.state.data} datasetKeyProvider={datasetKeyProvider} options={this.state.options} />
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
                                    {this.createForm()}   
                                </div>
                                <div class="card-footer">
                                    <button type="button" class="btn btn-primary" onClick={this.onSubmitTask}>Submit</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
            </div>
        );
    } else {
        return (
            <div>
            </div>
        )}
}
}

export default FinalResult;
        