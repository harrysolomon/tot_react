import { useState } from "react"

export const useUpdateSingleInput = initialValues => {
    const [values, setValues] = useState(initialValues);
    return [
        values,
        e => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
        }
    ];
};

/*export function useUpdateArrayText(initialValues) {
    return [
        initialValues,
        e => {
        let elementsIndex = initialValues.findIndex(value => value._id == e.target.id )
            //console.log("the targets are", e.target, "the values are", values, "the element index is", elementsIndex)
            let newArray = [...initialValues]
            newArray[elementsIndex][e.target.name] = e.target.value
        newArray
            //console.log(e.target)       
    }
]
}*/