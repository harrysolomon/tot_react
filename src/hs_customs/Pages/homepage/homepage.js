import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './homepage.css';
import { Col, Row, Spinner } from 'react-bootstrap';
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const Homepage = () => {
    
    const [freeCalculators, setFreeCalculators] = useState({options: null, loading: true})

    const requestOptions = {
        method: "GET",
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer olBo2Y5QqgGrO439c7GIRSmR4KG2vRxqU-DO3yTlEL0'
        }
    };
    
    useEffect(() => {
        setFreeCalculators({data: null, loading: true});
        Promise.all([
            fetch(`https://cdn.contentful.com/spaces/sh989jgpejo4/environments/master/entries?content_type=services&select=fields.serviceName,fields.description,fields.pageReference`, requestOptions)  
        ])
            .then(([x1]) => Promise.all([x1.json()]))
            .then(([y1]) => {
                setFreeCalculators({data: y1.items,inputsLoading: false})
            });
    },[])

    freeCalculators.loading ?  console.log("loading") : console.log("free calculators are", freeCalculators.data)
    
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


    const backgroundImgStyler = {
        /* Set rules to fill background */
        minHeight: "100%",
        minWidth: "1024px",
            
        /* Set up proportionate scaling */
        width: "100%",
        height: "auto",
            
        /* Set up positioning */
        position: "fixed",
        top: "0",
        left: "0",

        // maxWidth: "1024px",
        // left: "50%",
        // marginLeft: "-512px"
    };

    const backgroundImgStyle = {
        backgroundImage: `url("./calculator1.jpg")`
    }

    const lineChartStyle = {
        position: "relative", 
        height: "55vh"
    };
    
    const filter_dimension = 'calculator_id'
    const dimensions = 'calculator_id%2Ccalculator_name'
        
        return(
            <main id="content" role="main" class="main">
                <div className="custombg">
                    {/* <img src={require("./calculator1.jpg")} alt="" style={backgroundImgStyler}></img>*/}
                    <div class="container-fluid" style={backgroundStyle}>
            
                        <div class="page-header page-header-light">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h1 class="page-header-title">HS Customs</h1>
                                </div>
                                <ul class="nav justify-content-end">
                                <li class="nav-item ">
                                        <a class="nav-link" href="#">About</a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link" href="/free-calculators">Free Calculators</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Custom Solutions</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="displayContainer">Sup
                        </div>
                    </div>
                </div>
                {freeCalculators.loading? <Spinner animation="border" variant="primary" /> :
                    <Row>
                        {freeCalculators.data.map(calculator => (
                            <Col md={4}>
                                <div className="card card-hover-shadow">
                                    <div className="card-body card-body-height">
                                        <div className="card-body-centered">
                                        </div>
                                        <h3 className="card-title">{calculator.fields.serviceName}</h3>
                                        <p className="card-text">{calculator.fields.description.content[0].content[0].value}</p>
                                        <a href={`${calculator.fields.pageReference}`} className="stretched-link"></a>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                }
            </main>

        )
};

export default Homepage