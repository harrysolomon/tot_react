import React from "react"
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap'
import { InfoCircle } from 'react-bootstrap-icons'

export const ColInfo = (props) => {


    return (
        <OverlayTrigger
            key="name"
            placement="top"
            overlay={
                <Tooltip id={props.name}>
                {props.definition}
                </Tooltip>
            }
            >
            <Button size="sm" variant="link"><InfoCircle/></Button>
        </OverlayTrigger>
    )
}