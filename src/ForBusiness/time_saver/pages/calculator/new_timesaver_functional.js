import React, { useState } from 'react'
import { config } from '../../../../constants'
//import { cadences } from '../../../../cadences'
import TableHeader from '../../../components/table_header'
import { Row, Col, Button, Card, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import { XSquareFill } from 'react-bootstrap-icons'
import { useFetchProduct, useFetchWorker, useFetchCadences } from '../../hooks/useFetchHook';
import { useUpdateSingleInput } from '../../hooks/useForm'
import EditableTable from '../../../components/editableTable'
import { timesaver_rows, timesaver_cells } from '../../constants/editable_table_inputs'
import { headers } from '../../constants/headers'
import { useGatherCalculatorInputs } from '../../hooks/useGatherCalculatorInputs'
import { Redirect } from 'react-router'
//import { useCreateRedirect } from '../../hooks/useCreateRedirect'

const NewTimeSaverFunc = () => {

    const newRow = {
        "cadences": "",
        "employees": "",
        "products": "",
        "current_time_spent": "",
        "current_time_spent_period": "",
        "name": "",
        "id": 1
    }
    
    const [tableBody, setTableBody] = useState(timesaver_rows)
    const [values, handleChange] = useUpdateSingleInput({name: ""})

    const { cadences, cadencesLoading } = useFetchCadences('cadence');
    const { product, productLoading } = useFetchProduct('2/1/product/list');
    const { worker, workerLoading } = useFetchWorker('2/1/worker/list');

    const completeLoading = (cadencesLoading || productLoading || workerLoading)
    console.log(" individuals", cadencesLoading, productLoading, workerLoading)
    console.log("complete", completeLoading)
    

    timesaver_cells[1].inputs[0].select.options = worker
    timesaver_cells[3].inputs[0].select.options = product
    timesaver_cells[2].inputs[1].select.options = cadences
    timesaver_cells[2].inputs[3].select.options = cadences

    const { submittedValues } = useGatherCalculatorInputs(values.name,tableBody, cadences, product, worker, completeLoading)

    const [newCalculator, setNewCalculator] = useState({redirect: false, newCalculatorId: null})

    const handleAddRow = (e) => {
        //this is not being done right

        if(tableBody.length===0){
            let newArray = [...tableBody, newRow]
            setTableBody(newArray)
        } else {
            let new_id = (tableBody[tableBody.length - 1].id) + 1
            newRow.id = new_id
            let newArray = [...tableBody, newRow]
            setTableBody(newArray)
        }
        
    }

    const handleArrayChange = (e) => {
        let elementsIndex = tableBody.findIndex(value => value.id == e.target.id )
        let newArray = [...tableBody]
            newArray[elementsIndex][e.target.name] = e.target.value
            setTableBody(newArray)
    }

    const handleRemoveSpecificRow = (e) => {
        let elementsIndex = tableBody.findIndex(value => value.id == e.target.id )
        const smallerTable = [...tableBody];
        smallerTable.splice(elementsIndex, 1);
        setTableBody(smallerTable);
    };

    const handleSubmit = (e) => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submittedValues)
        };
            
        Promise.all([
            fetch(config.url.API_URL + 'timesaver', requestOptions)
        ])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => {
                setNewCalculator({ redirect: true, newCalculatorId: data.id })
            });
    }
        
        return(
            newCalculator.redirect ? <Redirect to={{pathname: "/for-business/timesaver/"+newCalculator.newCalculatorId}}/> :
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
                            <InputGroup>
                                <FormControl
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    {completeLoading? <div></div>:<Col>
                        <Card>
                            <Card.Header>
                                <Col>Inputs</Col>
                                <Col>
                                <div className="text-right">
                                    <Button size="sm" variant="primary" onClick={handleSubmit}>
                                        Calculate and Save
                                    </Button>
                                    </div>
                                </Col>
                            </Card.Header>
                            <Card.Body>
                                <table className="table table-bordered table-hover" id="tab_logic">
                                    <TableHeader 
                                        headers={headers} 
                                        text="center"
                                    />
                                    <EditableTable 
                                    table={tableBody}  
                                    section={timesaver_cells} 
                                    onChange={handleArrayChange}
                                    removeRow={handleRemoveSpecificRow}/>
                                    </table>
                                <Button onClick={handleAddRow} variant="link">Add Row</Button>
                            </Card.Body>
                        </Card>
                    </Col>}
                </Row>
            </div>

        )
};

export default NewTimeSaverFunc

