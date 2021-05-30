import React, { useState } from 'react'
import { config } from '../../../../constants'
import { Row, Col, Button, FormGroup, InputGroup, FormControl, Spinner } from 'react-bootstrap'
import { XSquareFill } from 'react-bootstrap-icons'
import { useFetchCadences } from '../../hooks/useFetchHook';
import { useUpdateSingleInput } from '../../hooks/useForm'
import { Redirect } from 'react-router'
import Select from '../../../components/select'
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const NewTimeSaverProduct = () => {
    
    const [values, handleChange] = useUpdateSingleInput({name: "", description: "", cost: "", period: "", time_save: "", time_unit: "", product_type_id: 1, created_by: 2, calculator_type_id: 1})

    const { cadences, cadencesLoading } = useFetchCadences('cadence');
    const [newProduct, setNewProduct] = useState({redirect: false, newProductId: null})

    const handleSubmit = (e) => {
        values.cost = parseInt(values.cost)
        values.period = parseInt(values.period)
        values.time_save = parseInt(values.time_save) 
        values.time_unit = parseInt(values.time_unit)
        
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
            
        Promise.all([
            fetch(config.url.API_URL + '2/1/product/create', requestOptions)
        ])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => {
                setNewProduct({ redirect: true, newProductId: data[0].id })
            });
    }
        
    return(
        newProduct.redirect ? <Redirect to={{pathname: "/for-business/timesaver/product_list"}}/> :
        <div className="container-fluid">
            <div className="page-header">
                <div className ="row align-items-bottom">
                    <div className="col-sm mb-2 mb-sm-0">
                        <h1 className="page-header-title text-left align-bottom">Create Product</h1>
                    </div>
                    <div className="col-sm mb-2 mb-sm-0">
                        <div className="text-right">
                            <Button 
                                href="/for-business/timesaver/product_list"
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
                        <label>Product Name</label>
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
                        <label>Description</label>
                        <InputGroup>
                            <FormControl 
                                as="textarea"
                                aria-label="With textarea"
                                type="text"
                                name="description"
                                value={values.description}
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
                                value={values.time_save}
                                onChange={handleChange}/>
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
                            onChange = {handleChange}
                            selectedValue = {values.time_unit}
                            optionName = "plural"
                            />
                        }
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                </Col>
                <Col md={2}>
                    <Button href="/for-business/timesaver/product_list" variant="outline-secondary" block>Close</Button>
                </Col>
                <Col md={2}>
                    <Button variant="primary" block onClick={handleSubmit}>Submit</Button>
                </Col>
            </Row>
        </div>
    
    )
}

export default NewTimeSaverProduct