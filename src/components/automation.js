import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Button, Card, FormControl, InputGroup, FormGroup, FormLabel, Container, Row, Col, Nav, Navbar} from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import _ from 'lodash'
import LineChart from '../components/line_chart'
import { XSquareFill } from 'react-bootstrap-icons'
import axios from "axios";
//import SelectOptions from '../components/form_inputs/options'



const line_chart_data = {
    "data": {
      "labels": [
        "Y0",
        "Y1",
        "Y2",
        "Y3",
        "Y4",
        "Y5",
        "Y6",
        "Y7",
        "Y8",
        "Y9",
        "Y10"
      ],
      "datasets": [
        {
          "data": [
            -5042,
            -10084,
            -15126,
            -20168,
            31669,
            84706,
            138967,
            194476,
            251259,
            309341,
            368748
          ],
          "backgroundColor": "transparent",
          "borderColor": "#377dff",
          "borderWidth": 2,
          "pointRadius": 0,
          "hoverBorderColor": "#377dff",
          "pointBackgroundColor": "#377dff",
          "pointBorderColor": "#fff",
          "pointHoverRadius": 0
        },
        {
          "data": [
            35042,
            70535,
            106487,
            142906,
            182920,
            223265,
            263945,
            304964,
            346325,
            388033,
            430091
          ],
          "backgroundColor": "transparent",
          "borderColor": "#00c9db",
          "borderWidth": 2,
          "pointRadius": 0,
          "hoverBorderColor": "#00c9db",
          "pointBackgroundColor": "#00c9db",
          "pointBorderColor": "#fff",
          "pointHoverRadius": 0
        }
      ]
    },
    "options": {
      "legend": {
        "display": false
      },
      "scales": {
        "yAxes": [
          {
            "gridLines": {
              "color": "#e7eaf3",
              "drawBorder": false,
              "zeroLineColor": "#e7eaf3"
            },
            "ticks": {
              "suggestedMin": -20168,
              "suggestedMax": 430091,
              "fontColor": "#97a4af",
              "fontFamily": "Open Sans, sans-serif",
              "padding": 10,
              "postfix": "k"
            }
          }
        ],
        "xAxes": [
          {
            "gridLines": {
              "display": false,
              "drawBorder": false
            },
            "ticks": {
              "fontSize": 12,
              "fontColor": "#97a4af",
              "fontFamily": "Open Sans, sans-serif",
              "padding": 5
            }
          }
        ]
      },
      "tooltips": {
        "hasIndicator": true,
        "mode": "index",
        "intersect": false,
        "lineMode": true,
        "lineWithLineColor": "rgba(19, 33, 68, 0.075)"
      },
      "hover": {
        "mode": "nearest",
        "intersect": true
      }
    }
  }

const the_products = [
    {
        "id":0,
        "name": "Cool Product",
        "cost": 10000,
        "period": "year",
        "time_save": 50,
        "time_unit": "hour"
    },
    {
        "id":1,
        "name":"Another Product",
        "cost": 5000,
        "peiod": "quarter",
        "time_save": 80,
        "time_unit": "hour"
    }
]

const the_cadences = [
    {
        "id":1,
        "name":"Daily",
        "period":"day"
    },
    {
        "id":2,
        "name":"Quarterly",
        "period": "quarter"
    },
    {
        "id":3,
        "name":"Annually",
        "period":"year"
    }
]

const the_employees = [
    {
        "id": 1,
        "name": "Analyst",
        "cost": 50000,
        "period": "year"
    },
    {
        "id": 2,
        "name": "Account Management",
        "cost": 65000,
        "period": "year"
    },
    {
        "id": 3,
        "name": "Account Executive",
        "cost": 75000,
        "period": "year"
    }
]


class Automation extends Component {
    constructor(props) {
      super(props);
      this.state = {
          rows: [],
          calc_name: "New Calculator",
          values:"",
          products: the_products,
          cadences: the_cadences,
          employees: the_employees,
          select_inputs:{
              products: the_products,
              employees: the_employees,
              cadences: the_cadences
          },
          data_loaded: false,
          product_state: "",
          open: false,
          data: line_chart_data["data"],
          options: line_chart_data["options"],
          navActive: "",
          location: this.props.location,
          match: this.props.match,
          calculate_button: false,
          input_nav: false,
          graph_nav: true,
          table_nav: true,
          active_key: "form"

      };
      this.activeNav = this.activeNav.bind(this)
      
    //creates the list of inputs that are displayed upfront to the user
    }
   

    inputPrepend(data_type){
        const available_prepends = [""]

        if(available_prepends.includes(data_type)){
            return(
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">{data_type}</InputGroup.Text>
                </InputGroup.Prepend>
            )
            
        }
    }

    inputAppend(data_type){
        const available_appends = ["Hrs"]

        if(available_appends.includes(data_type)){
            return(
                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon1">{data_type}</InputGroup.Text>
                </InputGroup.Append>
            )
            
        }
    }
    productOptions(){
        
        this.state.select_inputs.products.map((product, product_index) => {
            return(
                <option value={product_index}>{product.name}</option>)
            })

        }

    datasetKeyProvider=()=>{ 
            return btoa(Math.random()).substring(0,12)
        } 

    tableOption(){
        return(
            <Col>
            <Card>
                <Card.Header>
                    <Col>Inputs</Col>
                    <Col>
                    <div className="text-right">
                        <Button size="sm" variant="primary" onClick={this.onSubmitTask} disabled={this.state.calculate_button}>
                            Calculate and Save
                        </Button>
                        </div>
                    </Col>
                </Card.Header>
                <Card.Body>
                    <table
                        className="table table-bordered table-hover"
                        id="tab_logic">
                        <thead>
                            <tr>
                            <th className="text-center align-middle"> # </th>
                            <th className="text-center"> Name </th>
                            <th className="text-center"> Product </th>
                            <th className="text-center"> Current Time Spent </th>
                            <th className="text-center"> Employee </th>
                            <th className="text-center"> Cadence </th>
                            <th />
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.rows.map((item, idx) => (
                            <tr id={idx} key={this.datasetKeyProvider}>
                            <td key={this.datasetKeyProvider}>{idx}</td>
                            <td key={this.datasetKeyProvider}>
                                
                                <InputGroup>
                                <FormControl
                                type="text"
                                name="name"
                                value={item.name}
                                onChange={this.handleChange.bind(this, idx, "name")}
                                />
                                </InputGroup>
                            </td>
                            <td key={this.datasetKeyProvider}>
                                <InputGroup>
                                <FormControl
                                as="select"
                                name="products"
                                onChange={this.handleChange.bind(this, idx, "products")}>
                                <option>Choose..</option>
                                {this.state.select_inputs.products.map((product, product_index) => {
                                return(
                                    <option value={product_index}>{product.name}</option>)})}
                                </FormControl>
                                </InputGroup>
                            </td>
                            <td key={this.datasetKeyProvider}>
                                <InputGroup>
                                <FormControl
                                type="text"
                                name="current_time_spent"
                                value={item.current_time_spent}
                                onChange={this.handleChange.bind(this, idx, "current_time_spent")}
                                />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="basic-addon1">Hrs</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </td>
                            <td key={this.datasetKeyProvider}>
                                <InputGroup>
                                <FormControl
                                as="select"
                                name="employees"
                                onChange={this.handleChange.bind(this, idx, "employees")}>
                                <React.Fragment>
                                    <option>Choose..</option>
                                {this.state.select_inputs.employees.map((employee, employee_index) => {
                                return(
                                    <option value={employee_index}>{employee.name}</option>)})}
                                </React.Fragment>
                                </FormControl>
                                </InputGroup>
                            </td>
                            <td key={this.datasetKeyProvider}>
                                <InputGroup>
                                <FormControl
                                as="select"
                                name="cadences"
                                onChange={this.handleChange.bind(this, idx, "cadences")}>
                                <React.Fragment>
                                    <option>Choose..</option>
                                {this.state.select_inputs.cadences.map((cadence, cadence_index) => {
                                return(
                                    <option value={cadence_index}>{cadence.name}</option>)})}
                                </React.Fragment>
                                </FormControl>
                                </InputGroup>
                            </td>
                            <td className="text-center" key={this.datasetKeyProvider}>
                                <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={this.handleRemoveSpecificRow(idx)}
                                >
                                Remove
                                </Button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Button onClick={this.handleAddRow} variant="link">Add Row</Button>
                </Card.Body>
            </Card>
                
            </Col>
        )}
        
    handleChange = (row, field, event) => {
        let values = [...this.state.rows];
        if(event.target.type === "select-one"){
            values[row][field] = this.state.select_inputs[event.target.name][event.target.value]
            this.setState({ values });

        } else {
            values[row][field] = event.target.value;
            this.setState({ values });
        }

        console.log(this.state.rows)
        
    }

    handleRemoveSpecificRow = (idx) => () => {
        const values = [...this.state.rows];
        values.splice(idx, 1);
        this.setState({ rows: values });
        };
    
    handleAddRow = (e) => {
        //so the way this would work is assigning this variable to the data returned from the DB? 
        //Or will that ruin assignment?
        //Or we would have to do a post for every row added.
        const new_row = {
            "name": "",
            "products": "",
            "current_time_spent":"",
            "employees": "",
            "cadences":""
        }
        
        this.setState({ rows: [...this.state.rows, new_row] })
        
        console.log(this.state.rows)
    }

    //this function determines the active nav
    activeNav(eventKey){
        this.setState({ active_key: eventKey})
    }

    supSquad(){
        return (
            <LineChart 
            data={this.state.data} 
            options={this.state.options}
            new_way = "New Service"
            old_way = "Old Service">

            </LineChart>

        )
    }

   // this function determines the content to display based on the active nav 
    contentDisplay(){
        if(this.state.active_key === '' || this.state.active_key === "form"){
            return(this.tableOption())
        } else if (this.state.active_key === "graph"){
            return(this.supSquad())
        } else {
            return(this.tableOption())
        }
    }

    onSubmitTask = (e) => {
        let schema = {}
        schema["name"] = this.state.calc_name
        schema["inputs"] = this.state.rows
        console.log(schema)
        
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(schema)
        };

        Promise.all([
            fetch('http://localhost:3000/timesaver',requestOptions)
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => this.setState({
            data: data1["data"],
            options: data1["options"],
            rows: data1["inputs"],
            graph_nav: false,
            table_nav: false,
            navActive: "graph",
            active_key: "graph"
        }))
    }

    testInsert = (e) => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"value": 10})
        };

        Promise.all([
            fetch('http://localhost:3000/time_saver',requestOptions)
        ])
    }

    componentDidMount() {
        console.log(this.state.match)
        if(this.state.match.params === '{}'){
        } else if(this.state.match.params.timesaverId === 'new'){
            const the_rows = [{
                      "cadences": "",
                      "employees": "",
                      "products": "",
                      "current_time_spent": "",
                      "name": ""
                    }]

            this.setState({
                rows: the_rows,
                data_loaded: true
            })

        } else {
            let path = 'http://localhost:3000/time_saver/' + this.state.match.params.timesaverId
            Promise.all([
                fetch(path)
            ])
            .then(([res1]) => Promise.all([res1.json()]))
            .then(([data1]) => this.setState({
                rows: data1[0]["inputs"],
                data_loaded: true
            }))}
    }


render() {
    if(this.state.data_loaded) {
    return( 
        
        <div className="container-fluid">
            <div className="page-header">
                <div className ="row align-items-bottom">
                    <div className="col-sm mb-2 mb-sm-0">
                        <h1 className="page-header-title text-left align-bottom">{this.state.calc_name}</h1>
                    </div>
                    <div className="col-sm mb-2 mb-sm-0">
                        <div className="text-right">
                            <Button 
                                href="/timesaver"
                                variant="outline-primary"
                            >
                                <XSquareFill/>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
            <Row>
                <Col md={4}>
                <div className="tab-content" id="navTabContent4">
                    <div className="tab-pane fade p-4 show active" id="nav-result4" role="tabpanel" aria-labelledby="nav-resultTab4">
                        <Nav variant="tabs" activeKey={this.state.active_key} onSelect={this.activeNav}>
                            <Nav.Item>
                                <Nav.Link eventKey="form" disabled={this.state.input_nav}>Inputs</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="graph" disabled={this.state.graph_nav}>Graph</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="spreadsheet" disabled={this.state.table_nav}>Table</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
                </Col>
            </Row>
            <Row>
                {this.contentDisplay()}
                  
            </Row>
            <Row>
                <Button onClick={this.testInsert}>
                    Testing
                </Button>
            </Row>
        </div>
        );
    } else {

        return(
            <div>
            </div>)}
}}

export default Automation;