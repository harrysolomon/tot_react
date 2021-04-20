import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'

function Select(props) {
    const _id = props._id
    const name = props.name
    const options = props.options
    const onChange = props.onChange
    const selectedValue = props.selectedValue
    const optionName = props.optionName


    return(
        <InputGroup>
            <FormControl
            as="select"
            name={name}
            id={_id}
            onChange={onChange}>
                <React.Fragment>
                {selectedValue === '' ?
                <option>Choose...</option> : 
                <option>{options.find(option => option._id === selectedValue)[optionName]}</option>}
                    {options.map((option) => {
                        if(option._id !== selectedValue)
                        return(
                    <option key={option._id} value={option._id}>{option[optionName]}</option>)})}
                </React.Fragment>
            </FormControl>
        </InputGroup>
    )
}

export default Select