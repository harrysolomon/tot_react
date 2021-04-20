import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { config } from './constants'


const card_data = [
    {
      "scenario_type": "For People",
      "scenario_description": "ROI Calculation for Everyday Decisions",
      "href": "/for-people"
    },
    {
        "scenario_type": "For Businesses",
        "scenario_description": "ROI Calculations catered to services provided by Businesses",
        "href": "/for-business"
      }
  ]

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //error: null,
            //isLoaded: false,
            tiles: card_data
        };
    }

render() {
    console.log(config.url.API_URL)
    return (
    <Container fluid="true">
        <div className="page-header">
            <div className ="row align-items-center">
                <div className="col-sm mb-2 mb-sm-0">
                    <a href="/"><h1 className="page-header-title">ROY</h1></a>
                </div>
            </div>
        </div>
        <Row>
            {this.state.tiles.map(item => (
                <Col md={6}>
                    <div className="card card-hover-shadow">
                        <div className="card-body card-body-height">
                            <div className="card-body-centered">
                            </div>
                            <h3 className="card-title">{item.scenario_type}</h3>
                            <p className="card-text">{item.scenario_description}</p>
                            <a href={item.href} className="stretched-link"></a>
                        </div>
                    </div>
                </Col>
            ))}
            
        </Row>
    </Container>
  );
};

}

export default Homepage;