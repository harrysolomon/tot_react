import React from 'react'
import { definitions } from '../../definitions'
import TableHeader from './table_header'
import EditableInput from './editable_input'
import { Row, Col, FormGroup, Button, Card, Form } from 'react-bootstrap'
import { XSquareFill } from 'react-bootstrap-icons'
import SelectInput from './select_input'

const NewTimeSaverFunc = () => {

const headers = [
    {
        "name": "#",
        "definition": "",
        "tooltip": false
    },
    {
        "name": "Name",
        "definition": definitions.name,
        "tooltip": true
    },
    {
        "name": "Product",
        "definition": definitions.product,
        "tooltip": true
    },
    {
        "name": "Current Time Spent",
        "definition": definitions.current_time_spent,
        "tooltip": true
    },
    {
        "name": "Employee",
        "definition": definitions.employee,
        "tooltip": true
    },
    {
        "name": "",
        "definition": "",
        "tooltip": false
    }
]

const the_rows = [{
    "cadences": "",
    "employees": "",
    "products": "",
    "current_time_spent": "",
    "current_time_spent_period": "",
    "name": "sup",
    "_id": 1
}]

const employees = [
    {
        "_id":"604da1f7374df1b705426c79",
        "name":"Product Manager",
        "cost":80000,
        "department":"Product",
        "period":"year",
        "deleted":false,
        "createdAt":"2021-03-14T05:41:11.030Z",
        "updatedAt":"2021-03-14T05:41:11.030Z",
        "__v":0
    },
    {
        "_id":"604da23dc3322bb723553892",
        "name":"Analyst",
        "cost":55000,
        "department":"Finance",
        "period":"year",
        "deleted":false,
        "createdAt":"2021-03-14T05:42:21.352Z",
        "updatedAt":"2021-04-01T01:13:49.583Z",
        "__v":0
    }
]
    return(
        <div className="container-fluid">
            <div className="page-header">
                <div className ="row align-items-bottom">
                    <div className="col-sm mb-2 mb-sm-0">
                        <h1 className="page-header-title text-left align-bottom">Time Saver</h1>
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
                <Col md={4}>
                    <FormGroup key="timeSaverName">
                        <label>Time Saver Name</label>
                        <EditableInput cell={{timeSaverName: ""}} name="time_saver_name"/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Col>Inputs</Col>
                            <Col>
                            <div className="text-right">
                                <Button size="sm" variant="primary">
                                    Calculate and Save
                                </Button>
                                </div>
                            </Col>
                        </Card.Header>
                        <Card.Body>
                            <table className="table table-bordered table-hover" id="tab_logic">
                                <TableHeader headers={headers} />
                                <tbody>
                                    {the_rows.map((row) =>
                                    <tr key={row._id}>
                                        <td key="row_numbr">{row._id}</td>
                                        <td>
                                            <EditableInput cell={{name: ""}} name="name"/>
                                        </td>
                                        <td>
                                            <SelectInput cell={{employee: ""}} table={employees} name="employee" />
                                        </td>
                                        <td key="timespent">
                                            <Form>
                                            <Form.Row>
                                                    <Col md={3}>
                                                        <EditableInput cell={{current_time_spent: ""}} name="current_time_spent"/>
                                                    </Col>
                                                    <Col md={4} key="current_time_spent_period">
                                                        <SelectInput cell={{employee: ""}} table={employees} name="employee" />
                                                    </Col>
                                                    <Col md={1}>
                                                    <div className="h-100 d-flex align-items-center">per</div>
                                                    </Col>
                                                    
                                                    <Col md={4}>
                                                        <SelectInput cell={{employee: ""}} table={employees} name="employee" />
                                                    </Col>
                                            </Form.Row>
                                            </Form>
                                        </td>   
                                        <td>
                                            <SelectInput cell={{employee: ""}} table={employees} name="employee" />
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>

    )
};

export default NewTimeSaverFunc

