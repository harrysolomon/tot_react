import React, { useState } from 'react';
import {DropdownButton, Button, Spinner, Dropdown, Row, Col } from 'react-bootstrap';
import { XSquareFill } from 'react-bootstrap-icons';
import { useFetchCadences, useFetchCalculatorInputs } from '../../../hooks/useFetchHook';
import Tabs from '../../../../components/tabs';
import { timeSaverTabs } from '../../../constants/tabs';
import { useParams } from 'react-router-dom';




const TimeSaverCompetitors = () => {

    const fakeData = [
        {
            row_name: "Plain Bad",
            details: [
                {
                    product_name: "cool_product",
                    product_description: "a cool description",
                    cost: "$500",
                    value: "$650",
                    roi: "25%",
                    cost_outcome: "Expensive",
                    value_outcome: "More Value",
                    roi_outcome: "Higher ROI"
                },
                {
                    product_name: "cool_product",
                    product_description: "a cool description",
                    cost: "$500",
                    value: "$650",
                    roi: "25%",
                    cost_outcome: "Expensive",
                    value_outcome: "More Value",
                    roi_outcome: "Higher ROI"
                }
            ]
        },
        {
            row_name: "More Value",
            details: [
                {
                    product_name: "cool_product",
                    product_description: "a cool description",
                    cost: "$500",
                    value: "$650",
                    roi: "25%",
                    cost_outcome: "Expensive",
                    value_outcome: "More Value",
                    roi_outcome: "Higher ROI"
                },
                {
                    product_name: "cool_product",
                    product_description: "a cool description",
                    cost: "$500",
                    value: "$650",
                    roi: "25%",
                    cost_outcome: "Expensive",
                    value_outcome: "More Value",
                    roi_outcome: "Higher ROI"
                }
            ]
        },
        {
            row_name: "Lower Cost",
            details: [
                {
                    product_name: "cool_product",
                    product_description: "a cool description",
                    cost: "$500",
                    value: "$650",
                    roi: "25%",
                    cost_outcome: "Expensive",
                    value_outcome: "More Value",
                    roi_outcome: "Higher ROI"
                }
            ]
        },
        {
            row_name: "Higher ROI",
            details: [
                {
                    product_name: "cool_product",
                    product_description: "a cool description",
                    cost: "$500",
                    value: "$650",
                    roi: "25%",
                    cost_outcome: "Expensive",
                    value_outcome: "More Value",
                    roi_outcome: "Higher ROI"
                },
                {
                    product_name: "cool_product",
                    product_description: "a cool description",
                    cost: "$500",
                    value: "$650",
                    roi: "25%",
                    cost_outcome: "Cheaper",
                    value_outcome: "More Value",
                    roi_outcome: "Higher ROI"
                }
            ]
        }

    ]

    const positiveOutcomes = ["More Value", "Higher ROI", "Cheaper"]

    const tagColor = (outcome) => {
        if(positiveOutcomes.includes(outcome)) {
            return "info"
        } else {
            return "danger"
        }
    }
    
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
                <div className="content container-fluid kanban-board" style={costBreakdownStyle}>
                    <ul className="row list-unstyled kanban-board-row">
                        {fakeData.map((data) => 
                        <li className="js-add-field col-12">
                            <div className="js-sortable-disabled d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-light">{data.row_name}</h4>
                            </div>
                            {data.details.map((card) => 
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="d-flex mb-5">
                                        <div className="mr-2">
                                            <h4 className="text-wrap">{card.product_name}</h4>
                                                <div className="font-size-sm ml-2">{card.product_description}</div>                                         
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <div className="text-center">
                                                <span className="d-block h4 mb-1">{card.cost}</span>
                                                <span className="d-block font-size-sm">Cost</span>
                                                <div className={`badge badge-soft-${tagColor(card.cost_outcome)} p-2`}>{card.cost_outcome}</div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="text-center">
                                                <span className="d-block h4 mb-1">{card.value}</span>
                                                <span className="d-block font-size-sm">Value</span>
                                                <div className={`badge badge-soft-${tagColor(card.value_outcome)} p-2`}>{card.value_outcome}</div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="text-center">
                                                <span className="d-block h4 mb-1">{card.roi}</span>
                                                <span className="d-block font-size-sm">ROI</span>
                                                <div className={`badge badge-soft-${tagColor(card.roi_outcome)} p-2`}>{card.roi_outcome}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </li>)}
                    </ul>

                </div>
            </main>
    )
}

export default TimeSaverCompetitors