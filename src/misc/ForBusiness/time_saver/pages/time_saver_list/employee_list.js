import React from 'react'
import { Row, Col, Button, Card, Spinner } from 'react-bootstrap'
import { useFetchTimeSaverList } from '../../hooks/useFetchHook';
import { timeSaverEmployeeListHeaders } from '../../constants/headers'
import { useParams } from 'react-router-dom'
import Table from '../../../components/table'
import Tabs from '../../../components/tabs'
import { timeSaverListTabs } from '../../constants/tabs'
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const TimeSaverEmployeeList = () => {
    
    const params = useParams()

    const tabStyle = {
        paddingTop: "0px 0"
    };

    const tableColumns = ["name","department","cost_detail","created_at"]
    
    const { timeSaverList, timeSaverListLoading } = useFetchTimeSaverList('2/1/worker/list');

        
        return(
            <div className="container-fluid">
                <div className="page-header">
                    <div className ="row align-items-bottom">
                        <div className="col-sm mb-2 mb-sm-0">
                            <h1 className="page-header-title text-left align-bottom">Time Saver</h1>
                        </div>
                        <div className="col-sm mb-2 mb-sm-0">
                        </div>

                    </div>
                </div>
                
                <Row>
                    <Col md={6} style={tabStyle}>
                        <Tabs
                            tabs={timeSaverListTabs}
                            activeKey="employee_list"
                            baseUrl='for-business'
                            id={params.calculatorType}
                        />
                    </Col>
                    <Col md={6} />
                </Row>

                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header>
                                <Col md={4}>
                                    <div>Employees</div>
                                </Col>
                                <Col md={4}/>
                                <Col md={4}>
                                    <div className="text-right">
                                        <Button href={"/for-business/timesaver/employee/new"}> Add Employee </Button>
                                    </div>
                                </Col>
                            </Card.Header>
                            {timeSaverListLoading? <Spinner animation="border" variant="primary" />: 
                                <Table 
                                    headers={timeSaverEmployeeListHeaders}
                                    tableBody={timeSaverList}
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

export default TimeSaverEmployeeList