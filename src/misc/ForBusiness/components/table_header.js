import React from 'react'
import { ColInfo } from './columnInfo'

function TableHeader(props) {
    const headers = props.headers
    const text = props.text
    
    return(   
            <thead>
                <tr>
                    {headers.map((header) => {
                        return(
                        <th className={`text-${text} align-middle`} key={header.name}> {header.name}
                            {header.tooltip && <ColInfo name={header.name} definition={header.definition}/>}
                        </th>)
                    })}
                </tr>
            </thead>
    )
};

export default TableHeader
