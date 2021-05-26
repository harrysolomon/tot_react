import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'

function Select(props) {
    const id = props.id
    const name = props.name
    const options = props.options
    const onChange = props.onChange
    const selectedValue = props.selectedValue
    const optionName = props.optionName
    console.log("the options are ", options, "the name is ", name)
    return(
        <InputGroup>
            <FormControl
            as="select"
            name={name}
            id={id}
            onChange={onChange}>
                <React.Fragment>
                {selectedValue === "" ?
                <option>Choose...</option> : 
                <option>{options.find(option => option.id === parseInt(selectedValue))[optionName]}</option>}
                    {options.map((option) => {
                        if(option.id !== parseInt(selectedValue))
                        return(
                    <option key={option.id} value={option.id}>{option[optionName]}</option>)})}
                </React.Fragment>
            </FormControl>
        </InputGroup>
    )
}

export default Select