import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';


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
          data: {},
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
        Promise.all([
            fetch('http://localhost:3000/line_chart')
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => this.setState({
            data: data1,
        }))
    }

    componentDidMount() {
        Promise.all([
            fetch(`http://localhost:3000/5fac52be03ff66099d9a8ef4`),
            fetch('http://localhost:3000/line_chart')
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => this.setState({
            form_inputs: data1,
            data: data2,
            data_loaded: true
        }))
    }


render() {
// React requirement for adding the style element in html
    const chartStyle = {
        height: "18rem;"
    };

// React Chart js requirement for having each dataset be represented by a unique key
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
                                
                                        <Line data={this.state.data} datasetKeyProvider={datasetKeyProvider} options={this.state.options}/>
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
        