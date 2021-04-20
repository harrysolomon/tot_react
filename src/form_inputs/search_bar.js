import React, { Component } from "react";
import SearchResults from "./search_results"

class SearchBar extends Component{
    constructor() {
        super()
    }


    render() {
        
        const tio = {
            display: "none;"
        }
        return(
            <div class="position-relative">
                <div class="form-group">
                    <div class="input-group input-group-merge">
                        <input type="text" class="js-form-search form-control" placeholder="Search..." data-hs-form-search-options='{"clearIcon": "#clearIconMenuEg","defaultIcon": "#defaultIconMenuEg","dropMenuElement": "#dropMenuEg","dropMenuOffset": 20}'>
                        </input>
                        <a class="input-group-append" href="javascript:;">
                            <span class="input-group-text">
                                <i id="clearIconMenuEg" class="tio-clear tio-lg" style={tio}></i>
                                <i id="defaultIconMenuEg" class="tio-search" style={tio}></i>
                            </span>
                        </a>
                    </div>
                </div>
                <SearchResults />
            </div>
        );
    }

}

export default SearchBar;
