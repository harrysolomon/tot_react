import React, { Component } from "react";
import { Link } from 'react-router-dom';
import CloseForm from "../form_inputs/close_form";
import NavForm from "../form_inputs/nav_form";
import PageHeader from "../page_header";
import SuccessModal from "../success_modal";
import ModalInputs from "./modal_inputs";

//weekend project. Converting the modal to a full page form so that we can navigate between 3 pages.
//front page, form, and learn more output

class FinalModal extends Component {
    constructor() {
      super();
      this.state = {
        formModal: true,
        successModal: false,
        percentLoan: "",
        percentScholarship: "",
      };
      this.handleChange = this.handleChange.bind(this);


    };

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        });
      }

    onSubmitTask = (e) => {
        e.preventDefault();
        this.setState({
            formModal: false,
            successModal: true,
        });
    };

    goBackTask = (e) => {
        e.preventDefault();
        this.setState({
            formModal: true,
            successModal: false,
        });
    };

    render() {
        const { pct_loan, pct_scholarship } = this.state;
        console.log(this.state);
        console.log(this.state.pct_loan);


        if(this.state.formModal) {
            return (
                <div class="content container-fluid">
                    <PageHeader />
                    <div class="row gx-2 gx-lg-3">
                        <div className="col-4 mb-3 mb-lg-5">
                        </div>
                        <div className="col-4 mb-3 mb-lg-5">
                            <div class="card">

                                <div class="card-header">
                                    Bachelors Degree</div>
                                    <div class="card-body">
                                        
                                        <ModalInputs 
                                            label="Percent Loan"
                                            name="percentLoan"
                                            submitVal={this.state.percentLoan}
                                            changedVal={this.handleChange}/>
                                        <ModalInputs 
                                            label="Percent Scholarship"
                                            name="percentScholarship"
                                            submitVal={this.state.percentScholarship}
                                            changedVal={this.handleChange}/>
                                    </div>
                                    <div class="card-footer">
                                        <Link to="/">
                                            <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                                        </Link>
                                        <NavForm onClick={this.onSubmitTask} title="Submit"/>
                                    </div>
                                    
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div class="content container-fluid">
                    <PageHeader />
                    <div class="row gx-2 gx-lg-3">
                        <div className="col-4 mb-3 mb-lg-5">
                        </div>
                        <div className="col-4 mb-3 mb-lg-5">
                            <div class="card">
                                <div class="card-header">Bachelors Degree</div>
                                <div class="card-body">
                                    <SuccessModal/>
                                </div>
                                <div class="card-footer">
                                    <Link to="/">
                                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                                    </Link>
                                    <NavForm onClick={this.goBackTask} title="Go Back" />
                                    <Link to="/success">
                                        <button type="button" class="btn btn-primary" data-dismiss="modal">Learn More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default FinalModal;