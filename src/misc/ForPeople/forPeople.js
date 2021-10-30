
//there will be an input field and a submit button
//contents in the input field should register in an html list after being submitted

import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { config } from 'constants/constants'

class ForPeople extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //error: null,
            //isLoaded: false,
            tiles: []
        };
    }

componentDidMount() {
    axios.get(config.url.API_URL + 'forpeople')
      .then(res => {
        const tiles = res.data;
        this.setState({ tiles });
      })
  }

render() {
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
                <Col md={4}>
                    <div className="card card-hover-shadow">
                        <div className="card-body card-body-height">
                            <div className="card-body-centered">
                                <img className="avatar avatar-xxl mb-3" src={item.scenario_icon} alt="Image Description">
                                </img>
                            </div>
                            <h3 className="card-title">{item.scenario_type}</h3>
                            <p className="card-text">{item.scenario_description}</p>
                            <p className="card-text">
                                <small className="text-muted">Icons made by
                                    <a href={item.scenario_icon_owner_link} title={item.scenario_icon_owner}>{item.scenario_icon_owner}</a> from 
                                    <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
                                </small>
                            </p>
                            <a href="/for-people/bachelors-degree" className="stretched-link"></a>
                        </div>
                    </div>
                </Col>
            ))}
            
        </Row>
    </Container>
  );
};

}

export default ForPeople;
