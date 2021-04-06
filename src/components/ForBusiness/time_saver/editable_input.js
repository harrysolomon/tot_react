import React from 'react'
import { useForm } from '../../hooks/useForm'
import { InputGroup, FormControl } from 'react-bootstrap'

function EditableTableCell(props) {
    const cell = props.cell
    const name = props.name
    const [values, handleChange] = useForm(cell)
    //console.log("the values are", values[0].name)
    return(    
        <InputGroup>
            <FormControl
            type="text"
            name={name}
            value={values.cell}
            onChange={handleChange}
            />
        </InputGroup>
    )
};

export default EditableTableCell