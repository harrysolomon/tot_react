import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Button, Card, FormControl, InputGroup, FormGroup, FormLabel, Container, Row, Col, Nav, Navbar} from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import _ from 'lodash'
import LineChart from '../../library/line_chart'
import { XSquareFill } from 'react-bootstrap-icons'
import { Redirect } from 'react-router'

const the_columns = [
    "Name","Product","Current Time Spent", "Employee","Cadence"
]

class TimeSaverView extends Component {
    constructor(props) {
      super(props);
      this.state = {
          rows: [],
          columns: the_columns,
          calc_name: "",
          data_loaded: false,
          open: false,
          data: {},
          options: {},
          location: this.props.location,
          match: this.props.match,
          calculate_button: false,
          input_nav: false,
          graph_nav: true,
          table_nav: true,
          active_key: "graph",
          new_row_id: 1,
          redirect: false,
          redirect_id: ""

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

    tableOption(){
        return(
            <Col>
                <Card>
                    <Card.Header>
                        <Col md={4}>
                            <div>Inputs</div>
                        </Col>
                        <Col>
                            
                        </Col>
                            
                        <Col>
                        <div className="text-right">
                            <Button href={"/for-business/timesaver/"+this.state.match.params.timesaverId+"/edit"}> Edit </Button>
                        </div>
                        </Col>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive">
                            <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                <thead>
                                    <tr>
                                        <th> Name </th>
                                        <th> Product </th>
                                        <th> Current Time Spent </th>
                                        <th> Employee </th>
                                        <th> Cadence </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.rows.map((item, idx) => (
                                    <tr key={item._id}>
                                        <td key="name">
                                            <div className="media-body">
                                                <span className="d-block h5 text-hover-primary mb-0">{item.name} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                            </div>
                                        </td>
                                        <td key="products">
                                            <span className="d-block h5 mb-0">{item.products.name} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                        </td>   
                                        <td key="current_time_spent">
                                            <span className="d-block h5 mb-0">{item.current_time_spent}hrs <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                        </td>
                                        <td key="employees">
                                            <span className="d-block h5 mb-0">{item.employees.name}<i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                        </td>
                                        <td key="cadence">
                                            <span className="d-block h5 mb-0">{item.cadences.name}<i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                        </td>
                                    </tr>))}
                                    
                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        )}

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
            return(
                <div>
                    Not Built Yet
                </div>
            )
        }
    }

    onSubmitTask = (e) => {
        const schema = {}
        schema.name = this.state.calc_name
        schema.inputs = []
        this.state.rows.map((item, idx) => {
            schema.inputs[idx] = {}
            
            if(typeof item._id === "string") {
                schema["_id"] = item._id
            }
            schema.inputs[idx].products = item.products 
            schema.inputs[idx].cadences = item.cadences 
            schema.inputs[idx].employees = item.employees
            schema.inputs[idx].current_time_spent = item.current_time_spent
            schema.inputs[idx].name = item.name

        })
        //this will create a new record so should only be run for new calculators
        if(this.state.match.params.timesaverId === 'new'){
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
                active_key: "graph",
                redirect: true,
                redirect_id: data1["_id"]
            }))
        }
    }

    componentDidMount() {
        let path = 'http://localhost:3000/timesaver/' + this.state.match.params.timesaverId
        Promise.all([
            fetch(path)
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => this.setState({
            rows: data1.meta[0].inputs,
            data_loaded: true,
            graph_nav: false,
            table_nav: false,
            calc_name: data1.meta[0].name,
            data: data1.graph_data.data,
            options: data1.graph_data.options
        }))
    }


render() {
    const { redirect } = this.state;
    if(this.state.data_loaded) {
        if (redirect) {
            let path = "/timesaver/"+this.state.redirect_id
            return <Redirect to={path}/>;
        }

        console.log(this.state.rows)
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
                                href="/for-business/timesaver"
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
                                <Nav.Link eventKey="graph" disabled={this.state.graph_nav}>Graph</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="spreadsheet" disabled={this.state.table_nav}>Table</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="form" disabled={this.state.input_nav}>Inputs</Nav.Link>
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
    } else {

        return(
            <div>
            </div>)}
}}

export default TimeSaverView;