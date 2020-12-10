import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Card, FormControl, InputGroup, FormGroup, Container, Row, Col, Button, Collapse, Spinner } from "react-bootstrap";
import { Typeahead, ClearButton } from 'react-bootstrap-typeahead';
import statesData from './data';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import _ from 'lodash'




class FinalResult extends Component {
    constructor(props) {
      super(props);
      this.state = {
          form_inputs: [],
          data_loaded: false,
          open: false,
          data: {},
          options: {}
      };

    //creates the list of inputs that are displayed upfront to the user
    }

    /*filterBy(statesData, state) {
        if (this.state.selected.length) {
          return true;
        }
        return statesData.label.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
      }*/

    createForm(){
        return(
            <div>
                <FormGroup>
                    <label htmlFor="college_search">College
                    </label>
                    <Typeahead
                        id="onclear-example"
                        options={statesData}
                        placeholder="Choose a College..."
                        onInputChange={_.debounce(this.handleSearchInputChange,1000)}
                        onChange={this.handleSearchChange}>
                        {({ onClear, selected }) => (
                        <div className="rbt-aux">
                            {!!selected.length && <ClearButton onClick={onClear} />}
                            {/*{!selected.length && <Spinner animation="grow" size="sm" />}*/}
                        </div>
                        )}
                    </Typeahead>
                </FormGroup>
                {
                    this.state.form_inputs.map((item,i) => {
                        if(!item.hidden) {
                            return(
                            <FormGroup key={i}>
                            <label htmlFor={item.form_id}>{item.form_name}
                            </label>
                            <InputGroup>
                                <FormControl 
                                    name={item.form_id} 
                                    type="text" 
                                    id={item.form_id} 
                                    value={item.state||''} 
                                    onChange={this.handleChange.bind(this, i)} 
                                    placeholder={item.default_value} 
                                    aria-describedby="basic-addon2"/>
                                <InputGroup.Append>
                                    <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </FormGroup>);}
                    })
                }
            </div>
        ); 
     }

     //creates the list of inputs that are hidden initially from the user
     Accordion() {
        //Need some added padding below the additional inputs button
        return (
                    <>
                    <Button 
                        variant="light" 
                        size="lg" 
                        onClick={this.onOpenTask}
                        aria-controls="example-collapse-text"
                        aria-expanded={this.state.open}
                        block
                    >
                        Additional Inputs
                    </Button>
                    <Collapse in={this.state.open}>
                        <div>
                            {
                                this.state.form_inputs.map((item,i) => {
                                    if(item.hidden) {
                                        return(
                                            <FormGroup key={i}>
                                                <label htmlFor={item.form_id}>{item.form_name}
                                                </label>
                                                <InputGroup>
                                                    <FormControl
                                                        name={item.form_id} 
                                                        type="text" id={item.form_id} 
                                                        value={item.state||''} 
                                                        onChange={this.handleChange.bind(this, i)} 
                                                        placeholder={item.default_value} 
                                                        aria-describedby="basic-addon2"
                                                    />
                                                    <InputGroup.Append>
                                                        <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </FormGroup>
                                        );
                                    }
                                })
                            }
                        </div>
                    </Collapse>
                    </>
        );
    }

    onOpenTask = (e) => {
        this.setState(prevState => ({
            open: !prevState.open
          }));
    }

    handleSearchInputChange(input, e) {
        console.log("value", input)
        //need to think about encoding for words with spaces
      }

    handleSearchChange(selectedOptions) {
        console.log(selectedOptions);
        
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
            data: data1["data"],
            options: data1["options"],
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
            data: data2["data"],
            options: data2["options"],
            data_loaded: true
        }))
    }


render() {

// React Chart js requirement for having each dataset be represented by a unique key
    const datasetKeyProvider=()=>{ 
        return btoa(Math.random()).substring(0,12)
    } 

    if(this.state.data_loaded) {
        //console.log(this.selected);
        return( 
            <Container fluid>
                    {/*}
                    <Link to="/">
                        <div className="page-header">
                            <div className ="row align-items-center">
                                <div className="col-sm mb-2 mb-sm-0">
                                    <h1 className="page-header-title">This or That?</h1>
                                </div>
                            </div>
                        </div>
                    </Link>*/}
                    
                    <section className="jumbotron text-center">
                        <div className="container">
                            <p className="lead text-muted">According to BLS, great investment!</p>
                        </div>
                    </section>
                    {/* start of second row*/}
                    <Row>
                        {/*Line Chart*/}
                        <Col md={8}>
                            <Card>
                                <div className="tab-content" id="navTabContent1">
                                    <div className="tab-pane fade p-4 show active" id="nav-result1" role="tabpanel" aria-labelledby="nav-resultTab1">
                                        {/*Chart Legends*/}
                                        <div className="row align-items-sm-center mb-4">
                                            <div className="col-sm mb-3 mb-sm-0"></div>
                                            <div className="col-sm-auto">
                                                <div className="row font-size-sm">
                                                    <div className="col-auto">
                                                        <span className="legend-indicator bg-primary"></span> Bachelors Degree
                                                    </div>
                                        
                                                    <div className="col-auto">
                                                        <span className="legend-indicator bg-info"></span> High School Diploma
                                                    </div>
                                                </div>
                                            </div>
                                         </div>
                                
                                        <Line data={this.state.data} datasetKeyProvider={datasetKeyProvider} options={this.state.options}/>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        {/*Chart End*/}

                        <Col sm={4}>
                            <Card>
                                <Card.Header>
                                    Bachelors Degree
                                </Card.Header>
                                <Card.Body>
                                    {this.createForm()}
                                    {this.Accordion()}
                                    <Card.Footer>
                                        <Button variant="primary" onClick={this.onSubmitTask}>
                                            Submit
                                        </Button>
                                    </Card.Footer>
                                </Card.Body>
                                
                            </Card>
                        </Col>
                    </Row>
            </Container>
        );
    } else {
        return (
            <div>
            </div>
        )}
}
}

export default FinalResult;
        