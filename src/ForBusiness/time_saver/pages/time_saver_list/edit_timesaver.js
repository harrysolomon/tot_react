import React, { useState, useEffect } from 'react'
import { config } from '../../../../constants'
import TableHeader from '../../../components/table_header'
import { Row, Col, Button, Card, FormGroup, InputGroup, FormControl, Spinner } from 'react-bootstrap'
import { XSquareFill } from 'react-bootstrap-icons'
import { useFetchProduct, useFetchWorker, useFetchCadences, useFetchCalculatorInputs } from '../../hooks/useFetchHook';
import { useUpdateSingleInput } from '../../hooks/useForm'
import EditableTable from '../../../components/editableTable'
import { timesaver_rows, timesaver_cells } from '../../constants/editable_table_inputs'
import { newTimeSaverHeaders } from '../../constants/headers'
import { Redirect } from 'react-router'
import { useParams } from 'react-router-dom'

const EditTimeSaverCalculator = () => {
    const params = useParams()
    
    const [newRow, setNewRow] = useState({
        "cadence": "",
        "time_saver_worker_id": "",
        "time_saver_product_id": "",
        "current_time_spent": "",
        "current_time_spent_period": "",
        "name": "",
        "id": 1
    })

    const { cadences, cadencesLoading } = useFetchCadences('cadence');
    const { product, productLoading } = useFetchProduct('2/1/product/list');
    const { worker, workerLoading } = useFetchWorker('2/1/worker/list');
    
    const [reportName, setReportName] = useState("")
    
    const [tableBody, setTableBody] = useState({data: null, inputsLoading: true})
    
    useEffect(() => {
        setTableBody({data: null, inputsLoading: true});
        Promise.all([
            fetch(`${config.url.API_URL}2/1/calculator/${params.timesaverId}/inputs`)  
        ])
            .then(([x1]) => Promise.all([x1.json()]))
            .then(([y1]) => {
                setTableBody({data: y1,inputsLoading: false})
                setReportName(y1[0].report_name)
                setNewRow({...newRow, id: y1[0].max_id + 1})
            });
    },[`${config.url.API_URL}2/1/calculator/${params.timesaverId}/inputs`])
    
    const completeLoading = (cadencesLoading || productLoading || workerLoading || tableBody.inputsLoading)

    timesaver_cells[1].inputs[0].select.options = worker
    timesaver_cells[3].inputs[0].select.options = product
    timesaver_cells[2].inputs[1].select.options = cadences
    timesaver_cells[2].inputs[3].select.options = cadences

    const [newCalculator, setNewCalculator] = useState({redirect: false, newCalculatorId: null})

    const handleNameChange = (e) => {
        setReportName(e.target.value)
    }
    
    const handleAddRow = (e) => {

        if(tableBody.data.length===0){
            let newArray = [...tableBody.data, newRow]
            setTableBody(newArray)
        } else {
            let newArray = [...tableBody.data, newRow]
            setTableBody({data: newArray, loading: false})
            setNewRow({...newRow, id: newRow.id + 1})
        }    
    }
    const handleArrayChange = (e) => {
        let newArray = [...tableBody.data]
            newArray.find(value => value.id == e.target.id)[e.target.name] = e.target.value
            console.log(newArray)
            setTableBody({data: newArray, loading: false})
    }

    const handleRemoveSpecificRow = (e) => {
        let elementsIndex = tableBody.data.findIndex(value => value.id == e.target.id )
        const smallerTable = [...tableBody.data];
        smallerTable.splice(elementsIndex, 1);
        setTableBody({data: smallerTable, loading: false});
    };

    const handleSubmit = (e) => {

        const timeSaverTaskRequest = {}
        timeSaverTaskRequest.tasks = []
        timeSaverTaskRequest.report = {
            "name": reportName,
            "description": "",
            "notes": "",
            "created_by": 2
        }
        timeSaverTaskRequest.calculator = {
            "name": reportName,
            "description": "",
            "notes": ""
        }

        tableBody.data.map((task, task_idx) => {
            timeSaverTaskRequest.tasks[task_idx] = {}
            timeSaverTaskRequest.tasks[task_idx].cadence = parseInt(task.cadence)
            timeSaverTaskRequest.tasks[task_idx].time_saver_worker_id = parseInt(task.time_saver_worker_id)
            timeSaverTaskRequest.tasks[task_idx].time_saver_product_id = parseInt(task.time_saver_product_id)
            timeSaverTaskRequest.tasks[task_idx].current_time_spent = parseInt(task.current_time_spent)
            timeSaverTaskRequest.tasks[task_idx].current_time_spent_period = parseInt(task.current_time_spent_period)
            timeSaverTaskRequest.tasks[task_idx].name = task.name 
            timeSaverTaskRequest.tasks[task_idx].description = ""
        })

        const requestOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(timeSaverTaskRequest)
        };
            
        Promise.all([
            fetch(`${config.url.API_URL}2/1/calculator/${params.timesaverId}/edit`, requestOptions)
        ])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => {
                setNewCalculator({ redirect: true, newCalculatorId: data.new_tasks[0].calculator_id })
            });
    }
        
        return(
            newCalculator.redirect ? <Redirect to={{pathname: `/for-business/timesaver/${newCalculator.newCalculatorId}/graph` }}/> :
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
                                {tableBody.inputsLoading? <Spinner animation="border" variant="primary" />:
                                <FormControl
                                type="text"
                                name="name"
                                value={reportName}
                                onChange={handleNameChange}
                                />
                                }
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    {completeLoading? <Spinner animation="border" variant="primary" />:
                    <Col>
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
                                        headers={newTimeSaverHeaders} 
                                        text="center"
                                    />
                                    <EditableTable 
                                    table={tableBody.data}  
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

export default EditTimeSaverCalculator