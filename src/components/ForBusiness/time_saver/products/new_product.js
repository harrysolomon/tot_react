import React, { Component } from "react";
import { Button, FormControl, InputGroup, FormGroup, Row, Col } from "react-bootstrap";
import { XSquareFill } from 'react-bootstrap-icons'
import { Redirect } from 'react-router'

const num_only_inputs = ["cost","time_save"]

const the_units = [
    {
      "_id": "1",
      "cost": "Daily",
      "time_unit": "Days",
      "period": "day"
    },
    {
        "_id": "2",
        "cost": "Hourly",
        "time_unit": "Hours",
        "period": "hour"
    },
    {
        "_id": "3",
        "cost": "Weekly",
        "time_unit": "Weeks",
        "period": "week"
    },
    {
        "_id": "4",
        "cost": "Monthly",
        "time_unit": "Months",
        "period": "month"
    },
    {
        "_id": "5",
        "cost": "Annually",
        "time_unit": "Years",
        "period": "year"
    }
  ]
class NewProduct extends Component {
    constructor(props) {
      super(props);
      this.state = {
          units: the_units,
          data_loaded: false,
          location: this.props.location,
          match: this.props.match,
          calculate_button: false,
          redirect: false,
          request: [{
              name:"",
              description:"",
              cost:"",
              period:"",
              time_save:"",
              time_unit:""
          }],
          regexp : /^[0-9\b]+$/

      };
      
    //creates the list of inputs that are displayed upfront to the user
    }

    handleChange = (e) => {
        let values = [...this.state.request]
        //Handle change for dropdown
        if(e.target.type === "select-one"){
            values[0][e.target.name] = this.state.units.find(unit => e.target.value === unit._id)
            this.setState({ values })
        //Handle change for number only inputs
        } else if(num_only_inputs.includes(e.target.name)){
            let num_input = e.target.value
            if(num_input === '' || this.state.regexp.test(num_input))
            values[0][e.target.name] = e.target.value
            this.setState({ values })
        //Handle change for string input
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

    render(){
        const { redirect } = this.state;
        console.log(this.state.request)
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
                                        <option>{this.state.request[0].period.cost || 'Choose...'}</option>
                                        {this.state.units.map((unit) => {
                                        if(this.state.request[0].period._id === unit._id){}
                                        else{
                                        return(
                                            <option key={unit._id} value={unit._id}>{unit.cost}</option>)}})}
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
                                        <option>{this.state.request[0].time_unit.time_unit || 'Choose...'}</option>
                                        {this.state.units.map((unit) => {
                                        if(this.state.request[0].time_unit._id === unit._id){}
                                        else{
                                        return(
                                            <option key={unit._id} value={unit._id}>{unit.time_unit}</option>)}})}
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
                        <Button href="/for-business/timesaver" variant="outline-secondary" block>Close</Button>
                    </Col>
                    <Col md={2}>
                        <Button variant="primary" block onClick={this.onSubmitTask}>Submit</Button>
                    </Col>
                </Row>
            </div>
        
        )
    }
}

export default NewProduct;