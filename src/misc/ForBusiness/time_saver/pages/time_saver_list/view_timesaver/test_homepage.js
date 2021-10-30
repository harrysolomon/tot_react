import React, { useState, useEffect } from 'react'
import { Row, Col, Dropdown, DropdownButton, Spinner, Button, Modal, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import { useFetchCadences, useFetchProduct, useFetchWorker, useFetchCalculatorInputs } from '../../../hooks/useFetchHook';
import { useUpdateSingleInput } from '../../../hooks/useForm'
import { useParams } from 'react-router-dom'
import LineChart from '../../../../../library/line_chart'
import Tabs from '../../../../components/tabs'
import { timeSaverTabs } from '../../../constants/tabs'
import { XSquareFill } from 'react-bootstrap-icons'
import Select from '../../../../components/select'
import BackgroundImg from './calculator1.jpg'
import './homepage.css';
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const TestHomepage = () => {
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
                                        <a class="nav-link" href="#">Services</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Calculators</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="displayContainer">Sup
                        </div>
                    </div>
                </div>
                <div>
                    Something cool down he
                </div>
            </main>

        )
};

export default TestHomepage