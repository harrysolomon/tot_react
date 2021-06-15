import React, { useState, useEffect } from 'react'
import Select from '../../../../components/select'
import { Row, Col, Dropdown, DropdownButton, Spinner } from 'react-bootstrap'
import { XSquareFill } from 'react-bootstrap-icons'
import { useFetchCadences, useFetchCalculator, useFetchCalculatorInputs } from '../../../hooks/useFetchHook';
import { useUpdateSingleInput } from '../../../hooks/useForm'
import { timeSaverTableHeaders } from '../../../constants/headers'
import { useParams } from 'react-router-dom'
import LineChart from '../../../../../library/line_chart'
import Table from '../../../../components/table'
import Tabs from '../../../../components/tabs'
import { timeSaverTabs } from '../../../constants/tabs'
import { config } from '../../../../../constants'
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const LineChartTimeSaver = () => {
    const params = useParams()

    console.log(params)
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

    const [cadenceKey, setCadenceKey] = useState(1)
    console.log("the cadence key is", cadenceKey)
    const [forecastPeriod, handleForecastPeriodChange] = useUpdateSingleInput({forecast_period: "8"})

  //  console.log(cadenceKey)

    const query_params = `filter_dimension=${filter_dimension}&filter_value=${params.timesaverId}&dimensions=${dimensions}&cadence_key=${cadenceKey}&forecast_period=${forecastPeriod.forecast_period}`
    
    const { cadences, cadencesLoading } = useFetchCadences('cadence');

    const [calculator, setCalculator] = useState({ trend: null, tasks: null, totals:null, calculatorLoading: true })

    useEffect(() => {
        setCalculator({ trend: null, tasks: null, totals: null, calculatorLoading: true });
        Promise.all([
            fetch(`${config.url.API_URL}2/1/calculator/${params.timesaverId}/trend?${query_params}`), 
            fetch(`${config.url.API_URL}2/1/calculator/${params.timesaverId}/totals?${query_params}`)
        ])
            .then(([trendRoute, totalRoute]) => Promise.all([trendRoute.json(), totalRoute.json()]))
            .then(([trendData, totalData]) => {
                setCalculator({ trend: trendData, tasks: totalData, totals: totalData[0], calculatorLoading: false})
            });
    },[
        `${config.url.API_URL}2/1/calculator/${params.timesaverId}/trend?${query_params}`,
        `${config.url.API_URL}2/1/calculator/${params.timesaverId}/totals?${query_params}`
    ]);

    //const { calculator, calculatorLoading } = useFetchCalculator(`2/1/calculator/${params.timesaverId}/trend?${query_params}`);
    const { calculatorInputs, calculatorInputsLoading } = useFetchCalculatorInputs(`2/1/calculator/${params.timesaverId}/inputs`);


        
        return(
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
                            </div>
                            <Row>
                            
                            {/* <div class="row align-items-center"> */}
                                <Col md={4} style={tabStyle}>
                                    <Tabs
                                        tabs={timeSaverTabs}
                                        activeKey="graph"
                                        baseUrl='for-business/timesaver'
                                        id={params.timesaverId}
                                    />
                                </Col>
                            </Row>
                            {/* </div> */}
                            
                        </div>
                            
                    </div>}
                </div>

                <div class="content container-fluid" style={dataOutputStyle}>
                    <div class="card mb-3 mb-lg-5">
            
                        <div class="card-header">
                            <h4 class="card-header-title">Cost Trend</h4>
                        </div>
                        {calculator.calculatorLoading? <Spinner animation="border" variant="primary" />:
                        <div class="card-body">
                        
                            <div class="row align-items-sm-center mb-4">
                                <div class="col-sm mb-3 mb-sm-0">
                                    <div class="d-flex align-items-center">
                                        <span class="h1 mb-0">{`Added Value: $${calculator.totals.total_value} USD`}</span>

                                        <span class="text-success ml-2">
                                            <i class="tio-trending-up"></i> {`${calculator.totals.roi_pct}%`}
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
                                data={calculator.trend.data} 
                                options={calculator.trend.options}
                            />
                        </div>}
                        {/* <!-- Table --> */}
                        <div class="table-responsive">
                        {calculator.calculatorLoading? <Spinner animation="border" variant="primary" />:
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
                                    {calculator.tasks.map((task) => 
                                    <tr>
                                        <td>
                                            <a class="media align-items-center" href="project.html">
                                                {/* <img class="avatar avatar-sm mr-3" src="./assets/svg/brands/spec.svg" alt="Image Description"/> */}
                                                <div class="media-body">
                                                    <span class="d-block h5 text-hover-primary mb-0">{task.task_name}</span>
                                                </div>
                                            </a>
                                        </td>
                                        <td>
                                            {/* <!-- Avatar Group --> */}
                                            <div class="avatar-group avatar-group-xs avatar-circle">
                                                <a class="avatar avatar-soft-info" href="user-profile.html" data-toggle="tooltip" data-placement="top" title="Lisa Iston">
                                                    <span class="badge badge-soft-success badge-pill">{task.employee_name}</span>
                                                </a>
                                            </div>
                                            {/* <!-- End Avatar Group --> */}
                                        </td>
                                        <td>
                                            {/* <!-- Avatar Group --> */}
                                            <div class="avatar-group avatar-group-xs avatar-circle">
                                                <a class="avatar avatar-soft-info" href="user-profile.html" data-toggle="tooltip" data-placement="top" title="Lisa Iston">
                                                    <span class="badge badge-soft-success badge-pill">{task.product_name}</span>
                                                </a>
                                            </div>
                                            {/* <!-- End Avatar Group --> */}
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <span class="mb-0">Add to API</span>
                                                <span class="badge badge-soft-danger p-1 ml-2">
                                                    <i class="tio-trending-down"></i> 1.8%
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <span class="mb-0">{`$${task.total_value_per_task}`}</span>
                                                <span class="badge badge-soft-success p-1 ml-2">
                                                    <i class="tio-trending-up"></i> {`${task.roi_pct_per_task}%`}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>}
                        </div>
                        {/* <!-- Card Footer --> */}
                        <a class="card-footer text-center" href={`/for-business/timesaver/${params.timesaverId}/edit`}>
                            Edit Tasks <i class="tio-chevron-right"></i>
                        </a>
                        {/* <!-- End Card Footer --> */}
                    </div>
                    {/* <!-- End Card --> */}                                    
                </div>
            </main>

        )
};

export default LineChartTimeSaver