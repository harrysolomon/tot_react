import React, { Component } from "react";
import { Button, Card, FormControl, InputGroup, FormGroup, Row, Col } from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { XSquareFill } from 'react-bootstrap-icons'
import { Redirect } from 'react-router'
import { config } from '../../constants'
import { cadences } from '../../cadences'

const num_only_inputs = ["current_time_spent"]

class EditTimeSaver extends Component {
    constructor(props) {
      super(props);
      this.state = {
          rows: [],
          calc_name: "",
          products: {},
          employees: {},
          cadences: cadences,
          current_time_spent_period: {},
          data_loaded: false,
          navActive: "",
          location: this.props.location,
          match: this.props.match,
          calculate_button: false,
          new_row_id: 1,
          redirect: false,
          redirect_id: "",
          regexp : /^[0-9\b]+$/

      };
      
    //creates the list of inputs that are displayed upfront to the user
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
                            <tr id={idx} key={item._id}>
                            <td key="row_numbr">{idx}</td>
                            <td key="name">
                                
                                <InputGroup>
                                    <FormControl
                                    type="text"
                                    name="name"
                                    value={item.name}
                                    onChange={this.handleChange.bind(this, idx, "name")}
                                    />
                                </InputGroup>
                            </td>
                            <td key="product">
                                <InputGroup>
                                    <FormControl
                                    as="select"
                                    name="products"
                                    value={item.products._id}
                                    onChange={this.handleChange.bind(this, idx, "products")}>
                                    <option>{item.products.name || 'Choose...'}</option>
                                    {this.state.products.map((product) => {
                                    if(item.products._id === product._id){}
                                    else{
                                    return(
                                        <option key={product._id} value={product._id}>{product.name}</option>)}})}
                                    </FormControl>
                                </InputGroup>
                            </td>
                            <td key="timespent">
                                <Row>
                                    <InputGroup>
                                        <Col md={6}>
                                            <FormControl
                                            type="text"
                                            name="current_time_spent"
                                            value={item.current_time_spent}
                                            onChange={this.handleChange.bind(this, idx, "current_time_spent")}
                                            />
                                        </Col>
                                        <Col md={6} key="current_time_spent_period">
                                            <InputGroup.Append>
                                                <InputGroup>
                                                    <FormControl
                                                    as="select"
                                                    name="cadences"
                                                    value={item.current_time_spent_period._id}
                                                    onChange={this.handleChange.bind(this, idx, "current_time_spent_period")}>
                                                        <React.Fragment>
                                                            <option>{item.current_time_spent_period.abbr || 'Choose...'}</option>
                                                            {this.state.cadences.map((cadence) => {
                                                        if(item.current_time_spent_period._id === cadence._id){}
                                                        else{
                                                        return(
                                                            <option key={cadence._id} value={cadence._id}>{cadence.abbr}</option>)}})}
                                                        </React.Fragment>
                                                    </FormControl>
                                                </InputGroup>
                                            </InputGroup.Append>
                                        </Col>
                                    </InputGroup>
                                </Row>
                            </td>
                            <td key="employees">
                                <InputGroup>
                                    <FormControl
                                    as="select"
                                    name="employees"
                                    value={item.employees._id}
                                    onChange={this.handleChange.bind(this, idx, "employees")}>
                                        <React.Fragment>
                                            <option>{item.employees.name || 'Choose...'}</option>
                                            {this.state.employees.map((employee) => {
                                        if(item.employees._id === employee._id){}
                                        else{
                                        return(
                                            <option key={employee._id} value={employee._id}>{employee.name}</option>)}})}
                                        </React.Fragment>
                                    </FormControl>
                                </InputGroup>
                            </td>
                            <td key="cadence">
                                <InputGroup>
                                    <FormControl
                                    as="select"
                                    name="cadences"
                                    value={item.cadences._id}
                                    onChange={this.handleChange.bind(this, idx, "cadences")}>
                                        <React.Fragment>
                                            <option>{item.cadences.name || 'Choose...'}</option>
                                            {this.state.cadences.map((cadence) => {
                                        if(item.cadences._id === cadence._id){}
                                        else{
                                        return(
                                            <option key={cadence._id} value={cadence._id}>{cadence.name}</option>)}})}
                                        </React.Fragment>
                                    </FormControl>
                                </InputGroup>
                            </td>
                            <td className="text-center" key="removebutton">
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
        
        //Handle change for the select dropdown
        if(event.target.type === "select-one"){
            values[row][field] = this.state[event.target.name].find(product => event.target.value === product._id)
            this.setState({ values });

        //Handle change for inputs that must be numbers
        } else if(num_only_inputs.includes(field)){
            let num_input = event.target.value
            if(num_input === '' || this.state.regexp.test(num_input)){
                values[row][field] = event.target.value;
                this.setState({ values });
                
            }
        //Handle change for inputs that are strings
        } else {
            values[row][field] = event.target.value;
            this.setState({ values });
        }
        
    }

    handleNameChange = (e) => {
        this.setState({
            calc_name: e.target.value
        })
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
            "_id": this.state.new_row_id +1,
            "name": "",
            "products": "",
            "current_time_spent":"",
            "current_time_spent_period":"",
            "employees": "",
            "cadences":""
        }
        
        this.setState(
            { 
                rows: [...this.state.rows, new_row],
                new_row_id: this.state.new_row_id + 1
            }
        )
        
    }

    onSubmitTask = (e) => {
        const schema = {}
        //this is tech debt. I need to remove values from the request and have it update on response
        schema.name = this.state.calc_name
        schema.inputs = []
        this.state.rows.map((item, idx) => {
            schema.inputs[idx] = {}
            
            /*if(typeof item._id === "string") {
                schema["_id"] = item._id
            }*/
            schema.inputs[idx].products = item.products 
            schema.inputs[idx].cadences = item.cadences 
            schema.inputs[idx].employees = item.employees
            schema.inputs[idx].current_time_spent = item.current_time_spent
            schema.inputs[idx].current_time_spent_period = item.current_time_spent_period
            schema.inputs[idx].name = item.name

        })

        //this will be the put route instead for the edit mode
        let path = config.url.API_URL + 'timesaver/edit/' + this.state.match.params.timesaverId 
        const requestOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(schema)
        };

        Promise.all([
            fetch(path,requestOptions)
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => this.setState({
            redirect: true,
            redirect_id: data1["_id"]
        }))
    }

    componentDidMount() {
        console.log(this.state.match)
        let path = config.url.API_URL + 'timesaver/' + this.state.match.params.timesaverId
        
        const productRequestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(["_id", "name", "cost", "period", "time_save", "time_unit"])
        };

        const employeeRequestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(["_id", "name", "cost", "period"])
        };


        Promise.all([
            fetch(path),
            fetch(config.url.API_URL + 'timesaver/product/list',productRequestOptions),
            fetch(config.url.API_URL + 'timesaver/employee/list',employeeRequestOptions)
        ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(),res2.json(),res3.json()]))
        .then(([data1, data2, data3]) => this.setState({
            rows: data1.meta[0].inputs,
            calc_name: data1.meta[0].name,
            products: data2,
            employees: data3,
            data_loaded: true
        }))
    }


render() {
    const { redirect } = this.state;
    if(this.state.data_loaded) {
        if (redirect) {
            let path = "/for-business/timesaver/"+this.state.redirect_id
            return <Redirect to={{pathname: path}}/>;
        }
    return( 
        
        <div className="container-fluid">
            <div className="page-header">
                <div className ="row align-items-bottom">
                    <div className="col-sm mb-2 mb-sm-0">
                        <h1 className="page-header-title text-left align-bottom">Time Saver</h1>
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
            <FormGroup key="name">
                <label>Time Saver Name
                </label>
                <InputGroup>
                    <FormControl 
                        type="text"
                        name="time_saver_name"
                        value={this.state.calc_name}
                        onChange={this.handleNameChange.bind(this)}/>
                </InputGroup>
            </FormGroup>
            </Col>
            </Row>
            <Row>
                {this.tableOption()}
                  
            </Row>
        </div>
        );
    } else {

        return(
            <div>
            </div>)}
}}

export default EditTimeSaver;