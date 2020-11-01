import React, { Component } from "react";

class Topline extends Component{
    constructor(props) {
        super(props)
    }


    render() {
        return(
                <div class="col-sm-6 col-lg-3 mb-3 mb-lg-5">
                    <a class="card card-hover-shadow h-100">
                        <div class="card-body">
                            <h6 class="card-subtitle">Total Earnings</h6>
                                <div class="row align-items-center gx-2 mb-1">
                                    <span class="card-title h2 text-success">$500,000</span>
                                </div>

                        </div>
                    </a>
                </div>
        );
    }

}

export default Topline;

    