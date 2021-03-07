import React, { Component } from "react";
import { Card, Row, Col, Nav, Button} from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';

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
    "Name","Client","Created Time", "Value"
]

const the_product_cols = [
    "Name","Cost"
]

const the_product_list = [{
    "name": "Accouting Wizard",
    "description": "Automates collection of receipts from client dinners",
    "cost": "$1,000",
    "period": "Month"
}]

const the_employee_cols = [
    "Name", "Salary"
]

/*const the_employee_list = [
    {
        "id": 1,
        "name": "Analyst",
        "department": "Finance",
        "cost": 50000,
        "period": "year"
    },
    {
        "id": 2,
        "name": "Account Management",
        "department": "Sales",
        "cost": 65000,
        "period": "year"
    },
    {
        "id": 3,
        "name": "Account Executive",
        "department": "Sales",
        "cost": 75000,
        "period": "year"
    }
]*/


class ROIList extends Component {
    constructor(props) {
      super(props);
      this.state = {
          columns: the_columns,
          rows: [],
          product_cols: the_product_cols,
          product_list: [],
          employee_cols: the_employee_cols,
          employee_list: [],
          data_loaded: false,
          open: false,
          search_result: [],
          search_detail: [],
          navActive: ""
      };
      this.activeNav = this.activeNav.bind(this)
    //creates the list of inputs that are displayed upfront to the user
    }

    tableOption(){
        return(
            <Col>
            <Card>
                <Card.Header>
                    <Col md={4}>
                        <div>Calculators</div>
                    </Col>
                    <Col>
                        
                    </Col>
                        
                    <Col>
                    <div className="text-right">
                        <Button href="/timesaver/new"> Create New </Button>
                    </div>
                    </Col>
                </Card.Header>
                <Card.Body>
                    <Col md={4}>
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
                                    <a className="media align-items-center" href={"/timesaver/"+item._id}>
                                    <div className="media-body">
                                        <span className="d-block h5 text-hover-primary mb-0">{item.name} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                        <span className="d-block font-size-sm text-body">Harrison Solomon</span>
                                    </div>
                                    </a>
                                </td>
                                <td>
                                    <span className="d-block mb-0">Test Client <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                </td>
                                <td>
                                    <span className="d-block h5 mb-0">{item.createdAt} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                </td>
                                <td>
                                    <span className="d-block h5 mb-0">{item.values[0].value} / {item.values[0].period} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
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
                <Col md={4}>
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
                                <a className="media align-items-center" href="/timesaver/new">
                                <div className="media-body">
                                    <span className="d-block h5 text-hover-primary mb-0">{item.name} 
                                        <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i>
                                    </span>
                                </div>
                                </a>
                            </td>
                            <td>
                                <span className="d-block h5 mb-0">${item.cost} / {item.period} 
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
        )
    }

    employeeList(){
        return(
            <Col>
            <Card>
                <Card.Header>
                    <Col md={4}>
                        <div>Employees</div>
                    </Col>
                    <Col>
                        
                    </Col>
                        
                    <Col>
                    <div className="text-right">
                        <Button>
                            Add Employee
                        </Button>
                    </div>
                    </Col>
                </Card.Header>
                <Card.Body>
                <Col md={4}>
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
                    <div className="table-responsive">
                        <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                            <thead className="thead-light">
                            <tr>
                                {this.state.employee_cols.map((cols, col_idx) => (
                                    <th key={col_idx}> {cols} </th>
                                ))}
                            </tr>
                            </thead>
                        <tbody>
                        {this.state.employee_list.map((item, idx) => (
                            <tr id="addr0">
                            <td>
                                <a className="media align-items-center" href="/timesaver/new">
                                <div className="media-body">
                                    <span className="d-block h5 text-hover-primary mb-0">{item.name} 
                                        <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i>
                                    </span>
                                </div>
                                </a>
                            </td>
                            <td>
                                <span className="d-block h5 mb-0">${item.cost} / {item.period} 
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
        )
    }

    //this function determines the active nav
    activeNav(eventKey){
        this.setState({ navActive: eventKey})
    }

   // this function determines the content to display based on the active nav 
    contentDisplay(){
        if(this.state.navActive === '' || this.state.navActive === "calculators"){
            return(this.tableOption())
        } else if (this.state.navActive === "products"){
            return(this.productList())
        } else {
            return(this.employeeList())
        }
    }

    componentDidMount(){
        Promise.all([
            fetch('http://localhost:3000/timesaver/calculator/list'),
            fetch('http://localhost:3000/timesaver/product/list'),
            fetch('http://localhost:3000/timesaver/employee/list')
        ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(),res2.json(),res3.json()]))
        .then(([data1, data2, data3]) => this.setState({
            rows: data1,
            product_list: data2,
            employee_list: data3,
            data_loaded: true
        }))

    }
        


render() {
    //console.log(this.state.form_inputs.push(this.state.unchanged_inputs))
    if(this.state.data_loaded) {
        console.log(this.state)
    return( 
        
        <div className="container-fluid">
            
            <main id="content" role="main" class="main splitted-content-main bg-light">
            {/*Fluid Content */}
                <div class="splitted-content-fluid content-space">
                <a href="/"><h3 className="page-header-title text-left align-middle">ROY</h3></a>
                <div class="row justify-content-lg-left">
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
                                <Nav.Link eventKey="clients">Employees</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
                </Col>
            </div>
            <Row>
                {this.contentDisplay()}
                  
            </Row>
            </div>
            </main>
        </div>
        )} else {
            return(
                <div></div>
            )
        }
    };
}

export default ROIList;