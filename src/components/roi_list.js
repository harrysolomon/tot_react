import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import { Card, Row, Col, Nav, DropdownButton, Dropdown, Button} from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { XSquare } from 'react-bootstrap-icons'

const the_rows = [{
    "name": "The Best ROI Ever",
    "created_by": "John Doe",
    "created_at": "February 20th, 2021",
    "value":"5,000",
    "type":"Time Saver",
    "client": "Acme Explosives"
},
{
    "name": "The Best ROI Ever",
    "created_by": "John Doe",
    "created_at": "February 20th, 2021",
    "value":"5,000",
    "type":"Time Saver",
    "client": "Acme Explosives"
}]

const the_columns = [
    "Name","Client","ROI Type", "Value"
]

const the_product_cols = [
    "Name", "Description","Cost"
]

const the_product_list = [{
    "name": "Accouting Wizard",
    "cost": "$1,000",
    "period": "Month"
}]


class ROIList extends Component {
    constructor(props) {
      super(props);
      this.state = {
          columns: the_columns,
          rows: the_rows,
          product_cols: the_product_cols,
          product_list: the_product_list,
          data_loaded: false,
          open: false,
          search_result: [],
          search_detail: [],
          navActive: ""
      };
      this.activeNav = this.activeNav.bind(this)
    //creates the list of inputs that are displayed upfront to the user
    }
   
    /*formLabel(index,label){
        if(index==0){
            return(
                <FormLabel bsPrefix="form-label text-center">{label}</FormLabel>
            )
        }
    }*/

    /*inputPrepend(data_type){
        const available_prepends = [""]

        if(available_prepends.includes(data_type)){
            return(
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">{data_type}</InputGroup.Text>
                </InputGroup.Prepend>
            )
            
        }
    }*/

    /*inputAppend(data_type){
        const available_appends = ["Hrs"]

        if(available_appends.includes(data_type)){
            return(
                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon1">{data_type}</InputGroup.Text>
                </InputGroup.Append>
            )
            
        }
    }*/

    tableOption(){
        return(
            <Col>
            <Card>
                <Card.Header>
                    <Col md={4}>
                        <div>Calculators</div>
                        <div class="form-group w-md-50">
                            <div class="input-group input-group-merge">
                                <input type="text" class="js-form-search form-control" placeholder="Search..."></input>
                                <a class="input-group-append" href="javascript:;">
                                <span class="input-group-text">
                                    <i id="clearIconBasicEg" class="tio-clear tio-lg"></i>
                                </span>
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        
                    </Col>
                        
                    <Col>
                    <div className="text-right">
                        <DropdownButton id="dropdown-basic-button" title="Create New">
                            <Dropdown.Item href="/automation">Save Time</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Save Money</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Make Money</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    </Col>
                </Card.Header>
                <Card.Body>
                    <div className="table-responsive">
                        <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                            <thead className="thead-light">
                            <tr>
                                {this.state.columns.map((cols, col_idx) => (
                                    <th key={col_idx}> {cols} </th>
                                ))}
                            </tr>
                            </thead>
                        <tbody>
                        {this.state.rows.map((item, idx) => (
                            <tr id="addr0">
                            <td>
                                <a className="media align-items-center" href="/automation">
                                <div className="media-body">
                                    <span className="d-block h5 text-hover-primary mb-0">{item.name} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                    <span className="d-block font-size-sm text-body">{item.created_by}</span>
                                </div>
                                </a>
                            </td>
                            <td>
                                <span className="d-block h5 mb-0">{item.client} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                            </td>
                            <td>
                                <span className="d-block h5 mb-0">{item.type} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                            </td>
                            <td>
                                <span className="d-block h5 mb-0">{item.value} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                            </td>
                            </tr>))}
                            
                        </tbody>
                    </table>
                    </div>
                </Card.Body>
            </Card>
                
            </Col>
        )}

    productList(){
        return(
            <Col>
            <Card>
                <Card.Header>
                    <Col md={4}>
                        <div>Products</div>
                        <div class="form-group w-md-50">
                            <div class="input-group input-group-merge">
                                <input type="text" class="js-form-search form-control" placeholder="Search..."></input>
                                <a class="input-group-append" href="javascript:;">
                                <span class="input-group-text">
                                    <i id="clearIconBasicEg" class="tio-clear tio-lg"></i>
                                </span>
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        
                    </Col>
                        
                    <Col>
                    <div className="text-right">
                        <Button>
                            Add Product
                        </Button>
                    </div>
                    </Col>
                </Card.Header>
                <Card.Body>
                    <div className="table-responsive">
                        <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                            <thead className="thead-light">
                            <tr>
                                {this.state.product_cols.map((cols, col_idx) => (
                                    <th key={col_idx}> {cols} </th>
                                ))}
                            </tr>
                            </thead>
                        <tbody>
                        {this.state.product_list.map((item, idx) => (
                            <tr id="addr0">
                            <td>
                                <a className="media align-items-center" href="/automation">
                                <div className="media-body">
                                    <span className="d-block h5 text-hover-primary mb-0">{item.name} 
                                        <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i>
                                    </span>
                                </div>
                                </a>
                            </td>
                            <td>
                                <span className="d-block h5 mb-0">Automates collection of receipts from client dinners
                                    <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i>
                                </span>
                            </td>
                            <td>
                                <span className="d-block h5 mb-0">{item.cost}/{item.period} 
                                    <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i>
                                </span>
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
        this.setState({ navActive: eventKey})
    }

    supSquad(){
        return (
            <div>
                Yo Yo
            </div>

        )
    }

   // this function determines the content to display based on the active nav 
    contentDisplay(){
        if(this.state.navActive === '' || this.state.navActive === "calculators"){
            return(this.tableOption())
        } else if (this.state.navActive === "products"){
            return(this.productList())
        } else {
            return(this.supSquad())
        }
    }
        


render() {
    //console.log(this.state.form_inputs.push(this.state.unchanged_inputs))
    return( 
        
        <div className="container-fluid">
            <h3 className="page-header-title text-left align-middle">ROY</h3>
            <Row>
                <Col md={4}>
                <div className="tab-content" id="navTabContent4">
                    <div className="tab-pane fade p-4 show active" id="nav-result4" role="tabpanel" aria-labelledby="nav-resultTab4">
                        <Nav variant="tabs" defaultActiveKey="calculators" onSelect={this.activeNav}>
                            <Nav.Item>
                                <Nav.Link eventKey="calculators">Calculators</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="products">Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients">Clients</Nav.Link>
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

export default ROIList;