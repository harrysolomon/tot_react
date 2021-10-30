import { useState, useEffect } from "react"

export const useGatherCalculatorInputs = (name, inputs, cadences, products, employees, loading) => {
    const [values, setValues] = useState({ submittedValues: null })
    useEffect(() => {
        const schema = {}
        schema.name = name
        schema.inputs = []
        inputs.map((item, idx) => {
            schema.inputs[idx] = {}
            
            //needed because mongo id is a string and new timesaver row id is a number
            if(typeof item.id === "string") {
                schema["id"] = item.id
            }
            schema.inputs[idx].current_time_spent = item.current_time_spent
            schema.inputs[idx].name = item.name


            if(!loading){
                schema.inputs[idx].products = products.find(product => product.id == item.products)
                schema.inputs[idx].employees = employees.find(employee => employee.id == item.employees)
                schema.inputs[idx].current_time_spent_period = cadences.find(cadence => cadence.id == item.current_time_spent_period)
                schema.inputs[idx].cadences = cadences.find(cadence => cadence.id == item.cadences)
            }

        })
        setValues({submittedValues: schema})
    },[name,inputs])

    return values


};