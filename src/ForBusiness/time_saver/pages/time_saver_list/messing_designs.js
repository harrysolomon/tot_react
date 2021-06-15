import React from 'react'
import {DropdownButton, Dropdown, Col, Row, Spinner} from 'react-bootstrap'
import Tabs from '../../../components/tabs'
import { timeSaverTabs } from '../../constants/tabs'
import { useFetchCalculator } from '../../hooks/useFetchHook';
import LineChart from '../../../../library/line_chart';

const MessingDesigns = () => {

    const backgroundStyle = {
        height: "25rem"
    };

    const tabStyle = {
        paddingTop: "0px 0"
    };

    const dataOutputStyle = {
        marginTop: "-17rem"
    }

    const lineChartStyle = {
        position: "relative", 
        height: "55vh"
    };


    const filter_dimension = 'calculator_id'
    const dimensions = 'calculator_id%2Ccalculator_name'
    
    const query_params = `filter_dimension=${filter_dimension}&filter_value=1&dimensions=${dimensions}&cadence_key=1&forecast_period=8`
    

    const { calculator, calculatorLoading } = useFetchCalculator(`2/1/calculator/1/trend?${query_params}`);

    return (
        <main id="content" role="main" class="main">
            <div class="bg-dark">
                <div class="content container-fluid" style={backgroundStyle}>
          
                    <div class="page-header page-header-light">
                        <div class="row align-items-center">
                            <div class="col">
                                <h1 class="page-header-title">Dashboard</h1>
                            </div>

                            <div class="col-auto">
                                <DropdownButton id="dropdown-basic-button" title="Dropdown button" bsPrefix="btn btn-sm btn-ghost-light">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>
                                
                            </div>
                        </div>
                        <Row>
                        
                        {/* <div class="row align-items-center"> */}
                            <Col md={4} style={tabStyle}>
                                <Tabs
                                    tabs={timeSaverTabs}
                                    activeKey="graph"
                                    baseUrl='for-business/timesaver'
                                    // id={params.timesaverId}
                                />
                            </Col>
                        </Row>
                        {/* </div> */}
                        
                    </div>
                        
                </div>
            </div>

            <div class="content container-fluid" style={dataOutputStyle}>
                <div class="card mb-3 mb-lg-5">
          
                    <div class="card-header">
                        <h4 class="card-header-title">Recent projects</h4>
                    </div>
                    {calculatorLoading? <Spinner animation="border" variant="primary" />:
                    <div class="card-body">
                    
                        <div class="row align-items-sm-center mb-4">
                            <div class="col-sm mb-3 mb-sm-0">
                                <div class="d-flex align-items-center">
                                    <span class="h1 mb-0">$7,431.14 USD</span>

                                    <span class="text-success ml-2">
                                        <i class="tio-trending-up"></i> 25.3%
                                    </span>
                                </div>
                            </div>

                            <div class="col-sm-auto">
                                <div class="row font-size-sm">
                                    <div class="col-auto">
                                        <span class="legend-indicator bg-primary"></span> New Cost
                                    </div>
                                    <div class="col-auto">
                                        <span class="legend-indicator bg-info"></span> Current Cost
                                    </div>
                                </div>
                            </div>
                        </div>
                        <LineChart 
                            style={lineChartStyle}
                            data={calculator.data} 
                            options={calculator.options}
                        />
                    </div>}
                    {/* <!-- Table --> */}
                    <div class="table-responsive">
                    {calculatorLoading? <Spinner animation="border" variant="primary" />:
                        <table class="table table-borderless table-thead-bordered table-align-middle card-table">
                            <thead class="thead-light">
                                <tr>
                                <th>Task name</th>
                                <th>Employee</th>
                                <th>Product</th>
                                <th>New Time Spent</th>
                                <th>Added Value</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        <a class="media align-items-center" href="project.html">
                                            {/* <img class="avatar avatar-sm mr-3" src="./assets/svg/brands/spec.svg" alt="Image Description"/> */}
                                            <div class="media-body">
                                                <span class="d-block h5 text-hover-primary mb-0">Install Front pay</span>
                                            </div>
                                        </a>
                                    </td>
                                    <td>
                                        {/* <!-- Avatar Group --> */}
                                        <div class="avatar-group avatar-group-xs avatar-circle">
                                            <a class="avatar avatar-soft-info" href="user-profile.html" data-toggle="tooltip" data-placement="top" title="Lisa Iston">
                                                <span class="badge badge-soft-success badge-pill">Caitlin</span>
                                            </a>
                                        </div>
                                        {/* <!-- End Avatar Group --> */}
                                    </td>
                                    <td>
                                        {/* <!-- Avatar Group --> */}
                                        <div class="avatar-group avatar-group-xs avatar-circle">
                                            <a class="avatar avatar-soft-info" href="user-profile.html" data-toggle="tooltip" data-placement="top" title="Lisa Iston">
                                                <span class="avatar-initials">L</span>
                                            </a>
                                        </div>
                                        {/* <!-- End Avatar Group --> */}
                                    </td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <span class="mb-0">34</span>
                                            <span class="badge badge-soft-danger p-1 ml-2">
                                                <i class="tio-trending-down"></i> 1.8%
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <span class="mb-0">$25,000</span>
                                            <span class="badge badge-soft-success p-1 ml-2">
                                                <i class="tio-trending-up"></i> 1.8%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>}
                    </div>
                    {/* <!-- Card Footer --> */}
                    <a class="card-footer text-center" href="projects.html">
                        Edit Tasks <i class="tio-chevron-right"></i>
                    </a>
                    {/* <!-- End Card Footer --> */}
                </div>
                {/* <!-- End Card --> */}                                    
            </div>
        </main>
                
    )

}

export default MessingDesigns
