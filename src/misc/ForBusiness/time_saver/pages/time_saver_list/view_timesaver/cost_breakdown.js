import React, { useState } from 'react';
import {DropdownButton, Button, Spinner, Dropdown, Row, Col } from 'react-bootstrap';
import { XSquareFill } from 'react-bootstrap-icons';
import { useFetchCadences, useFetchCalculatorInputs } from '../../../hooks/useFetchHook';
import Tabs from '../../../../components/tabs';
import { timeSaverTabs } from '../../../constants/tabs';
import { useParams } from 'react-router-dom';




const CostBreakdown = () => {

    const params = useParams()
    
    const tabStyle = {
        paddingTop: "0px 0"
    };

    const costBreakdownStyle = {
        marginTop: "-17rem"
    };

    const backgroundStyle = {
        height: "25rem"
    };

    const [cadenceKey, setCadenceKey] = useState(1)
    const { cadences, cadencesLoading } = useFetchCadences('cadence');
    const { calculatorInputs, calculatorInputsLoading } = useFetchCalculatorInputs(`2/1/calculator/${params.timesaverId}/inputs`);

    return (
        <main id="content" role="main" class="main">
                <div class="bg-dark">
                {calculatorInputsLoading? <Spinner animation="border" variant="primary" />:
                    <div class="content container-fluid" style={backgroundStyle}>
            
                        <div class="page-header page-header-light">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h1 class="page-header-title">{calculatorInputs[0].report_name}</h1>
                                </div>

                                <div class="col-auto">
                                {cadencesLoading? <Spinner animation="border" variant="primary" />:
                                    <DropdownButton id="dropdown-basic-button" bsPrefix="btn btn-sm btn-ghost-light" title={cadences.find(cadence => cadenceKey === cadence.id).adj}>
                                        {cadences.map((cadence) => {
                                            if(cadence.id !== cadenceKey)
                                                return(
                                                    <Dropdown.Item 
                                                        key={cadence.id}
                                                        eventKey={cadence.id} 
                                                        onSelect={(e) => setCadenceKey(parseInt(e))}
                                                    >
                                                    {cadence.adj}
                                                    </Dropdown.Item>
                                                )
                                        })}
                                    </DropdownButton>
                                }
                                    
                                </div>
                                <div className="col-auto">
                                    <Button 
                                        size="lg" 
                                        bsPrefix="btn btn-sm btn-ghost-light"
                                        href="/for-business/timesaver/calculator_list">
                                        <XSquareFill />
                                    </Button>
                                </div>
                                
                            </div>
                            <Row>
                            
                            {/* <div class="row align-items-center"> */}
                                <Col md={4} style={tabStyle}>
                                    <Tabs
                                        tabs={timeSaverTabs}
                                        activeKey="breakdown"
                                        baseUrl='for-business/timesaver'
                                        id={params.timesaverId}
                                    />
                                </Col>
                            </Row>
                            {/* </div> */}
                            
                        </div>
                            
                    </div>}
                </div>
                <div className="content container-fluid" style={costBreakdownStyle}>
                    <div className="row">
                        <div className="col-lg-8 mb-3 mb-lg-0">
                            <div className="card mb-3 mb-lg-5">
                                <div className="card-header">
                                    <h4 className="card-header-title">Task Details
                                        <span className="badge badge-soft-dark rounded-circle ml-1">3</span>
                                    </h4>
                                    <a className="link" href={`/for-business/timesaver/${params.timesaverId}/edit`}>Edit</a>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush list-group-no-gutters">
                                        <li className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-md-4 mb-3 mb-md-0">
                                                    <div className="media-body">
                                                        <span className="d-block h5 text-hover-primary mb-0"> Task Name</span>
                                                    </div>
                                                    <div className="font-size-sm text-body">
                                                        <span>Details: </span>
                                                        <span className="font-weight-bold">35 Hours per Quarter</span>
                                                    </div>
                                                    <div className="font-size-sm text-body">
                                                        <span>Product: </span>
                                                        <span className="font-weight-bold">Automation Station</span>
                                                    </div>
                                                    <div className="font-size-sm text-body">
                                                        <span>Employee: </span>
                                                        <span className="font-weight-bold">Product Manager</span>
                                                    </div>
                                                </div>
                                                <div className="col align-self-center">
                                                    <small className="text-cap">Employee Rate</small>
                                                    <span className="font-weight-bold text-dark">$25.37 / Hr</span>
                                                </div>
                                                <div className="col align-self-center">
                                                    <small className="text-cap">Product Rate</small>
                                                    <span className="font-weight-bold text-dark">$25.37 / Hr</span>
                                                </div>
                                                <div className="col align-self-center">
                                                    <small className="text-cap">Time Savings</small>
                                                    <span className="font-weight-bold text-dark">10</span>
                                                </div>
                                                <div className="col align-self-center text-right">
                                                    <small className="text-cap">Cost Savings</small>
                                                    <span className="font-weight-bold text-dark">$1000</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-md-4 mb-3 mb-md-0">
                                                    <div className="media-body">
                                                        <span className="d-block h5 text-hover-primary mb-0"> Task Name</span>
                                                    </div>
                                                    <div className="font-size-sm text-body">
                                                        <span>Details: </span>
                                                        <span className="font-weight-bold">35 Hours per Quarter</span>
                                                    </div>
                                                    <div className="font-size-sm text-body">
                                                        <span>Product: </span>
                                                        <span className="font-weight-bold">Automation Station</span>
                                                    </div>
                                                    <div className="font-size-sm text-body">
                                                        <span>Employee: </span>
                                                        <span className="font-weight-bold">Product Manager</span>
                                                    </div>
                                                </div>
                                                <div className="col align-self-center">
                                                    <small className="text-cap">Employee Rate</small>
                                                    <span className="font-weight-bold text-dark">$25.37 / Hr</span>
                                                </div>
                                                <div className="col align-self-center">
                                                    <small className="text-cap">Product Rate</small>
                                                    <span className="font-weight-bold text-dark">$25.37 / Hr</span>
                                                </div>
                                                <div className="col align-self-center">
                                                    <small className="text-cap">Time Savings</small>
                                                    <span className="font-weight-bold text-dark">10</span>
                                                </div>
                                                <div className="col align-self-center text-right">
                                                    <small className="text-cap">Cost Savings</small>
                                                    <span className="font-weight-bold text-dark">$1000</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-md-4 mb-3 mb-md-0">
                                                    <div className="media-body">
                                                        <span className="d-block h5 text-hover-primary mb-0"> Task Name</span>
                                                    </div>
                                                    <div className="font-size-sm text-body">
                                                        <span>Details: </span>
                                                        <span className="font-weight-bold">35 Hours per Quarter</span>
                                                    </div>
                                                    <div className="font-size-sm text-body">
                                                        <span>Product: </span>
                                                        <span className="font-weight-bold">Automation Station</span>
                                                    </div>
                                                    <div className="font-size-sm text-body">
                                                        <span>Employee: </span>
                                                        <span className="font-weight-bold">Product Manager</span>
                                                    </div>
                                                </div>
                                                <div className="col align-self-center">
                                                    <small className="text-cap">Employee Rate</small>
                                                    <span className="font-weight-bold text-dark">$25.37 / Hr</span>
                                                </div>
                                                <div className="col align-self-center">
                                                    <small className="text-cap">Product Rate</small>
                                                    <span className="font-weight-bold text-dark">$25.37 / Hr</span>
                                                </div>
                                                <div className="col align-self-center">
                                                    <small className="text-cap">Time Savings</small>
                                                    <span className="font-weight-bold text-dark">10</span>
                                                </div>
                                                <div className="col align-self-center text-right">
                                                    <small className="text-cap">Cost Savings</small>
                                                    <span className="font-weight-bold text-dark">$1000</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <hr />
                                    <div className="row justify-content-md-end mb-3">
                                        <div className="col-md-8 col-lg-7">
                                            <dl className="row text-sm-right">
                                                <dt className="col-sm-6">Cost Savings:</dt>
                                                <dd className="col-sm-6">$65,000</dd>
                                                <dt className="col-sm-6">Product Investment:</dt>
                                                <dd className="col-sm-6">$65,000</dd>
                                                <dt className="col-sm-6">ROI:</dt>
                                                <dd className="col-sm-6">21%</dd>
                                            </dl>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-header-title">Task Inputs</h4>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5>Automation Station</h5>
                                        <a className="link">Edit</a>
                                    </div>
                                    <ul className="list-unstyled list-unstyled-py-2">
                                        <li>
                                            <i className="tio-timer mr-2"></i> Saves 5 Hours
                                        </li>
                                        <li>
                                            <i className="tio-dollar mr-2"></i> $500 / Year
                                        </li>
                                    </ul>
                                    <hr></hr>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5>Super Slick Product</h5>
                                        <a className="link">Edit</a>
                                    </div>
                                    <ul className="list-unstyled list-unstyled-py-2">
                                        <li>
                                            <i className="tio-timer mr-2"></i> Saves 5 Hours
                                        </li>
                                        <li>
                                            <i className="tio-dollar mr-2"></i> $500 / Year
                                        </li>
                                    </ul>
                                    <hr></hr>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5>Product Manager</h5>
                                        <a className="link">Edit</a>
                                    </div>
                                    <ul className="list-unstyled list-unstyled-py-2">
                                        <li>
                                            <i className="tio-dollar mr-2"></i> $50000 / Year
                                        </li>
                                    </ul>
                                </div>
                            </div>                           
                        </div>
                    </div>

                </div>
            </main>
    )
}

export default CostBreakdown