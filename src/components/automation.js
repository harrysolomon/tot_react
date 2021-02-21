import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Button, Card, FormControl, InputGroup, FormGroup, FormLabel, Container, Row, Col, Nav, Navbar} from "react-bootstrap";
import { Typeahead, ClearButton } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import _ from 'lodash'
import LineChart from '../components/line_chart'
import { XSquare } from 'react-bootstrap-icons'


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
        "id":1,
        "name": "Cool Product",
        "cost": 10000,
        "period": "year"
    },
    {
        "id":2,
        "name":"Another Product",
        "cost": 5000,
        "peiod": "quarter"
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

const the_rows = [{
    "name": "",
    "product": "",
    "current_time_spent":"",
    "employee": "",
    "cadence":""
}]


class Automation extends Component {
    constructor(props) {
      super(props);
      this.state = {
          rows: the_rows,
          products: the_products,
          cadences: the_cadences,
          employees: the_employees,
          data_loaded: false,
          open: false,
          data: line_chart_data["data"],
          options: line_chart_data["options"],
          search_result: [],
          search_detail: [],
          navActive: ""
      };
      this.activeNav = this.activeNav.bind(this)
    //creates the list of inputs that are displayed upfront to the user
    }
   
    formLabel(index,label){
        if(index==0){
            return(
                <FormLabel bsPrefix="form-label text-center">{label}</FormLabel>
            )
        }
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

    tableOption(){
        return(
            <Col>
            <Card>
                <Card.Header>
                    <Col>Inputs</Col>
                    <Col>
                    <div className="text-right">
                        <Button size="sm" variant="outline-primary">
                            Submit
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
                            <tr id="addr0" key={idx}>
                            <td>{idx}</td>
                            <td>
                                
                                <InputGroup>
                                <FormControl
                                type="text"
                                name="name"
                                value={item.name}
                                onChange={this.handleChange.bind(this, idx, "name")}
                                />
                                </InputGroup>
                            </td>
                            <td>
                                <InputGroup>
                                <FormControl
                                as="select"
                                name="product"
                                onChange={this.handleChange.bind(this, idx, "product")}>
                                <React.Fragment>
                                    <option>Choose..</option>
                                {this.state.products.map((product, product_index) => {
                                return(
                                    <option key={product_index} value={product_index}>{product.name}</option>)})}
                                </React.Fragment>
                                </FormControl>
                                </InputGroup>
                            </td>
                            <td>
                                <InputGroup>
                                <FormControl
                                type="text"
                                name="current_time_spent"
                                value={this.state.rows[idx].current_time_spent}
                                onChange={this.handleChange.bind(this, idx, "current_time_spent")}
                                />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="basic-addon1">Hrs</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </td>
                            <td>
                                <InputGroup>
                                <FormControl
                                as="select"
                                name="employee"
                                onChange={this.handleChange.bind(this, idx, "employee")}>
                                <React.Fragment>
                                    <option>Choose..</option>
                                {this.state.employees.map((employee, employee_index) => {
                                return(
                                    <option key={employee_index} value={employee_index}>{employee.name}</option>)})}
                                </React.Fragment>
                                </FormControl>
                                </InputGroup>
                            </td>
                            <td>
                                <InputGroup>
                                <FormControl
                                as="select"
                                name="cadence"
                                onChange={this.handleChange.bind(this, idx, "cadence")}>
                                <React.Fragment>
                                    <option>Choose..</option>
                                {this.state.cadences.map((cadence, cadence_index) => {
                                return(
                                    <option key={cadence_index} value={cadence_index}>{cadence.name}</option>)})}
                                </React.Fragment>
                                </FormControl>
                                </InputGroup>
                            </td>
                            <td className="text-center">
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
        
    handleChange(row, field, event) {
        let values = [...this.state.rows];
        if(event.target.type === "select-one"){
            values[row][field] = this.state.products[event.target.value]
            this.setState({ values });

        } else {
            values[row][field] = event.target.value;
            this.setState({ values });
        }

        
    }

    /*handleSelectChange(row, field, event) {
    
        let values = [...this.state.rows];
        let prod_array = this.state.products.find(event.)
        console.log(field)
        //values[row][field] = event.target.value;
        
        //this.setState({ values });
    }*/

    handleRemoveSpecificRow = (idx) => () => {
        const rows = [...this.state.rows];
        rows.splice(idx, 1);
        this.setState({ rows });
        console.log(this.state.rows);
        };
    
    handleAddRow = (e) => {
        //so the way this would work is assigning this variable to the data returned from the DB? 
        //Or will that ruin assignment?
        //Or we would have to do a post for every row added.
        const new_row = {
            "name": "",
            "product": "",
            "current_time_spent":"",
            "employee": "",
            "cadence":""
        }
        this.setState({
           rows: [...this.state.rows, new_row]
        })    
    }

    //this function determines the active nav
    activeNav(eventKey){
        this.setState({ navActive: eventKey})
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
        if(this.state.navActive === '' || this.state.navActive === "form"){
            return(this.tableOption())
        } else if (this.state.navActive === "graph"){
            return(this.supSquad())
        } else {
            return(this.tableOption())
        }
    }
        


render() {
    //console.log(this.state.form_inputs.push(this.state.unchanged_inputs))
    console.log(this.state.rows)
    return( 
        
        <div className="container-fluid">
            <div className="page-header">
                <div className ="row align-items-bottom">
                    <div className="col-sm mb-2 mb-sm-0">
                        <h1 className="page-header-title text-left align-bottom">Give a good title; possible includes prospects name in it</h1>
                    </div>
                </div>
            </div>
            <Row>
                <Col md={4}>
                <div className="tab-content" id="navTabContent4">
                    <div className="tab-pane fade p-4 show active" id="nav-result4" role="tabpanel" aria-labelledby="nav-resultTab4">
                        <Nav variant="tabs" defaultActiveKey="form" onSelect={this.activeNav}>
                            <Nav.Item>
                                <Nav.Link eventKey="form">Inputs</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="graph">Graph</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="spreadsheet" >Spreadsheet</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
                </Col>
            </Row>
            <Row>
                {this.contentDisplay()}
                  
            </Row>
        </div>
        );
    };
}

export default Automation;