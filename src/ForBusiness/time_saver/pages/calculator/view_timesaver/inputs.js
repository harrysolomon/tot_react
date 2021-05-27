import React from 'react'
import { Row, Col, Button, Card, Spinner } from 'react-bootstrap'
import { XSquareFill } from 'react-bootstrap-icons'
import { useFetchProduct, useFetchWorker, useFetchCadences, useFetchCalculatorInputs } from '../../../hooks/useFetchHook';
import { inputViewTimeSaverHeaders } from '../../../constants/headers'
import { useParams } from 'react-router-dom'
import Table from '../../../../components/table'
import Tabs from '../../../../components/tabs'
import { timeSaverTabs } from '../../../constants/tabs'
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const InputsTimeSaver = () => {
    
    const params = useParams()

    const tabStyle = {
        paddingTop: "0px 0"
    };

    const dropdownStyle = {
        paddingLeft: "15px",
        paddingBottom: "2px",
        paddingTop: "2px"
    };

    const tableColumns = ["time_saver_name","employee_name","current_time_spent","product_name"]
    
    const { cadences, cadencesLoading } = useFetchCadences('cadence');
    const { product, productLoading } = useFetchProduct('2/1/product/list');
    const { worker, workerLoading } = useFetchWorker('2/1/worker/list');
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
                        <Tabs
                            tabs={timeSaverTabs}
                            activeKey="inputs"
                            baseUrl='for-business/timesaver'
                            reportId={params.timesaverId}
                        />
                    </Col>
                    <Col md={8} />
                </Row>

                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header>
                                <Col md={4}>
                                    <div>Inputs</div>
                                </Col>
                                <Col md={4}/>
                                <Col md={4}>
                                    <div className="text-right">
                                        <Button href={"/for-business/timesaver/"}> Edit </Button>
                                    </div>
                                </Col>
                            </Card.Header>
                            {calculatorInputsLoading? <Spinner animation="border" variant="primary" />: 
                                <Table 
                                    headers={inputViewTimeSaverHeaders}
                                    tableBody={calculatorInputs}
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

export default InputsTimeSaver