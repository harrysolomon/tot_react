import React, { Component } from "react";

class FormModal extends Component {
  constructor() {
    super();
  }


//card
    render() {

        return (
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Bachelors Degree</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormModal;