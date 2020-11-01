//there will be an input field and a submit button
//contents in the input field should register in an html list after being submitted

import React from "react";
import FinalModal from "./modal/modal_handler"
import data from "./data.json"
import Pageheader from "./page_header"

const Overview = (props) => {
  const tiles = data

  return (
    <div class="content container-fluid">
            <Pageheader />
        <div class="row gx-2 gx-lg-3">
            {tiles.map(item => (
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
                            <a href="/success" /*data-toggle="modal" data-target="#exampleModal"*/ className="stretched-link"></a>
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    </div>
  );
};

export default Overview;
