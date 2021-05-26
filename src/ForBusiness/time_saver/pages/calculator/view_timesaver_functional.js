import React, { useState } from 'react'
import Select from '../../../components/select'
import { Row, Col, Button, Card, FormGroup, InputGroup, FormControl, Nav, Spinner } from 'react-bootstrap'
import { XSquareFill } from 'react-bootstrap-icons'
import { useFetchProduct, useFetchWorker, useFetchCadences, useFetchCalculator, useFetchCalculatorInputs } from '../../hooks/useFetchHook';
import { useUpdateSingleInput } from '../../hooks/useForm'
import EditableTable from '../../../components/editableTable'
import { timesaver_rows, timesaver_cells } from '../../constants/editable_table_inputs'
import { headers, timeSaverTableHeaders } from '../../constants/headers'
import { useGatherCalculatorInputs } from '../../hooks/useGatherCalculatorInputs'
import { useParams } from 'react-router-dom'
import LineChart from '../../../../library/line_chart'
import Table from '../../../components/table'
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const ViewTimeSaverFunc = () => {
    const params = useParams()
    console.log(params)
    const tabStyle = {
        paddingTop: "0px 0"
    };

    const dropdownStyle = {
        paddingLeft: "15px",
        paddingBottom: "2px",
        paddingTop: "2px"
    };

    const lineStyle = {
        position: "relative", 
        height: "55vh"
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const tabUrlMapping = {
            graph: "trend",
            table: "table",
            summary: "summary"
        }
    
    const filter_dimension = 'calculator_id'
    const filter_value = 1
    const dimensions = 'calculator_id%2Ccalculator_name'

    const [cadenceKey, handleCadenceKeyChange] = useUpdateSingleInput({cadence_key: "1"})
    const [forecastPeriod, handleForecastPeriodChange] = useUpdateSingleInput({forecast_period: "8"})

    console.log(cadenceKey)

    const query_params = `filter_dimension=${filter_dimension}&filter_value=${filter_value}&dimensions=${dimensions}&cadence_key=${cadenceKey.cadence_key}&forecast_period=${forecastPeriod.forecast_period}`
    
    const { cadences, cadencesLoading } = useFetchCadences('cadence');
    const { product, productLoading } = useFetchProduct('2/1/product/list');
    const { worker, workerLoading } = useFetchWorker('2/1/worker/list');
    const { calculator, calculatorLoading } = useFetchCalculator(`2/1/calculator/${params.timesaverId}/${tabUrlMapping[params.timesaverTab]}?${query_params}`);
    const { calculatorInputs, calculatorInputsLoading } = useFetchCalculatorInputs('2/1/calculator/1/inputs');
    

    const completeLoading = (cadencesLoading || productLoading || workerLoading || calculatorLoading || calculatorInputsLoading)

    const content_display = (page) => {
        console.log("the page is", page)
        if (page === "graph") {
            return(
                    <div className="tab-content" id="navTabContent1">
                        <div className="tab-pane fade p-4 show active" id="nav-result1" role="tabpanel" aria-labelledby="nav-resultTab1">
                            <div className="row align-items-sm-center mb-4">
                                <div className="col-sm mb-3 mb-sm-0"></div>
                                <div className="col-sm-auto">
                                    <div className="row font-size-sm">
                                        <div className="col-auto">
                                            <span className="legend-indicator bg-primary"></span> New Cost
                                        </div>
                            
                                        <div className="col-auto">
                                            <span className="legend-indicator bg-info"></span> Old Cost
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <LineChart 
                                style={lineStyle}
                                data={calculator.data} 
                                options={calculator.options}
                            />
                        </div>
                    </div>
            )

        } else if (page === "table") {
            const columns = ["time_increment","value_per_period","current_cost_per_period","new_cost_per_period"]
            console.log("the calculator is", calculator)
            console.log("the headers are", timeSaverTableHeaders)

            calculator.map((row) => {
                console.log("the row is", row)
                columns.map((col) => {
                    console.log("the columns is", col)
                    console.log("the value is", row[col])
                })
            })

            return(
                <Table 
                    headers={timeSaverTableHeaders}
                    tableBody={calculator}
                    expectedColumns={columns}
                    text="left"
                />
            )

        }


    }

        
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
                                <Nav variant="tabs" activeKey={params.timesaverTab}>
                                    <Nav.Item>
                                        <Nav.Link href={`/for-business/timesaver/${params.timesaverId}/graph`} eventKey="graph" >Graph</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href={`/for-business/timesaver/${params.timesaverId}/table`} eventKey="table">Table</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="summary">Summary</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="form">Inputs</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </div>
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
                                        <div>{capitalizeFirstLetter(params.timesaverTab)}</div>
                                    </Col>
                                    <Col md={8}></Col>
                            </Card.Header>
                            {calculatorLoading? <Spinner animation="border" variant="primary" />: 
                            content_display(params.timesaverTab)
                            }
                        </Card>
                    </Col>
                </Row>
            </div>

        )
};

export default ViewTimeSaverFunc