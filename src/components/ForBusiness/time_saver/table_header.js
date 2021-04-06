import React from 'react'
import { ColInfo } from '../../hooks/columnInfo'

function TableHeader(props) {
    const headers = props.headers
    return(
            
            <thead>
                <tr>
                    {headers.map((header) => {
                        return(
                        <th className="text-center align-middle" key={header.name}> {header.name}
                            {header.tooltip && <ColInfo name={header.name} definition={header.definition}/>}
                        </th>)
                    })}
                </tr>
            </thead>
    )
};

export default TableHeader
