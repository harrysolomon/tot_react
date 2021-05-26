import React from 'react'
import { Col, InputGroup, FormControl, Form, Button } from 'react-bootstrap'
import Select from './select'

const EditableTable = (props) => {
    
    const table = props.table
    const section = props.section
    const onChange = props.onChange
    const removeRow = props.removeRow

    const inputType = (cell,row) => {
        if(cell.type === "select") {
            console.log("the selected value is ", row[cell.name], "the row is ", row, "the cell is ", cell)
            return (
                <Select 
                    name={cell.name}
                    id={row.id}
                    onChange={onChange}
                    selectedValue={row[cell.name]}
                    options={cell.select.options}
                    optionName={cell.select.optionName}
                />
            )
        } else if (cell.type === "text") {
            return(
                <InputGroup>
                    <FormControl
                        type="text"
                        name={cell.name}
                        id={row.id}
                        value={row[cell.name]}
                        onChange={onChange}
                    />
                </InputGroup>
            )
        } else {
            return (
                <div className="h-100 d-flex align-items-center">per</div>
            )
        }
    }
    
    return(
        <tbody>
            {table.map((row) =>
                <tr key={row.id}> 
                        {section.map((cells) =>
                            <td key={cells.name}>
                        
                            {cells.multiInput ? 
                                <Form>
                                    <Form.Row>
                                            {cells.inputs.map((cell) => 
                                                <Col md={cell.size} key={cell.name}>
                                                    {inputType(cell,row)}
                                                </Col>
                                            )}
                                    </Form.Row>
                                </Form> :
                                inputType(cells.inputs[0],row)
                            }
                            </td>
                            
                        )}
                        <td className="text-center" key="removebutton">
                            <Button
                                id={row.id}
                                variant="outline-danger"
                                size="sm"
                                onClick={removeRow}
                                >
                                Remove
                            </Button>
                        </td>
                </tr>
            )}
        </tbody>
    )
}
                            

export default EditableTable