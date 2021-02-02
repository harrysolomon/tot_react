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
                "default_value": "",
                "type": "text",
                "values": [],
                "append": "",
                "size": 3
            },
            {
                "form_label": "Product",
                "default_value": "",
                "type": "select",
                "values": ["Product1", "Product2"],
                "append": "" ,
                "size": 2
            },
            {
                "form_label": "Unit",
                "default_value": "",
                "type": "select",
                "values": ["Time Spent (Hrs)", "Time Spent (Days"] ,
                "append": "",
                "size": 2
            },
            {
                "form_label": "Current Time Spent",
                "default_value": "",
                "type": "text",
                "values": [],
                "append": "",
                "size": 2
            },
            {
                "form_label": "Revised Time Spent",
                "default_value": "",
                "type": "text",
                "values": [],
                "append": "",
                "size": 2
            }]
    }]

class Automation extends Component {
    constructor(props) {
      super(props);
      this.state = {
          form_inputs: the_form_inputs,
          unchanged_inputs: the_form_inputs,
          data_loaded: false,
          open: false,
          data: {},
          options: {},
          search_result: [],
          search_detail: []
      };

    //creates the list of inputs that are displayed upfront to the user
    }
   
    formLabel(index,label){
        if(index==0){
            return(
                <FormLabel>{label}</FormLabel>
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
                                                            value={item.default_value||''}
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
                                                    <FormControl as={item.type}>
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
     handleChange(i, event) {
        let values = [...this.state.form_inputs];

        values[i].state = event.target.value;
        this.setState({ values });
     }
    
    onSubmitTask = (e) => {
        this.setState({
           form_inputs: this.state.form_inputs.concat(this.state.unchanged_inputs)
        })    
    }


render() {
    console.log(this.state.form_inputs.concat(this.state.form_inputs))
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
                        <Nav variant="tabs" defaultActiveKey="link-0">
                            <Nav.Item>
                                <Nav.Link eventKey="link-0">Inputs</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-1">Graph</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="disabled">Spreadsheet</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
            </Row>
            <Row>
                {this.createForm()}
                  
            </Row>
        </div>
        );
    };
}

export default Automation;