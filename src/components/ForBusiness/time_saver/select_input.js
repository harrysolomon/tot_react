import React from 'react'
import { useSelect } from '../../hooks/useForm'
import { InputGroup, FormControl } from 'react-bootstrap'

function SelectInput(props) {
    const table = props.table
    const cell = props.cell
    const name = props.name
    const [values, handleChange] = useSelect(cell)

    return(    
        <InputGroup>
            <FormControl
            as="select"
            name={name}
            value={values[name]}
            onChange={handleChange}>
                <React.Fragment>
                    {values[name] === '' ?
                    <option>Choose...</option> : 
                    <option>{table.find(row => values[name] === row._id).name}</option>}
                    {table.map((row) => {
                        if(row._id !== values[name])
                        return(
                    <option key={row._id} value={row._id}>{row.name}</option>)})}
                </React.Fragment>
            </FormControl>
        </InputGroup>
    )
};

export default SelectInput