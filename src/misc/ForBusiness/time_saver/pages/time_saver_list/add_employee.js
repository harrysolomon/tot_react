import React, { useState } from 'react'
import { config } from 'constants/constants'
import { Row, Col, Button, FormGroup, InputGroup, FormControl, Spinner } from 'react-bootstrap'
import { XSquareFill } from 'react-bootstrap-icons'
import { useFetchCadences } from '../../hooks/useFetchHook';
import { useUpdateSingleInput } from '../../hooks/useForm'
import { Redirect } from 'react-router'
import Select from '../../../components/select'
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const NewTimeSaverEmployee = () => {
    
    const [values, handleChange] = useUpdateSingleInput({name: "", department: "", cost: "", period: "", worker_type_id: 1, created_by: 2})

    const { cadences, cadencesLoading } = useFetchCadences('cadence');
    const [newEmployee, setNewEmployee] = useState({redirect: false, newEmployeeId: null})

    const handleSubmit = (e) => {
        values.cost = parseInt(values.cost)
        values.period = parseInt(values.period)
        
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
            
        Promise.all([
            fetch(config.url.API_URL + '2/1/worker/create', requestOptions)
        ])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => {
                setNewEmployee({ redirect: true, newEmployeeId: data[0].id })
            });
    }
        
    return(
        newEmployee.redirect ? <Redirect to={{pathname: "/for-business/timesaver/employee_list"}}/> :
        <div className="container-fluid">
            <div className="page-header">
                <div className ="row align-items-bottom">
                    <div className="col-sm mb-2 mb-sm-0">
                        <h1 className="page-header-title text-left align-bottom">Create Employee</h1>
                    </div>
                    <div className="col-sm mb-2 mb-sm-0">
                        <div className="text-right">
                            <Button 
                                href="/for-business/timesaver/employee_list"
                                variant="outline-primary"
                            >
                                <XSquareFill/>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
            <Row>
                <Col md={6}>
                    <FormGroup key="name">
                        <label>Employee Title</label>
                        <InputGroup>
                            <FormControl 
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}/>
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup key="description">
                        <label>Department</label>
                        <InputGroup>
                            <FormControl 
                                type="text"
                                name="department"
                                value={values.department}
                                onChange={handleChange}/>
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
                                value={values.cost}
                                onChange={handleChange}/>
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
                            onChange = {handleChange}
                            selectedValue = {values.period}
                            optionName = "adj"
                            />
                        }
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                </Col>
                <Col md={2}>
                    <Button href="/for-business/timesaver/employee_list" variant="outline-secondary" block>Close</Button>
                </Col>
                <Col md={2}>
                    <Button variant="primary" block onClick={handleSubmit}>Submit</Button>
                </Col>
            </Row>
        </div>
    
    )
}

export default NewTimeSaverEmployee