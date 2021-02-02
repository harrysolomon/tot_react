import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Card, FormControl, InputGroup, FormGroup, Container, Row, Col, Button, Nav, Navbar, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Typeahead, ClearButton } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import _ from 'lodash'
import BootstrapTable from 'react-bootstrap-table-next';
import { PencilFill } from 'react-bootstrap-icons'
//import cellEditFactory from 'react-bootstrap-table2-editor';

const columns = [{
    dataField: 'period',
    text: 'Year'
  }, {
    dataField: 'cost',
    text: 'Cost'
  }];

  const products = [{
      period: 1,
      cost: 50000
  },
  {
    period: 2,
    cost: 50000
},
{
    period: 3,
    cost: 50000
},
{
    period: 4,
    cost: 50000
},
{
    period: 5,
    cost: 0
}
]

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Edit your selections
    </Tooltip>
  );




class TestingFormInput extends Component {
    constructor(props) {
      super(props);
      this.state = {
          form_inputs: [],
          data_loaded: false,
          open: false,
          costModalOpen: false,
          data: {},
          options: {},
          search_result: [],
          search_detail: [],
      };
      
      this.keyCount = 0
      this.getKey = this.getKey.bind(this)

    //creates the list of inputs that are displayed upfront to the user
    }

    getKey(){
        return this.keyCount++;
    }
    
    createSearch(){
        return(
            <FormGroup>
                <label htmlFor="search">{this.state.search_detail[0]["search_name"]}
                </label>
                <Typeahead
                    id="onclear-example"
                    defaultInputValue={this.state.search_detail[0]["default_value"]}
                    labelKey={this.state.search_detail[0]["label_key"]}
                    options={this.state.search_result}
                    placeholder="Choose a College..."
                    onInputChange={_.debounce(this.handleSearchInputChange,300)}
                    onChange={this.handleSearchChange}>
                    {({ onClear, selected }) => (
                    <div className="rbt-aux">
                        {!!selected.length && <ClearButton onClick={onClear} />}
                        {/*{!selected.length && <Spinner animation="grow" size="sm" />}*/}
                    </div>
                    )}
                </Typeahead>
            </FormGroup>
        )
    }
                        
    
    createForm(){
        return(
            <div>
                
                {
                    this.state.form_inputs.map((items,row_index) => {
                        //console.log(this.state.form_inputs.find(x => x.form_id == "search"))
                        //console.log(row_index)
                        return(
                        <Row key={row_index}>
                            {
                                items.inputs.map((item,col_index) => {
                                    //need to come up with a way to give each input a unique key for the handle change event
                                    let key = this.getKey()
                                    //console.log(key);
                                    return(
                                        <Col key={col_index}>
                                            <FormGroup key={col_index}>
                                                <label htmlFor={item.form_id}>{item.form_name}
                                                </label>
                                                <InputGroup>
                                                    <FormControl 
                                                        name={item.form_id} 
                                                        type="text" 
                                                        id={item.form_id} 
                                                        value={item.state||''} 
                                                        onChange={this.handleChange.bind(this, row_index, col_index)} 
                                                        placeholder={item.default_value} 
                                                        aria-describedby="basic-addon2"/>
                                                    <InputGroup.Append>
                                                        <InputGroup.Text id="basic-addon2">{item.type}</InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    )
                                })
                                
                            }
                        </Row>)
                        
                    })
                }
            </div>
        ); 
     }

     createMgmtButtons() {
         return (
             <Row>
                 <Col>
                    <Button variant="outline-info" size="sm">Manage Loan</Button>
                 </Col>
                <Col>
                    <Button variant="outline-info" size="sm" onClick={this.handleCostModal}>Manage Cost</Button>
                </Col>
                <Col>
                    <Button variant="outline-info" size="sm">Manage Revenue</Button>
                </Col>
            </Row>

         )
     }

     costModal() {
         return (
             <Modal 
                size="lg"
                show={this.state.costModalOpen}
                onHide={this.handleCostModal}>
                 <Modal.Header>
                 <Container fluid>
                    <Navbar expand="lg" variant="light" bg="light" fluid>
                        <Nav fill variant="tabs" defaultActiveKey="link-1">
                            <Nav.Item>
                                <Nav.Link eventKey="link-1">Cost</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2">Salary</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-3">Loan</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </Container>
                 </Modal.Header>
                 <Modal.Body>
                     <BootstrapTable
                        keyField="period"
                        data={ products }
                        columns={ columns }
                        />
                 </Modal.Body>
             </Modal>
         )
     }



     

    onOpenTask = (e) => {
        //This is the open action for the additional input accordion
        this.setState(prevState => ({
            open: !prevState.open
          }));
    }

    handleCostModal = (e) => {
        this.setState(prevState => ({
            costModalOpen: !prevState.costModalOpen
        }))
    }

    handleSearchInputChange = (i) => {
        //I should have some data to start with via the component did mount function instead of a no results found field
        //Need to add the text search string. The search is case insensitive so that's great! But something to consider next go-around
        
        let main = 'https://api.data.gov/ed/collegescorecard/v1/schools.json?'
        let api_key = 'api_key=ro4hAT4oZs4MhyZDBrAqSEmg3vYCQOTJ2wAT0OEP'
        let fixed_filter = '&school.degrees_awarded.predominant=2,3&school.name='
        let variable_filter = encodeURI(i)
        let fields = '&fields=school.name,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state'
        let url = main.concat(api_key,fixed_filter,variable_filter,fields)

        Promise.all([
            fetch(url)
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => this.setState({
            search_result: data1["results"]
        }))

        //need to think about encoding for words with spaces
      }

    handleSearchChange = (selectedOptions) => {
        //some schools do not have out of state tuition prices. How shall we handle?
        //This loops through all of the search details and maps the result from the search to its dependent form input id
        
        if(selectedOptions.length !== 0) {
            this.state.search_detail[0]["dependencies"].map((item) => {
                let index = this.state.form_inputs.findIndex(x => x._id === item.dependent_id);
                let values = [...this.state.form_inputs];
                    values[index].state = selectedOptions[0][item.col_ref]
                this.setState({ values })

            })
        }
        
    }
//this is for all the inputs besides the search bar
    handleChange(row, col, event) {
        
        let values = [...this.state.form_inputs];
        values[row].inputs[col].state = event.target.value;
        
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
            fetch(`http://localhost:3000/5fac52be03ff66099d9a8ef4/test_input`),
            fetch('http://localhost:3000/5fac52be03ff66099d9a8ef4/line_chart',requestOptions),
            fetch('https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=ro4hAT4oZs4MhyZDBrAqSEmg3vYCQOTJ2wAT0OEP&school.degrees_awarded.predominant=2,3&school.main_campus=1&fields=school.name,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state'),
            fetch('http://localhost:3000/5fac52be03ff66099d9a8ef4/search_detail')
        ])
        .then(([res1, res2, res3, res4]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]))
        .then(([data1, data2, data3, data4]) => this.setState({
            form_inputs: data1,
            data: data2["data"],
            options: data2["options"],
            data_loaded: true,
            search_result: data3["results"],
            search_detail: data4

        }))
    }


render() {

// React Chart js requirement for having each dataset be represented by a unique key
    const datasetKeyProvider=()=>{ 
        return btoa(Math.random()).substring(0,12)
    } 
    console.log(this.state.form_inputs)
    if(this.state.data_loaded) {
        return( 
            <div>
                    
                    <section className="jumbotron text-center">
                        <div className="container">
                            <p className="lead text-muted">According to the Bureau of Labor Statistics, after 10 years, you will make more money going to Harvard vs not going to college at all.</p>
                        </div>
                    </section>
                    {/* start of second row*/}
                    <div className="container-fluid d-flex full-height align-items-center bg-light">
                        <Row>
                            {/*Line Chart*/}
                            <Col md={8}>
                                <div className="card h-100">
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
                                </div>
                            </Col>

                            {/*Chart End*/}

                            <Col sm={4}>
                                <div className="card h-100">
                                    <Card.Header>
                                        Bachelors Degree
                                        
                                        <OverlayTrigger
                                            placement="auto"
                                            
                                            overlay={renderTooltip}
                                        >
                                            <Button 
                                                onClick={this.handleCostModal}
                                                variant="outline-secondary"
                                            >
                                                <PencilFill/>
                                            </Button>
                                        </OverlayTrigger>
                                        {this.costModal()}
                                        
                                    </Card.Header>
                                    <Card.Body>
                                        
                                        {this.createSearch()}
                                        {this.createForm()}
                                        
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="primary" onClick={this.onSubmitTask}>
                                                Submit
                                        </Button>{' '}
                                        <Button variant="secondary">
                                                Save
                                        </Button>{' '}
                                    </Card.Footer>
                                    
                                </div>
                            </Col>
                        </Row>
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

export default TestingFormInput;