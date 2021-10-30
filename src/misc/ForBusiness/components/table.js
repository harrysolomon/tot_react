import React from 'react'
import TableHeader from './table_header'

const Table = (props) => {
    
    const tableBody = props.tableBody
    const headers = props.headers
    const expectedColumns = props.expectedColumns
    const baseUrl = props.baseUrl
    const addUrlParams = props.addUrlParams
    const hyperlinkedCol = props.hyperlinkedCol
   
    
    return(
        <div className="table-responsive">
            <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                <TableHeader
                    headers = {headers}
                />
                <tbody>
                {tableBody.map((row, rowIndex) =>
                    <tr key={rowIndex}>
                        {expectedColumns.map((col) =>
                            <td key={col}>
                                {col === hyperlinkedCol? 
                                <a className="media align-items-center" href={`/${baseUrl}/${row.id}${addUrlParams}`}>
                                    <span className="d-block h5 text-hover-primary mb-0">{row[col]} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span> 
                                </a>
                                :
                                <span className="d-block h5 mb-0">{row[col]} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                                }
                            </td>  
                        )} 
                            
                    </tr>
                )}    
                </tbody>
            </table>
        </div>
    )
}

export default Table