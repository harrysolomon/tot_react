import React, { Component } from "react";
import { Card, Row, Col, Nav, Button, FormControl} from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { config } from '../../../../constants'
import { cadences } from '../../../../cadences'

const the_columns = [
    "Name","Client","Created Time", "Value"         
]

const the_product_cols = [
    "Name","Description","Cost"
]

const the_employee_cols = [
    "Name", "Department","Salary"
]


class ROIList extends Component {
    constructor(props) {
      super(props);
      this.state = {
          columns: the_columns,
          rows: [],
          cadences: cadences,
          product_cols: the_product_cols,
          product_list: [],
          employee_cols: the_employee_cols,
          employee_list: [],
          data_loaded: false,
          open: false,
          search_result: [],
          search_detail: [],
          navActive: "",
          value_period: cadences.find(cadence => cadence.period === "year")
      };
      this.activeNav = this.activeNav.bind(this)
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
                        <Button href="/for-business/timesaver/new"> Create New </Button>
                    </div>
                    </Col>
                </Card.Header>
                <Card.Body>
                    <Row>
                    <Col md={4}>
                        <div className="form-group w-md-50">
                            <div className="input-group input-group-merge">
                                <input type="text" className="js-form-search form-control" placeholder="Search..."></input>
                                <a className="input-group-append">
                                <span className="input-group-text">
                                    <i id="clearIconBasicEg" className="tio-clear tio-lg"></i>
                                </span>
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}></Col>
                    <Col md={2}>
                        <FormControl
                        as="select"
                        name="cadences"
                        value={this.state.value_period._id}
                        onChange={this.handleChange.bind(this)}>
                            <React.Fragment>
                                <option>{this.state.value_period.singular || 'Choose...'}</option>
                                {this.state.cadences.map((cadence) => {
                            if(this.state.value_period._id === cadence._id){}
                            else{
                            return(
                                <option key={cadence._id} value={cadence._id}>{cadence.singular}</option>)}})}
                            </React.Fragment>
                        </FormControl>
                    </Col>
                    </Row>
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
                                <tr key={item._id}>
                                <td>
                                    <a className="media align-items-center" href={"/for-business/timesaver/"+item._id}>
                                    <div className="media-body">
                                        <span className="d-block h5 text-hover-primary mb-0">{item.name} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                        <span className="d-block font-size-sm text-body">Harrison Solomon</span>
                                    </div>
                                    </a>
                                </td>
                                <td>
                                    <span className="d-block h5 mb-0">Test Client <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                </td>
                                <td>
                                    <span className="d-block h5 mb-0">{item.createdAt} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                </td>
                                <td>

                                    <span className="d-block h5 mb-0">${item.values.find(value => this.state.value_period.period === value.period).value} / {this.state.value_period.singular}</span>

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
                        <Button href="/for-business/timesaver/product/new">
                            Add Product
                        </Button>
                    </div>
                    </Col>
                </Card.Header>
                <Card.Body>
                <Col md={4} key="search">
                <div className="form-group w-md-50">
                            <div className="input-group input-group-merge">
                                <input type="text" className="js-form-search form-control" placeholder="Search..."></input>
                                <a className="input-group-append">
                                <span className="input-group-text">
                                    <i id="clearIconBasicEg" className="tio-clear tio-lg"></i>
                                </span>
                                </a>
                            </div>
                        </div>
                        </Col>
                    <div className="table-responsive">
                        <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                            <thead className="thead-light">
                            <tr key="columns">
                                {this.state.product_cols.map((cols, col_idx) => (
                                    <th key={col_idx}> {cols} </th>
                                ))}
                            </tr>
                            </thead>
                        <tbody>
                        {this.state.product_list.map((item, idx) => (
                            <tr key={item._id}>
                            <td key="name">
                                <a className="media align-items-center">
                                    <div className="media-body">
                                        <span className="d-block h5 text-hover-primary mb-0">{item.name} 
                                            <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i>
                                        </span>
                                    </div>
                                </a>
                            </td>
                            <td key="description">
                                <span className="d-block mb-0">{item.description}
                                    <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i>
                                </span>
                            </td>
                            <td key="cost">
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
                        <Button href="/for-business/timesaver/employee/new">
                            Add Employee
                        </Button>
                    </div>
                    </Col>
                </Card.Header>
                <Card.Body>
                <Col md={4}>
                <div className="form-group w-md-50">
                            <div className="input-group input-group-merge">
                                <input type="text" className="js-form-search form-control" placeholder="Search..."></input>
                                <a className="input-group-append">
                                <span className="input-group-text">
                                    <i id="clearIconBasicEg" className="tio-clear tio-lg"></i>
                                </span>
                                </a>
                            </div>
                        </div>
                        </Col>
                    <div className="table-responsive">
                        <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                            <thead className="thead-light">
                            <tr key="columns">
                                {this.state.employee_cols.map((cols, col_idx) => (
                                    <th key={col_idx}> {cols} </th>
                                ))}
                            </tr>
                            </thead>
                        <tbody>
                        {this.state.employee_list.map((item, idx) => (
                            <tr key={item._id}>
                            <td key="name">
                                <a className="media align-items-center" href="/for-business/timesaver/new">
                                <div className="media-body">
                                    <span className="d-block h5 text-hover-primary mb-0">{item.name} 
                                        <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i>
                                    </span>
                                </div>
                                </a>
                            </td>
                            <td key="department">
                                <span className="d-block h5 mb-0">{item.department} 
                                    <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i>
                                </span>
                            </td>
                            <td key="cost">
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

    gettingStarted(){
            return(
                <Col>
                <Card>
                    <Card.Header style={{width: "1306px",height:"74.5px"}}>
                        <Col md={4}>
                            <div>Getting Started</div>
                        </Col>
                        <Col>
                            
                        </Col>
            
                    </Card.Header>
                    <Card.Body>
                        <p className="lead">Step 1: Gather the following information from the client:</p>
                        <dl className="row">
                            <dt className="col-sm-2">Client Tasks</dt>
                            <dd className="col-sm-9">The set of tasks they are responsible for that they wish to make more efficient</dd>
                            <dt className="col-sm-2">Time Spent</dt>
                            <dd className="col-sm-9">Amount of time the task takes and how often they must perform the task</dd>
                            <dt className="col-sm-2">Employee Responsible</dt>
                            <dd className="col-sm-9">The tile of the employee responsible for performing the task</dd>
                        </dl>
                        <p></p>
                        <p className="lead">Step 2: Map each task to a product that your company provides</p>
                        <iframe src="https://giphy.com/embed/1rVNFK2XoM0j5pQxos" width="480" height="160" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/1rVNFK2XoM0j5pQxos">via GIPHY</a></p>
                        <p></p>
                        <p className="lead">Step 3: Profit</p>
                    </Card.Body>
                    </Card>
                </Col>
        )
    }

    //this function determines the active nav
    activeNav(eventKey){
        this.setState({ navActive: eventKey})
    }

    handleChange = (e) => {
        console.log(e.target)
        this.setState({
            value_period: this.state.cadences.find(cadence => e.target.value === cadence._id)
        })
        
    }

   // this function determines the content to display based on the active nav 
    contentDisplay(){
        if(this.state.navActive === '' || this.state.navActive === "calculators"){
            return(this.tableOption())
        } else if (this.state.navActive === "products"){
            return(this.productList())
        } else if (this.state.navActive === "clients") {
            return(this.employeeList())
        } else {
            return(this.gettingStarted())
        }
    }

    componentDidMount(){
        
        Promise.all([
            fetch(config.url.API_URL + 'timesaver/calculator/list'),
            fetch(config.url.API_URL + 'timesaver/product/list'),
            fetch(config.url.API_URL + 'timesaver/employee/list')
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
    return( 
        
        <div className="container-fluid">
            
            <main id="content" role="main" className="main splitted-content-main bg-light">
            {/*Fluid Content */}
                <div className="splitted-content-fluid content-space">
                <a href="/"><h3 className="page-header-title text-left align-middle">ROY</h3></a>
                <div className="row justify-content-lg-left">
                <Col md={6}>
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
                            <Nav.Item>
                                <Nav.Link eventKey="getting_started">Getting Started</Nav.Link>
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