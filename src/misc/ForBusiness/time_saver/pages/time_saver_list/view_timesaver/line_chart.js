import React, { useState, useEffect } from 'react'
import { Row, Col, Dropdown, DropdownButton, Spinner, Button, Modal, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import { useFetchCadences, useFetchProduct, useFetchWorker, useFetchCalculatorInputs } from '../../../hooks/useFetchHook';
import { useUpdateSingleInput } from '../../../hooks/useForm'
import { useParams } from 'react-router-dom'
import LineChart from '../../../../../library/line_chart'
import Tabs from '../../../../components/tabs'
import { timeSaverTabs } from '../../../constants/tabs'
import { config } from '../../../../../constants/constants'
import { XSquareFill } from 'react-bootstrap-icons'
import Select from '../../../../components/select'
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const LineChartTimeSaver = () => {
    const params = useParams()

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

    const [forecastPeriod, handleForecastPeriodChange] = useUpdateSingleInput({forecast_period: "8"})

    const query_params = `filter_dimension=${filter_dimension}&filter_value=${params.timesaverId}&dimensions=${dimensions}&cadence_key=${cadenceKey}&forecast_period=${forecastPeriod.forecast_period}`
    
    const { cadences, cadencesLoading } = useFetchCadences('cadence');
    //const { product, productLoading } = useFetchProduct('2/1/product/list');
    const { worker, workerLoading } = useFetchWorker('2/1/worker/list');

    const [showModal, setShowModal] = useState({ modalDisplay: false, modalId: '' })
    const [successProductEdit, setSuccessProductEdit] = useState(false)
    const [productModalData, setProductModalData] = useState({ name: '', description: '', cost: '', period: '', time_save: '', time_unit: '', product_id: '', id: '', producDataLoading: true })

    console.log("this is the product modal data ", productModalData)
    const [calculator, setCalculator] = useState({ trend: null, tasks: null, totals:null, products: null, employees: null, calculatorLoading: true })

    useEffect(() => {
        setCalculator({ trend: null, tasks: null, totals: null, products: null, calculatorLoading: true });
        Promise.all([
            fetch(`${config.url.API_URL}2/1/calculator/${params.timesaverId}/trend?${query_params}`), 
            fetch(`${config.url.API_URL}2/1/calculator/${params.timesaverId}/totals?${query_params}`)
        ])
            .then(([trendRoute, totalRoute]) => Promise.all([trendRoute.json(), totalRoute.json()]))
            .then(([trendData, totalData]) => {
                setCalculator(
                    { 
                        trend: trendData, 
                        tasks: totalData, 
                        totals: totalData[0], 
                        products: [...new Set(totalData.map(item => item.time_saver_product_id))], 
                        calculatorLoading: false
                    }
                )
            });
    },[
        `${config.url.API_URL}2/1/calculator/${params.timesaverId}/trend?${query_params}`,
        `${config.url.API_URL}2/1/calculator/${params.timesaverId}/totals?${query_params}`
    ]);

    useEffect(() => {
        //if the modal is open and there is a product id to query for
        if(showModal.modalDisplay && showModal.modalId !== '') {
            setSuccessProductEdit(false)
            setProductModalData({ productData: null, producDataLoading: true })
            Promise.all([
                fetch(`${config.url.API_URL}2/1/product/${showModal.modalId}`)
            ])
                .then(([timeSaverProductRoute]) => Promise.all([timeSaverProductRoute.json()]))
                .then(([timeSaverProductData]) => {
                    setProductModalData({ 
                        name: timeSaverProductData.name, 
                        description: timeSaverProductData.description,
                        cost: timeSaverProductData.cost,
                        period: timeSaverProductData.period,
                        time_save: timeSaverProductData.time_save,
                        time_unit: timeSaverProductData.time_unit,
                        product_id: timeSaverProductData.product_id,
                        id: timeSaverProductData.id,
                        productDataLoading: false 
                    })
                })
        } 
        //if the modal display is closed and there is a modal id assigned (this is to ensure we don't make an api call on load)
        else if(successProductEdit) {
            setCalculator({ trend: null, tasks: null, totals: null, products: null, calculatorLoading: true });
            Promise.all([
                fetch(`${config.url.API_URL}2/1/calculator/${params.timesaverId}/trend?${query_params}`), 
                fetch(`${config.url.API_URL}2/1/calculator/${params.timesaverId}/totals?${query_params}`)
            ])
                .then(([trendRoute, totalRoute]) => Promise.all([trendRoute.json(), totalRoute.json()]))
                .then(([trendData, totalData]) => {
                    setCalculator(
                        { 
                            trend: trendData, 
                            tasks: totalData, 
                            totals: totalData[0], 
                            products: [...new Set(totalData.map(item => item.time_saver_product_id))], 
                            calculatorLoading: false
                        }
                    )
            });
        }
        
    },[showModal.modalDisplay]);

    const handleEditProduct = () => {
        const request = {}
        request.name = productModalData.name
        request.description = productModalData.description
        request.cost = parseInt(productModalData.cost)
        request.period = parseInt(productModalData.period)
        request.time_save = parseInt(productModalData.time_save) 
        request.time_unit = parseInt(productModalData.time_unit)
        request.calculator_type_id = 1
        request.product_type_id = 1
        
        const requestOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
            
        Promise.all([
            fetch(`${config.url.API_URL}2/${request.calculator_type_id}/product/${productModalData.product_id}/${productModalData.id}/edit`, requestOptions)
        ])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => {
                setSuccessProductEdit(true)
                setShowModal({...showModal, modalDisplay: false})
            });
    }

    const productEditModal = () => {

        return (
            <Modal
                size="lg"
                show={showModal.modalDisplay}
                onHide={() => setShowModal({ ...showModal, modalDisplay: false })}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit Product
                    </Modal.Title>
                </Modal.Header>
                {productModalData.producDataLoading? <Spinner animation="border" variant="primary" />:
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <FormGroup key="name">
                                <label>Product Name</label>
                                <InputGroup>
                                    <FormControl 
                                        type="text"
                                        name="name"
                                        value={productModalData.name}
                                        onChange={(e) => setProductModalData({ ...productModalData, name: e.target.value })}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup key="description">
                                <label>Description</label>
                                <InputGroup>
                                    <FormControl 
                                        as="textarea"
                                        aria-label="With textarea"
                                        type="text"
                                        name="description"
                                        value={productModalData.description}
                                        onChange={(e) => setProductModalData({ ...productModalData, description: e.target.value })}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup key="cost">
                                <label>Cost</label>
                                <InputGroup>
                                    <FormControl 
                                        type="text"
                                        name="cost"
                                        value={productModalData.cost}
                                        onChange={(e) => setProductModalData({ ...productModalData, cost: e.target.value })}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup key="period">
                                <label>Period</label>
                                {cadencesLoading? <Spinner animation="border" variant="primary" />:
                                <Select 
                                    id = "period"
                                    name = "period"
                                    options = {cadences}
                                    onChange={(e) => setProductModalData({ ...productModalData, period: e.target.value })}
                                    selectedValue = {productModalData.period}
                                    optionName = "singular"
                                    />
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup key="time_save">
                                <label>Time Saved</label>
                                <InputGroup>
                                    <FormControl 
                                        type="text"
                                        name="time_save"
                                        value={productModalData.time_save}
                                        onChange={(e) => setProductModalData({ ...productModalData, time_save: e.target.value })}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup key="time_unit">
                                <label>Time Unit</label>
                                {cadencesLoading? <Spinner animation="border" variant="primary" />:
                                <Select 
                                    id = "time_unit"
                                    name = "time_unit"
                                    options = {cadences}
                                    onChange={(e) => setProductModalData({ ...productModalData, time_unit: e.target.value })}
                                    selectedValue = {productModalData.time_unit}
                                    optionName = "plural"
                                    />
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                    
                </Modal.Body>}
                <Modal.Footer>
                    <Button 
                        variant="secondary"
                        onClick={() => setShowModal({ ...showModal, modalDisplay: false })}
                    >Close
                    </Button>
                    <Button 
                        variant="primary"
                        onClick={handleEditProduct}
                    >Save changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

   const productEnrichment = (id) => {
        if(calculator.calculatorLoading) {
            return null
        } else {
            return calculator.tasks.find(task => task.time_saver_product_id === id)
        }
    }

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
                                        activeKey="overview"
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
                {calculator.calculatorLoading? <Spinner animation="border" variant="primary" />:
                    <div class="card mb-3 mb-lg-5">
                    
                        <div class="card-header">
                            <div class="col-sm mb-3 mb-sm-0">
                                <h6 class="card-subtitle mb-0">Added Value
                                    <span className="h3 ml-sm-2"> {`$${calculator.totals.total_value} USD`}</span>
                                    <span class="text-success ml-2">
                                        <i class="tio-trending-up"></i> {`${calculator.totals.roi_pct}%`}
                                    </span>
                                </h6>
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
                        
                        <div class="card-body">                                
                            <LineChart 
                                style={lineChartStyle}
                                data={calculator.trend.data} 
                                options={calculator.trend.options}
                            />
                        </div>
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
                                    <tr key={task.task_id}>
                                        <td>
                                            <div class="ml-3">
                                                    <span className="d-block h5 text-hover-primary mb-0">{task.task_name}</span>
                                                    <span className="d-block font-size-sm text-body">{task.task_info}</span>
                                            </div>
                                        </td>
                                        <td>
                                            {/* <!-- Avatar Group --> */}
                                            <div class="ml-3">
                                                    <span className="d-block h5 text-hover-primary mb-0">{task.employee_name}</span>
                                                    <span className="d-block font-size-sm text-body">{task.employee_info}</span>
                                            </div>
                                            {/* <!-- End Avatar Group --> */}
                                        </td>
                                        <td>
                                            {/* <!-- Avatar Group --> */}
                                            <div class="ml-3">
                                                    <span className="d-block h5 text-hover-primary mb-0">{task.product_name}</span>
                                                    <span className="d-block font-size-sm text-body">{task.product_info}</span>
                                            </div>
                                            {/* <!-- End Avatar Group --> */}
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <span class="mb-0">{task.total_task_new_time_spent}</span>
                                                <span class="badge badge-soft-success p-1 ml-2">
                                                    <i class="tio-trending-down"></i> {`${task.total_task_time_spent_pct_change}%`}
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
                    </div>}
                    {/* <!-- End Card --> */}

                    <div className="card overflow-hidden">
                        <div className="card-header">
                            <h4 className="card-header-title">
                                Product Performance
                            </h4>
                        </div>
                    {calculator.calculatorLoading? <Spinner animation="border" variant="primary" />:
                    <div class="row">
                        <div class="col-lg-4">
                        {/* <!-- Body --> */}
                            <div class="card-body card-body-centered bg-light h-100 text-center">
                                <img class="avatar avatar-xl avatar-4by3" src="/assets/svg/illustrations/hi-five.svg" alt="Image Description"></img>
                                <span class="display-3 d-block text-dark">{`${calculator.totals.total_new_time_spent} Hours`}</span>
                                <span class="d-block">
                                &mdash; New Time Spent
                                <span class="badge badge-soft-success p-1 ml-2">
                                    <i class="tio-trending-down"></i> {`${calculator.totals.total_time_spent_pct_change}%`}
                                </span>
                                </span>
                            </div>
                            {/* <!-- End Body --> */}
                        </div>

                        <div class="col-lg-8">
                        {/* <!-- Body --> */}
                            <div class="card-body card-body-height">
                                <div class="table-responsive">
                                    <table class="table table-borderless table-thead-bordered table-align-middle card-table">
                                        <thead class="thead-light">
                                            <tr>
                                            <th>Product</th>
                                            <th>New Time Spent</th>
                                            <th>Added Value</th>
                                            <th />
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {calculator.products.map((product) => 
                                            <tr key={product}>
                                                <td>
                                                    <div class="ml-3">
                                                        <span className="d-block h5 text-hover-primary mb-0">{productEnrichment(product).product_name}</span>
                                                        <span className="d-block font-size-sm text-body">{productEnrichment(product).product_info}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    {/* <!-- Avatar Group --> */}
                                                    <div class="ml-3">
                                                        <span className="d-block h5 text-hover-primary mb-0">{`${productEnrichment(product).total_new_time_spent_per_product} Hours`}</span>
                                                    </div>
                                                    {/* <!-- End Avatar Group --> */}
                                                </td>
                                                <td>
                                                    {/* <!-- Avatar Group --> */}
                                                    <div class="ml-3">
                                                        <span className="d-block h5 text-hover-primary mb-0">{`$${productEnrichment(product).total_value_per_product}`}</span>
                                                    </div>
                                                    {/* <!-- End Avatar Group --> */}
                                                </td>
                                                <td>
                                                    <Button 
                                                        bsPrefix="btn btn-sm btn-white"
                                                        onClick={() => setShowModal({ modalDisplay: true, modalId: product })}>
                                                        <i className="tio-edit"></i>
                                                        Edit
                                                    </Button>
                                                    {productEditModal()}
                                                </td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                                    
                            </div>
                        </div>
                    </div>  }
                    </div>                                      
                </div>
            </main>

        )
};

export default LineChartTimeSaver