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
                    max: 1000000, // can use the api call to determine max and min
                    stepSize: 100000, // can use the api call to determine step size,
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
            <div className="form-group" key={i}>
                <label htmlFor={item.form_id} className="input-label">{item.form_name}
                </label>
                <div className="input-group">
                    <input name={item.form_id} type="text" className="form-control" id={item.form_id} value={item.state||''} onChange={this.handleChange.bind(this, i)} placeholder={item.default_value} aria-label="Recipient's username" aria-describedby="basic-addon2">
                    </input>
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">%</span>
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
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.form_inputs)
        };

        Promise.all([
            fetch('http://localhost:3000/5fac52be03ff66099d9a8ef4/line_chart',requestOptions)
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => this.setState({
            data: data1,
        }))
    }

    componentDidMount() {

        const requestOptions = {
            method: "POST"
        };

        Promise.all([
            fetch(`http://localhost:3000/5fac52be03ff66099d9a8ef4`),
            fetch('http://localhost:3000/5fac52be03ff66099d9a8ef4/line_chart',requestOptions)
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

// React Chart js requirement for having each dataset be represented by a unique key
    const datasetKeyProvider=()=>{ 
        return btoa(Math.random()).substring(0,12)
    } 

    if(this.state.data_loaded) {
        /*this.state.form_inputs.map((item,i) => (
            console.log(item)
        ));*/
        

        return( 
            <div className="content container-fluid">
                    
                    <Link to="/">
                        <div className="page-header">
                            <div className ="row align-items-center">
                                <div className="col-sm mb-2 mb-sm-0">
                                    <h1 className="page-header-title">This or That?</h1>
                                </div>
                            </div>
                        </div>
                    </Link>
                    
                    <section className="jumbotron text-center">
                        <div className="container">
                            <p className="lead text-muted">According to BLS, great investment!</p>
                        </div>
                    </section>
                    {/* start of second row*/}
                    <div className="row gx-2 gx-lg-3">
                        {/*Line Chart*/}
                        <div className="col-8">
                            <div className="card">
                                <div className="tab-content" id="navTabContent1">
                                    <div className="tab-pane fade p-4 show active" id="nav-result1" role="tabpanel" aria-labelledby="nav-resultTab1">
                                        {/*Chart Legends*/}
                                        <div className="row align-items-sm-center mb-4">
                                            <div className="col-sm mb-3 mb-sm-0"></div>
                                            <div className="col-sm-auto">
                                                <div className="row font-size-sm">
                                                    <div className="col-auto">
                                                        <span className="legend-indicator bg-primary"></span> College Diploma
                                                    </div>
                                        
                                                    <div className="col-auto">
                                                        <span className="legend-indicator bg-info"></span> HS Diploma
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

                        <div className="col-4">
                            <div className="card">
                                <div className="card-header">
                                    Bachelors Degree
                                </div>
                                <div className="card-body">
                                    {this.createForm()}   
                                </div>
                                <div className="card-footer">
                                    <button type="button" className="btn btn-primary" onClick={this.onSubmitTask}>Submit</button>
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
        