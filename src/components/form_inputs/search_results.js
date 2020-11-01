import React, { Component } from "react";

class SearchResults extends Component{
    constructor() {
        super()
    }


    render() {

        return(
            <div id="dropMenuEg" class="hs-form-search-menu-content card dropdown-menu dropdown-card overflow-hidden">          
                <div class="card-body-height py-3">
                    <a class="dropdown-item my-2" href="../index.html">
                        <div class="media align-items-center">
                            <div class="media-body text-truncate">
                                <span>Amanda Harvey </span>
                            </div>
                        </div>
                    </a>
                        
                    <a class="dropdown-item my-2" href="../index.html">
                        <div class="media align-items-center">
                            <div class="media-body text-truncate">
                                <span>David Harrison</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }

}

export default SearchResults;