import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row, Spinner, Container } from 'react-bootstrap';
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const CustomCalculatorsForPeople = () => {
    
    // const [freeCalculators, setFreeCalculators] = useState({options: null, loading: true})

    // const requestOptions = {
    //     method: "GET",
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer olBo2Y5QqgGrO439c7GIRSmR4KG2vRxqU-DO3yTlEL0'
    //     }
    // };
    
    // useEffect(() => {
    //     setFreeCalculators({data: null, loading: true});
    //     Promise.all([
    //         fetch(`https://cdn.contentful.com/spaces/sh989jgpejo4/environments/master/entries?content_type=isoStockOptionScenarioBuilder&select=fields.name`, requestOptions)  
    //     ])
    //         .then(([x1]) => Promise.all([x1.json()]))
    //         .then(([y1]) => {
    //             setFreeCalculators({data: y1.items,inputsLoading: false})
    //         });
    // },[])
        
        return(
            <Container fluid="true">
                <div class="page-header page-header-light">
                    <div class="row align-items-center">
                        <div class="col">
                            <a href='/'>
                                <h1 class="page-header-title">HS Customs</h1>
                            </a>
                        </div>
                    </div>
                </div>
                {/* {freeCalculators.loading? <Spinner animation="border" variant="primary" /> : */}
                    <Row>
                        {/* {freeCalculators.data.map(calculator => (
                            <Col md={4}>
                                <div className="card card-hover-shadow">
                                    <div className="card-body card-body-height">
                                        <div className="card-body-centered">
                                        </div>
                                        <h3 className="card-title">{calculator.fields.name}</h3>
                                        <p className="card-text">Great Description</p>
                                        <a href='#' className="stretched-link"></a>
                                    </div>
                                </div>
                            </Col>
                        ))} */}
                    </Row>
                {/* } */}
            </Container>

        )
};

export default CustomCalculatorsForPeople