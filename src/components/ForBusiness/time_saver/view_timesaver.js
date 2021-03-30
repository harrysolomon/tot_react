import React, { Component } from "react";
import { Button, Card, FormControl, InputGroup, FormGroup, FormLabel, Container, Row, Col, Nav, Navbar} from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import _ from 'lodash'
import LineChart from '../../library/line_chart'
import { XSquareFill } from 'react-bootstrap-icons'
import { Redirect } from 'react-router'
import { config } from '../../constants'
import { cadences } from '../../cadences'

class TimeSaverView extends Component {
    constructor(props) {
      super(props);
      this.state = {
          rows: [],
          calc_name: "",
          data_loaded: false,
          data: {},
          options: {},
          tableData: [],
          cadences: cadences,
          location: this.props.location,
          match: this.props.match,
          input_nav: false,
          graph_nav: true,
          table_nav: true,
          active_key: "graph",
          redirect: false,
          redirect_id: "",
          time_increment_input: "",
          time_increment_req: "quarter",
          num_periods_input: "",
          num_periods_req: "8"

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
                            <div>Inputs</div>
                        </Col>
                        <Col>
                            
                        </Col>
                            
                        <Col>
                        <div className="text-right">
                            <Button href={"/for-business/timesaver/"+this.state.match.params.timesaverId+"/edit"}> Edit </Button>
                        </div>
                        </Col>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive">
                            <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                <thead>
                                    <tr>
                                        <th> Name </th>
                                        <th> Product </th>
                                        <th> Current Time Spent </th>
                                        <th> Employee </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.rows.map((item, idx) => (
                                    <tr key={item._id}>
                                        <td key="name">
                                            <div className="media-body">
                                                <span className="d-block h5 text-hover-primary mb-0">{item.name} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                            </div>
                                        </td>
                                        <td key="products">
                                            <span className="d-block h5 mb-0">{item.products.name} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                        </td>   
                                        <td key="current_time_spent">
                                            
                                            <span className="d-block h5 mb-0">
                                                {item.current_time_spent} {this.state.cadences.find(cadence => item.current_time_spent_period._id === cadence._id).plural} per {this.state.cadences.find(cadence => item.cadences._id === cadence._id).singular} 
                                                <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i>
                                            </span>
                                        </td>
                                        <td key="employees">
                                            <span className="d-block h5 mb-0">{item.employees.name}<i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
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
        this.setState({ active_key: eventKey})
    }

    lineGraphResults(){
        let lineStyle = {
            position: "relative", 
            height: "55vh"
          };

        return (
            <Row>
                <Col md={12}>
                    <div className="card">
                        <div className="tab-content" id="navTabContent1">
                            <div className="tab-pane fade p-4 show active" id="nav-result1" role="tabpanel" aria-labelledby="nav-resultTab1">
                            <div className="row align-items-sm-center mb-4">
                                <div className="col-sm mb-3 mb-sm-0"></div>
                                    <div className="col-sm-auto">
                                        <div className="row font-size-sm">
                                            <div className="col-auto">
                                                <span className="legend-indicator bg-primary"></span> Old Way
                                            </div>
                                
                                            <div className="col-auto">
                                                <span className="legend-indicator bg-info"></span> New Way
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    <LineChart 
                                    style={lineStyle}
                                    data={this.state.data} 
                                    options={this.state.options}
                                    />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

        )
    }

    tableResults(){
        return(
            <Col>
                <Card>
                    <Card.Header>
                        <Col md={4}>
                            <div>Results</div>
                        </Col>
                        <Col>
                            
                        </Col>
                            
                        <Col>
                        </Col>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive">
                            <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                <thead>
                                    <tr>
                                        <th> Time Period </th>
                                        <th> Current Cost </th>
                                        <th> New Cost </th>
                                        <th> Value </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.tableData.map((row) => (
                                    <tr key={row.time_increment}>
                                        <td key="time_period">
                                            <div className="media-body">
                                                <span className="d-block h5 text-hover-primary mb-0">{row.time_increment} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                            </div>
                                        </td>
                                        <td key="cur_cost">
                                            <span className="d-block h5 mb-0">${row.cur_cost} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                        </td>   
                                        <td key="new_cost">
                                            <span className="d-block h5 mb-0">${row.new_cost}<i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                        </td>
                                        <td key="value">
                                            <span className="d-block h5 mb-0">${row.value}<i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
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

    handleChange = (e) => {
        console.log(e.target.value === '')
        let path = config.url.API_URL + 'timesaver/' + this.state.match.params.timesaverId +'?'
        if(e.target.name === "time_increment"){
            let increment = this.state.cadences.find(cadence => e.target.value === cadence._id)
            let params = "period=" + increment["period"] + "&range=" + this.state.num_periods_req

            Promise.all([
                fetch(path + params)
            ])
            .then(([res1]) => Promise.all([res1.json()]))
            .then(([data1]) => this.setState({
                rows: data1.meta[0].inputs,
                data_loaded: true,
                graph_nav: false,
                table_nav: false,
                calc_name: data1.meta[0].name,
                data: data1.graph_data.data,
                options: data1.graph_data.options,
                tableData: data1.table_data
            }))
            this.setState({ 
                time_increment_input: increment["name"],
                time_increment_req: increment["period"]
            })
        } else if(e.target.value === ''){
            console.log("sup yall")
            this.setState({
                num_periods_input: e.target.value,
                num_periods_req: e.target.value
            })
        } else {
            let params = "period=" + this.state.time_increment_req + "&range=" + e.target.value

            Promise.all([
                fetch(path + params)
            ])
            .then(([res1]) => Promise.all([res1.json()]))
            .then(([data1]) => this.setState({
                rows: data1.meta[0].inputs,
                data_loaded: true,
                graph_nav: false,
                table_nav: false,
                calc_name: data1.meta[0].name,
                data: data1.graph_data.data,
                options: data1.graph_data.options,
                tableData: data1.table_data
            }))

            this.setState({
                num_periods_input: e.target.value,
                num_periods_req: e.target.value
            })
        }
    }

   // this function determines the content to display based on the active nav 
    contentDisplay(){
        if(this.state.active_key === "form"){
            return(this.tableOption())
        } else if (this.state.active_key === "graph"){
            return(this.lineGraphResults())
        } else {
            return(this.tableResults())
        }
    }

    componentDidMount() {
        
        let path = config.url.API_URL + 'timesaver/' + this.state.match.params.timesaverId +'?'
        let params = "period=quarter&range=8"
        Promise.all([
            fetch(path + params),
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => this.setState({
            rows: data1.meta[0].inputs,
            data_loaded: true,
            graph_nav: false,
            table_nav: false,
            calc_name: data1.meta[0].name,
            data: data1.graph_data.data,
            options: data1.graph_data.options,
            tableData: data1.table_data,
            time_increment_input: "Quarterly",
            time_increment_req: "quarter",
            num_periods_req: 8,
            num_periods_input: 8
        }))
    }


render() {
    const { redirect } = this.state;
    const dropdownStyle = {
        paddingLeft: "15px",
        paddingBottom: "2px",
        paddingTop: "2px"
      };
    if(this.state.data_loaded) {
        if (redirect) {
            let path = "/timesaver/"+this.state.redirect_id
            return <Redirect to={path}/>;
        }

        const tabStyle = {
            paddingTop: "0px 0"
          };

    console.log(this.state.cadences.find(cadence => this.state.rows[0].cadences._id === cadence._id).singular)
    return( 
        
        <div className="container-fluid">
            <div className="page-header">
                <div className ="row align-items-bottom">
                    <div className="col-sm mb-2 mb-sm-0">
                        <h1 className="page-header-title text-left align-bottom">{this.state.calc_name}</h1>
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
                <Col md={4} style={tabStyle}>
                    <div className="tab-content" id="navTabContent4">
                        <div className="tab-pane fade p-4 show active" id="nav-result4" role="tabpanel" aria-labelledby="nav-resultTab4">
                            <Nav variant="tabs" activeKey={this.state.active_key} onSelect={this.activeNav}>
                                <Nav.Item>
                                    <Nav.Link eventKey="graph" disabled={this.state.graph_nav}>Graph</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="spreadsheet" disabled={this.state.table_nav}>Table</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="form" disabled={this.state.input_nav}>Inputs</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>
                </Col>
                <Col md={4}></Col>
                <Col md={2} style={dropdownStyle}>
                <FormGroup key="time_increment">
                    <label>Time Increment</label>
                    <InputGroup>
                        <FormControl
                        as="select"
                        name="time_increment"
                        value={this.state.time_increment_input}
                        onChange={this.handleChange.bind(this)}>
                            <React.Fragment>
                                <option>{this.state.time_increment_input}</option>
                                {this.state.cadences.map((cadence) => {
                                if(this.state.time_increment_input === cadence.name){}
                                else{
                                return(
                                    <option key={cadence._id} value={cadence._id}>{cadence.name}</option>)}})}
                            </React.Fragment>
                        </FormControl>
                    </InputGroup>
                </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup key="num_period">
                        <label>Number of Periods</label>
                        <InputGroup>
                            <FormControl
                            type="text"
                            name="num_period"
                            value={this.state.num_periods_input}
                            onChange={this.handleChange.bind(this)}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
                {this.contentDisplay()}
        </div>
        );
    } else {

        return(
            <div>
            </div>)}
}}

export default TimeSaverView;