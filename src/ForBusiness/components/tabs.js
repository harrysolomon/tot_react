import React from 'react'
import { Nav } from 'react-bootstrap'

export const Tabs = (props) => {

    const tabs = props.tabs
    const activeKey = props.activeKey
    const baseUrl = props.baseUrl
    const id = props.id

    return (
        // <div className="tab-content" id="navTabContent4">
        //     <div className="tab-pane fade p-4 show active" id="nav-result4" role="tabpanel" aria-labelledby="nav-resultTab4">
                <Nav className="nav nav-tabs nav-tabs-light page-header-tabs" id="pageHeaderTab" variant="tabs" activeKey={activeKey} role="tablist">
                    {tabs.map((tab) => 
                        <Nav.Item key={tab.eventKey}>
                            <Nav.Link href={`/${baseUrl}/${id}/${tab.eventKey}`} eventKey={tab.eventKey}>{tab.name}</Nav.Link>
                        </Nav.Item>
                    )}
                </Nav>
        //     </div>
        // </div>
    )

}

export default Tabs