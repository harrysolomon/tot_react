import React, { useState } from 'react'
import Select from '../../../../components/select'
import { Row, Col, Button, Card, FormGroup, InputGroup, FormControl, Nav, Spinner } from 'react-bootstrap'
import { XSquareFill } from 'react-bootstrap-icons'
import { useFetchProduct, useFetchWorker, useFetchCadences, useFetchCalculator, useFetchCalculatorInputs } from '../../../hooks/useFetchHook';
import { useUpdateSingleInput } from '../../../hooks/useForm'
import { timeSaverTableHeaders } from '../../../constants/headers'
import { useParams } from 'react-router-dom'
import LineChart from '../../../../../library/line_chart'
import Table from '../../../../components/table'
import Tabs from '../../../../components/tabs'
import { timeSaverTabs } from '../../../constants/tabs'
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const SummaryTimeSaver = () => {
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
    
    const filter_dimension = 'calculator_id'
    const dimensions = 'task_id%2Ctask_name'

    const [cadenceKey, handleCadenceKeyChange] = useUpdateSingleInput({cadence_key: "1"})
    const [forecastPeriod, handleForecastPeriodChange] = useUpdateSingleInput({forecast_period: "8"})

    console.log(cadenceKey)

    const query_params = `filter_dimension=${filter_dimension}&filter_value=${params.timesaverId}&dimensions=${dimensions}&cadence_key=${cadenceKey.cadence_key}&forecast_period=${forecastPeriod.forecast_period}`
    
    const { cadences, cadencesLoading } = useFetchCadences('cadence');

    const { calculator, calculatorLoading } = useFetchCalculator(`2/1/calculator/${params.timesaverId}/summary?${query_params}`);
    const { calculatorInputs, calculatorInputsLoading } = useFetchCalculatorInputs(`2/1/calculator/${params.timesaverId}/inputs`);
    

        
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
                            activeKey="summary"
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
                                        <div>Summary</div>
                                    </Col>
                                    <Col md={8}></Col>
                            </Card.Header>
                            {calculatorLoading? <Spinner animation="border" variant="primary" />: 
                                <Card.Body>
                                    <p className="lead">Current Cost</p>
                                    <p>
                                        <span class="text-dark font-weight-bold">{calculator[0].task_name}&nbsp;</span>
                                        takes&nbsp;
                                        <span class="text-dark font-weight-bold">{calculator[0].current_time_spent}&nbsp;{calculator[0].task_time_spent_period}&nbsp;</span>
                                        to perform.
                                    </p> 
                                    <p>
                                        The&nbsp; 
                                        <span class="text-dark font-weight-bold">{calculator[0].employee_name}&nbsp;</span> 
                                        who is performing the task costs&nbsp; 
                                        <span class="text-dark font-weight-bold">${calculator[0].employee_rate} per {calculator[0].task_period}</span>
                                    </p>
                                    <p>
                                        Current cost per task is&nbsp; 
                                        <span class="text-dark font-weight-bold">(${calculator[0].employee_rate} x {calculator[0].current_time_spent}) = ${calculator[0].current_cost_per_task}</span>
                                    </p>
                                    <p>
                                        Since the task will be performed&nbsp; 
                                        <span class="text-dark font-weight-bold">{calculator[0].num_tasks_in_period}&nbsp;</span>
                                        times in a {calculator[0].analysis_period}, cost per {calculator[0].analysis_period} is&nbsp;
                                        <span class="text-dark font-weight-bold">(${calculator[0].current_cost_per_task} x {calculator[0].num_tasks_in_period}) = ${calculator[0].current_cost_per_period}</span>
                                    </p>
                                    
                                    <p className="lead">New Cost</p>
                                    <p>
                                        The&nbsp; 
                                        <span class="text-dark font-weight-bold">{calculator[0].product_name}&nbsp;</span>
                                        reduces time spent by&nbsp;
                                        <span class="text-dark font-weight-bold">{calculator[0].time_save_ratio}%&nbsp;</span>
                                        and costs&nbsp;
                                        <span class="text-dark font-weight-bold">${calculator[0].product_cost_per_task}&nbsp;</span>
                                        per task
                                    </p>
                                    <p>
                                        New cost per task is&nbsp; 
                                        <span class="text-dark font-weight-bold">(${calculator[0].current_cost_per_task} x {calculator[0].new_time_save_pct}%) + ${calculator[0].product_cost_per_task} = ${calculator[0].new_cost_per_task}</span>
                                    </p>
                                    <p>
                                        Since the task will be performed&nbsp;
                                        <span class="text-dark font-weight-bold">{calculator[0].num_tasks_in_period}&nbsp;</span> 
                                        times in a {calculator[0].analysis_period} the new cost per {calculator[0].analysis_period} is&nbsp;
                                        <span class="text-dark font-weight-bold">(${calculator[0].new_cost_per_task} x {calculator[0].num_tasks_in_period}) = ${calculator[0].new_cost_per_period}</span>
                                    </p>
                                    
                                    <p className="lead">Value</p>
                                    <p>
                                        Total value per task is&nbsp; 
                                        <span class="text-dark font-weight-bold">(${calculator[0].current_cost_per_task} - ${calculator[0].new_cost_per_task}) = ${calculator[0].value_per_task}</span>
                                    </p>
                                    <p>
                                        Total value per {calculator[0].analysis_period} is&nbsp; 
                                        <span class="text-dark font-weight-bold">(${calculator[0].current_cost_per_period} - ${calculator[0].new_cost_per_period}) = ${calculator[0].value_per_period}</span>
                                    </p>
                                </Card.Body>
                            }
                        </Card>
                    </Col>
                </Row>
            </div>

        )
};

export default SummaryTimeSaver