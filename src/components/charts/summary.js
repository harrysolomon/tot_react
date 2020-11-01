import React, { Component } from "react";

class Summary extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <section class="jumbotron text-center">
                <div class="container">
                    <p class="lead text-muted">According to BLS, great investment!</p>
                </div>
            </section>
        );
    }
}

export default Summary
