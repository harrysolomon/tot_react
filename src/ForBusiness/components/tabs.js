import React from 'react'
import { Nav } from 'react-bootstrap'

export const Tabs = (props) => {

    const tabs = props.tabs
    const activeKey = props.activeKey
    const reportId = props.reportId
    const baseUrl = props.baseUrl
    return (
        <div className="tab-content" id="navTabContent4">
            <div className="tab-pane fade p-4 show active" id="nav-result4" role="tabpanel" aria-labelledby="nav-resultTab4">
                <Nav variant="tabs" activeKey={activeKey}>
                    {tabs.map((tab) => 
                        <Nav.Item>
                            <Nav.Link href={`/${baseUrl}/${reportId}/${tab.eventKey}`} eventKey={tab.eventKey}>{tab.name}</Nav.Link>
                        </Nav.Item>
                    )}
                </Nav>
            </div>
        </div>
    )

}

export default Tabs