import React, { Component, useState } from "react";
import { Button, Card, FormControl, InputGroup, FormGroup, Row, Col } from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { XSquareFill } from 'react-bootstrap-icons'
import { Redirect } from 'react-router'

class NewProduct extends Component {
    constructor(props) {
      super(props);
      this.state = {
          calc_name: "",
          cadences: {},
          data_loaded: false,
          navActive: "",
          location: this.props.location,
          match: this.props.match,
          calculate_button: false,
          new_row_id: 1,
          redirect: false,
          redirect_id: "",
          request: [{
              name:"",
              description:"",
              cost:"",
              period:"",
              time_save:"",
              time_unit:""
          }]

      };
      
    //creates the list of inputs that are displayed upfront to the user
    }

    handleChange = (e) => {
        let values = [...this.state.request]
        if(e.target.type === "select-one"){
            values[0][e.target.name] = this.state.cadences.find(cadence => e.target.value === cadence._id)
            this.setState({ values })
        } else {
            values[0][e.target.name] = e.target.value
            this.setState({ values })
        }
    }

    onSubmitTask = (e) => {
        const schema = {}
        schema.name = this.state.request[0].name
        schema.description= this.state.request[0].description
        schema.period = this.state.request[0].period.period
        schema.cost = this.state.request[0].cost
        schema.time_save = this.state.request[0].time_save
        schema.time_unit = this.state.request[0].time_unit.period
        schema.deleted = false
        console.log(schema)
        //this will create a new record so should only be run for new calculators
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(schema)
        };

        Promise.all([
            fetch('http://localhost:3000/timesaver/product',requestOptions)
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => this.setState({
            redirect: true,
        }))
    }

    componentDidMount() {
        Promise.all([
            fetch('http://localhost:3000/cadences/list')
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => this.setState({
            cadences: data1,
            data_loaded: true
        }))
    }

    render(){
        const { redirect } = this.state;
        console.log(this.state.request)
        if(this.state.data_loaded) {
            if (redirect) {
                let path = "/for-business/timesaver"
                return <Redirect to={{pathname: path}}/>;
            }
            return(
                <div className="container-fluid">
                    <div className="page-header">
                        <div className ="row align-items-bottom">
                            <div className="col-sm mb-2 mb-sm-0">
                                <h1 className="page-header-title text-left align-bottom">Create Product</h1>
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
                        <Col md={6}>
                            <FormGroup key="name">
                                <label>Product Name</label>
                                <InputGroup>
                                    <FormControl 
                                        type="text"
                                        name="name"
                                        value={this.state.request[0].name}
                                        onChange={this.handleChange.bind(this)}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup key="description">
                                <label>Description</label>
                                <InputGroup>
                                    <FormControl 
                                        as="textarea"
                                        aria-label="With textarea"
                                        type="text"
                                        name="description"
                                        value={this.state.request[0].description}
                                        onChange={this.handleChange.bind(this)}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup key="cost">
                                <label>Cost</label>
                                <InputGroup>
                                    <FormControl 
                                        type="text"
                                        name="cost"
                                        value={this.state.request[0].cost}
                                        onChange={this.handleChange.bind(this)}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup key="period">
                                <label>Period</label>
                                <InputGroup>
                                    <FormControl
                                    as="select"
                                    name="period"
                                    value={this.state.request[0].period._id}
                                    onChange={this.handleChange.bind(this)}>
                                        <React.Fragment>
                                            <option>{this.state.request[0].period.name || 'Choose...'}</option>
                                            {this.state.cadences.map((cadence) => {
                                            return(
                                                <option key={cadence._id} value={cadence._id}>{cadence.name}</option>)})}
                                        </React.Fragment>
                                    </FormControl>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup key="time_save">
                                <label>Time Saved</label>
                                <InputGroup>
                                    <FormControl 
                                        type="text"
                                        name="time_save"
                                        value={this.state.request[0].time_save}
                                        onChange={this.handleChange.bind(this)}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup key="time_unit">
                                <label>Period</label>
                                <InputGroup>
                                    <FormControl
                                    as="select"
                                    name="time_unit"
                                    value={this.state.request[0].time_unit._id}
                                    onChange={this.handleChange.bind(this)}>
                                        <React.Fragment>
                                            <option>{this.state.request[0].time_unit.name || 'Choose...'}</option>
                                            {this.state.cadences.map((cadence) => {
                                            return(
                                                <option key={cadence._id} value={cadence._id}>{cadence.name}</option>)})}
                                        </React.Fragment>
                                    </FormControl>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                        </Col>
                        <Col md={2}>
                            <Button href="for-business/timesaver" variant="outline-secondary" block>Close</Button>
                        </Col>
                        <Col md={2}>
                            <Button variant="primary" block onClick={this.onSubmitTask}>Submit</Button>
                        </Col>
                    </Row>
                </div>
            
            )
        } else {
            return(
                <div></div>
            )
        }
    }
}

export default NewProduct;