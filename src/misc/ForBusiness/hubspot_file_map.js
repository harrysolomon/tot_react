import React, { useState, useEffect } from 'react'
import { Row, Col, Modal, Button, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Tabs from './components/tabs'
import { hubSpotTabs } from './time_saver/constants/tabs'
import { config } from 'constants/constants'

const HubSpotFileMap = () => {
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

    const [data, setData] = useState({ deals: null, companies: null, files: null, loading: true })
    const [showModal, setShowModal] = useState({ modalDisplay: false, modalId: ''})
    const [editSuccess, setEditSuccess] = useState(false)

    //const apiKey = 'a59b0b7b-c513-4046-833a-48731ca8aa55'
    const getDeals = `${config.url.API_URL}deals`
    const getCompanies = `${config.url.API_URL}companies`
    const getFiles = `${config.url.API_URL}files`

    useEffect(() => {
        setEditSuccess(false)
        setData({ deals: null, companies: null, files: null, loading:true})
        Promise.all([
            fetch(getDeals), 
            fetch(getCompanies),
            fetch(getFiles)
        ])
            .then(([dealRoute, companyRoute, fileRoute]) => Promise.all([dealRoute.json(), companyRoute.json(), fileRoute.json()]))
            .then(([dealData, companyData, fileData]) => {
                setData(
                    { 
                        deals: dealData.deals,
                        companies: companyData.companies,
                        files: fileData,
                        loading: false
                    }
                )
            });
    },[editSuccess
        // getDeals,
        // getCompanies,
        // getFiles
    ]);



    const fileAssignmentModal = () => {

        return (
            <Modal
                size="lg"
                show={showModal.modalDisplay}
                onHide={() => setShowModal({...showModal, modalDisplay: false})}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Assign to a File
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div class="table-responsive">  
                        <table class="table table-borderless table-thead-bordered table-align-middle card-table">
                            <thead class="thead-light">
                                <tr>
                                <th>Files</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {data.files.map((file) => 
                                    <tr key={file.id}>
                                        <td>
                                            <Button onClick={() => handleEditValue(file)}>
                                                {file.name}
                                            </Button>
                                            
                                        </td>
                                    </tr>)}
                                </tbody>
                        </table>
                    </div> 
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary"
                        onClick={() => setShowModal({...showModal, modalDisplay: false})}
                    >Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const handleEditValue = (file) => {
        let request = {
            "properties": [
                {
                    "name": "expected_value",
                    "value": file.value
                },
                {
                    "name": "expected_value_link",
                    "value": file.name
              }
            ]
        }
        
        const requestOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
            
        Promise.all([
            fetch(`${config.url.API_URL}deals/${showModal.modalId}/edit`, requestOptions)
        ])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => {
                //setSuccessProductEdit(true)
                setShowModal({...showModal, modalDisplay: false})
                setEditSuccess(true)
            });
    }

        
        return(
            <main id="content" role="main" class="main">
                    <div class="content container-fluid" style={backgroundStyle}>
            
                        <div class="page-header">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h1 class="page-header-title">Value Mapping Demo</h1>
                                </div>
                            </div>
                            
                            <Row>                           
                                <Col md={4} style={tabStyle}>
                                    <Tabs
                                        tabs={hubSpotTabs}
                                        activeKey="deals"
                                        baseUrl='for-business/timesaver'
                                        id={params.timesaverId}
                                    />
                                </Col>
                            </Row>
                            
                        </div>
                            
                    </div>

                <div class="content container-fluid" style={dataOutputStyle}>
                    <div class="card mb-3 mb-lg-5">
                        {/* <!-- Table --> */}
                        <div class="table-responsive">
                        {data.loading? <Spinner animation="border" variant="primary" />:
                            <table class="table table-borderless table-thead-bordered table-align-middle card-table">
                                <thead class="thead-light">
                                    <tr>
                                    <th>Deal name</th>
                                    <th>Company</th>
                                    <th>Amount</th>
                                    <th>Expected Value</th>
                                    <th>File</th>
                                    <th />
                                    </tr>
                                </thead> 
                                    <tbody>
                                        {data.deals.map((deal) => 
                                        <tr key={deal.dealId}>
                                            <td>
                                                {deal.properties.dealname.value}
                                            </td>
                                            <td>
                                                {data.companies.find(company => company.companyId === deal.associations.associatedCompanyIds[0]).properties.name.value} 
                                            </td>
                                            <td>
                                                {'amount' in deal.properties? deal.properties.amount.value: ''}
                                            </td>
                                            <td>
                                                {'expected_value' in deal.properties? deal.properties.expected_value.value: ''}
                                            </td>
                                            <td>
                                                {'expected_value_link' in deal.properties?
                                                <a href="https://docs.google.com/spreadsheets/d/1pa8fTCWBI2UqRlrdfyw7vgcJOO-fGXIafyqHEep4NIc/edit#gid=0">
                                                     {deal.properties.expected_value_link.value}
                                                </a>
                                                : ''}
                                            </td>
                                            <td>
                                                <Button 
                                                    bsPrefix="btn btn-sm btn-white"
                                                    onClick={() => setShowModal({modalDisplay: true, modalId: deal.dealId})}>
                                                    <i className="tio-edit"></i>
                                                    Edit
                                                </Button>
                                                {fileAssignmentModal()}
                                            </td>

                                        </tr>)}
                                    </tbody>
                                
                            </table>}
                        </div> 
                        {/* <!-- Card Footer --> */}
                        {/* <!-- End Card Footer --> */}
                    </div>
                    {/* <!-- End Card --> */}
                    </div>                                      
            </main>

        )
};

export default HubSpotFileMap