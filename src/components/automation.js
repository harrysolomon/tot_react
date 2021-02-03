import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Button, Card, FormControl, InputGroup, FormGroup, FormLabel, Container, Row, Col, Nav, Navbar} from "react-bootstrap";
import { Typeahead, ClearButton } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import _ from 'lodash'




const the_form_inputs = [{
        "inputs":[
            {
                "form_label": "Name of Something",
                "state": "",
                "type": "text",
                "values": [],
                "append": "",
                "size": 3,
                "placeholder": ""
            },
            {
                "form_label": "Product",
                "state": "",
                "type": "select",
                "values": ["Product1", "Product2"],
                "append": "" ,
                "size": 2,
                "placeholder": ""
            },
            {
                "form_label": "Unit",
                "state": "",
                "type": "select",
                "values": ["Time Spent (Hrs)", "Time Spent (Days"] ,
                "append": "",
                "size": 2,
                "placeholder": ""
            },
            {
                "form_label": "Current Time Spent",
                "state": "",
                "type": "text",
                "values": [],
                "append": "",
                "size": 2,
                "placeholder": ""
            },
            {
                "form_label": "Revised Time Spent",
                "state": "",
                "type": "text",
                "values": [],
                "append": "",
                "size": 2,
                "placeholder": ""
            }]
    }]


    const unchanged_inputs = [{
        "inputs":[
            {
                "form_label": "Name of Something",
                "state": "",
                "type": "text",
                "values": [],
                "append": "",
                "size": 3,
                "placeholder": ""
            },
            {
                "form_label": "Product",
                "state": "",
                "type": "select",
                "values": ["Product1", "Product2"],
                "append": "" ,
                "size": 2,
                "placeholder": ""
            },
            {
                "form_label": "Unit",
                "state": "",
                "type": "select",
                "values": ["Time Spent (Hrs)", "Time Spent (Days"] ,
                "append": "",
                "size": 2,
                "placeholder": ""
            },
            {
                "form_label": "Current Time Spent",
                "state": "",
                "type": "text",
                "values": [],
                "append": "",
                "size": 2,
                "placeholder": ""
            },
            {
                "form_label": "Revised Time Spent",
                "state": "",
                "type": "text",
                "values": [],
                "append": "",
                "size": 2,
                "placeholder": ""
            }]
    }]

class Automation extends Component {
    constructor(props) {
      super(props);
      this.state = {
          form_inputs: the_form_inputs,
          unchanged_inputs: unchanged_inputs,
          data_loaded: false,
          open: false,
          data: {},
          options: {},
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

    
    createForm(){
        return(
            <Col>
                <Card>
                    <Card.Body>
                
                {
                    this.state.form_inputs.map((row,row_index) => {
                        //console.log(this.state.form_inputs.find(x => x.form_id == "search"))
                        //console.log(row_index)
                        return(
                        <Row key={row_index}>
                            {
                                row.inputs.map((item,col_index) => {
                                    if(item.type === "text") {
                                        return(
                                            <Col xs={item.size} key={col_index}>
                                                <FormGroup key={col_index}>
                                                    {this.formLabel(row_index,item.form_label)}
                                                    <InputGroup>
                                                        <FormControl 
                                                            name={item.form_label} 
                                                            type={item.type}
                                                            id={col_index} 
                                                            value={item.state||''}
                                                            onChange={this.handleChange.bind(this, row_index, col_index)} 
                                                            aria-describedby="basic-addon2"/>
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        )
                                    } 
                                    else {
                                        return(
                                        <Col xs={item.size} key={col_index}>
                                            <FormGroup>
                                                {this.formLabel(row_index,item.form_label)}
                                                    <FormControl 
                                                        as={item.type}
                                                        value={item.state||''}>
                                                        {item.values.map((options) => {
                                                            return(
                                                        <React.Fragment>
                                                            <option>{options}</option>
                                                        </React.Fragment>)})}
                                                    </FormControl>
                                                </FormGroup>
                                        </Col>)
                                    }
                                })
                            }
                        </Row>)
                        
                    })
                }
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={this.onSubmitTask}>Add Row</Button>
                    </Card.Footer>
                </Card>
            </Col>
        ); 
        }                            
                    

//this is for all the inputs besides the search bar
    handleChange(row, col, event) {
            
        let values = [...this.state.form_inputs];
        values[row].inputs[col].state = event.target.value;
        console.log(this.state.unchanged_inputs)
        
        this.setState({ values });
    }
    
    onSubmitTask = (e) => {
        let new_val = this.state.form_inputs.concat(unchanged_inputs)
        //console.log(new_val)
        this.setState({
           form_inputs: new_val
        })    
    }

    //
    activeNav(eventKey){
        this.setState({ navActive: eventKey})
    }

    supSquad(){
        return (
            <div>
                sup bitches
            </div>
        )
    }

   // this function determines the content to display based on the active nav 
    contentDisplay(){
        if(this.state.navActive === '' || this.state.navActive === "form"){
            return(
                this.createForm())
        } else {
            return(this.supSquad())
        }
    }
        


render() {
    //console.log(this.state.form_inputs.push(this.state.unchanged_inputs))
    return( 
        
        <div className="container-fluid">
            <div className="page-header">
                <div className ="row align-items-center">
                    <div className="col-sm mb-2 mb-sm-0">
                        <h1 className="page-header-title">Give a good title; possible includes prospects name in it</h1>
                    </div>
                </div>
            </div>
            <Row>
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
            </Row>
            <Row>
                {this.contentDisplay()}
                  
            </Row>
        </div>
        );
    };
}

export default Automation;