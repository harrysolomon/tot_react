import React from 'react'
import { Row, Col, Button, Card, Spinner } from 'react-bootstrap'
import { useFetchTimeSaverList } from '../../hooks/useFetchHook';
import { timeSaverProductListHeaders } from '../../constants/headers'
import { useParams } from 'react-router-dom'
import Table from '../../../components/table'
import Tabs from '../../../components/tabs'
import { timeSaverListTabs } from '../../constants/tabs'
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const TimeSaverGettingStarted = () => {
    
    const params = useParams()

    const tabStyle = {
        paddingTop: "0px 0"
    };

    const tableColumns = ["name","description","cost","created_at"]
    
    const { timeSaverList, timeSaverListLoading } = useFetchTimeSaverList('2/1/product/list');

        
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
                            activeKey="getting_started"
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
                                    <div>Getting Started</div>
                                </Col>
                                <Col md={4}/>
                                <Col md={4}>
                                </Col>
                            </Card.Header>
                            <Card.Body>
                                <p className="lead">Step 1: Gather the following information from the client:</p>
                                <dl className="row">
                                    <dt className="col-sm-2">Client Tasks</dt>
                                    <dd className="col-sm-9">The set of tasks they are responsible for that they wish to make more efficient</dd>
                                    <dt className="col-sm-2">Time Spent</dt>
                                    <dd className="col-sm-9">Amount of time the task takes and how often they must perform the task</dd>
                                    <dt className="col-sm-2">Employee Responsible</dt>
                                    <dd className="col-sm-9">The tile of the employee responsible for performing the task</dd>
                                </dl>
                                <p></p>
                                <p className="lead">Step 2: Map each task to a product that your company provides</p>
                                <iframe src="https://giphy.com/embed/1rVNFK2XoM0j5pQxos" width="480" height="160" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/1rVNFK2XoM0j5pQxos">via GIPHY</a></p>
                                <p></p>
                                <p className="lead">Step 3: Profit</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

        )
};

export default TimeSaverGettingStarted