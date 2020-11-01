import React, { Component } from "react";

class PageHeader extends Component {
  constructor() {
    super();
  }

  render() {
      return(
        <div class="page-header">
            <div class ="row align-items-center">
                <div class="col-sm mb-2 mb-sm-0">
                    <h1 class="page-header-title">This or That?</h1>
                </div>
            </div>
        </div>
      );
    }
}

export default PageHeader;

