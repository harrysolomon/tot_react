import React, { useState } from 'react'
import Select from '../../../../components/select'
import { Row, Col, Button, Card, FormGroup, InputGroup, FormControl, Nav, Spinner } from 'react-bootstrap'
import { XSquareFill } from 'react-bootstrap-icons'
import { useFetchProduct, useFetchWorker, useFetchCadences, useFetchCalculator, useFetchCalculatorInputs } from '../../../hooks/useFetchHook';
import { useUpdateSingleInput } from '../../../hooks/useForm'
import { timeSaverTableHeaders } from '../../../constants/headers'
import { useParams } from 'react-router-dom'
import Table from '../../../../components/table'
import Tabs from '../../../../components/tabs'
import { timeSaverTabs } from '../../../constants/tabs'
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const TableTimeSaver = () => {
    
    const params = useParams()

    const tabStyle = {
        paddingTop: "0px 0"
    };

    const dropdownStyle = {
        paddingLeft: "15px",
        paddingBottom: "2px",
        paddingTop: "2px"
    };

    const tableColumns = ["time_increment","value_per_period","current_cost_per_period","new_cost_per_period"]
    
    const filter_dimension = 'calculator_id'
    const filter_value = 1
    const dimensions = 'calculator_id%2Ccalculator_name'

    const [cadenceKey, handleCadenceKeyChange] = useUpdateSingleInput({cadence_key: "1"})
    const [forecastPeriod, handleForecastPeriodChange] = useUpdateSingleInput({forecast_period: "8"})
    const query_params = `filter_dimension=${filter_dimension}&filter_value=${filter_value}&dimensions=${dimensions}&cadence_key=${cadenceKey.cadence_key}&forecast_period=${forecastPeriod.forecast_period}`
    
    const { cadences, cadencesLoading } = useFetchCadences('cadence');
    const { product, productLoading } = useFetchProduct('2/1/product/list');
    const { worker, workerLoading } = useFetchWorker('2/1/worker/list');
    const { calculator, calculatorLoading } = useFetchCalculator(`2/1/calculator/${params.timesaverId}/table?${query_params}`);
    const { calculatorInputs, calculatorInputsLoading } = useFetchCalculatorInputs('2/1/calculator/1/inputs');

        
        return(
            <div className="container-fluid">
                <div className="page-header">
                    <div className ="row align-items-bottom">
                        <div className="col-sm mb-2 mb-sm-0">
                            {
                            calculatorInputsLoading? 
                            <div></div> :
                            <h1 className="page-header-title text-left align-bottom">{calculatorInputs[0].report_name}</h1>
                            }
                        </div>
                        <div className="col-sm mb-2 mb-sm-0">
                            <div className="text-right">
                                <Button 
                                    href="/for-business/timesaver/calculator_list"
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
                        <Tabs
                            tabs={timeSaverTabs}
                            activeKey="table"
                            baseUrl='for-business/timesaver'
                            id={params.timesaverId}
                        />
                    </Col>
                    <Col md={4}></Col>
                    <Col md={2} style={dropdownStyle}>
                        <FormGroup key="time_increment">
                            <label>Time Increment</label>
                            {cadencesLoading? <div></div>:
                            <Select 
                                id = "cadences"
                                name = "cadence_key"
                                options = {cadences}
                                onChange = {handleCadenceKeyChange}
                                selectedValue = {cadenceKey.cadence_key}
                                optionName = "adj"
                            />}
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup key="num_period">
                            <label>Number of Periods</label>
                            <InputGroup>
                                <FormControl
                                type="text"
                                name="forecast_period"
                                value={forecastPeriod.forecast_period}
                                onChange={handleForecastPeriodChange}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header>
                                    <Col md={4}>
                                        <div>Table</div>
                                    </Col>
                                    <Col md={8}></Col>
                            </Card.Header>
                            {calculatorLoading? <Spinner animation="border" variant="primary" />: 
                                <Table 
                                    headers={timeSaverTableHeaders}
                                    tableBody={calculator}
                                    expectedColumns={tableColumns}
                                    text="left"
                                />
                            }
                        </Card>
                    </Col>
                </Row>
            </div>

        )
};

export default TableTimeSaver