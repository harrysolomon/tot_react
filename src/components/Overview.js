
//there will be an input field and a submit button
//contents in the input field should register in an html list after being submitted

import React, { Component } from "react";
import axios from "axios";

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //error: null,
            //isLoaded: false,
            tiles: []
        };
    }

componentDidMount() {
    axios.get(`http://localhost:3000`)
      .then(res => {
        const tiles = res.data;
        this.setState({ tiles });
      })
  }

render() {
  return (
    <div class="content container-fluid">
        <div class="page-header">
            <div class ="row align-items-center">
                <div class="col-sm mb-2 mb-sm-0">
                    <h1 class="page-header-title">This or That?</h1>
                </div>
            </div>
        </div>
        <div class="row gx-2 gx-lg-3">
            {this.state.tiles.map(item => (
                <div className="col-4 mb-3 mb-lg-5">
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
                            <a href="/5fac52be03ff66099d9a8ef4" className="stretched-link"></a>
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    </div>
  );
};

}

export default Overview;
