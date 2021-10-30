import React, { Component } from "react";
import { Card, Row, Col, Nav, Button } from "react-bootstrap";
import '../../ForBusiness/time_saver/node_modules/react-bootstrap-typeahead/css/Typeahead.css';

class ListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };

    render() {
            return ( <
                    table className = "table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle" >
                    <
                    thead className = "thead-light" >
                    <
                    tr > {
                        this.props.columns.map((cols, col_idx) => ( <
                            th key = { col_idx } > { cols } < /th>
                        ))
                    } <
                    /tr> <
                    /thead> <
                    tbody > {
                        this.props.rows.map((item) => ( <
                                tr id = "addr0"
                                key = { item._id } >
                                <
                                td >
                                <
                                a className = "media align-items-center"
                                href = { this.props.hrefHead + item._id } >
                                <
                                div className = "media-body" >
                                <
                                span className = "d-block h5 text-hover-primary mb-0" > { item.name } < i className = "tio-verified text-primary"
                                data - toggle = "tooltip"
                                data - placement = "top"
                                title = "Top endorsed" > < /i></span >
                                <
                                span className = "d-block font-size-sm text-body" > Harrison Solomon < /span> <
                                /div> <
                                /a> <
                                /td> <
                                td >
                                <
                                span className = "d-block h5 mb-0" > Test Client < i className = "tio-verified text-primary"
                                data - toggle = "tooltip"
                                data - placement = "top"
                                title = "Top endorsed" > < /i></span >
                                <
                                /td> <
                                td >
                                <
                                span className = "d-block h5 mb-0" > { item.createdAt } < i className = "tio-verified text-primary"
                                data - toggle = "tooltip"
                                data - placement = "top"
                                title = "Top endorsed" > < /i></span >
                                <
                                /td> <
                                td >
                                <
                                span className = "d-block h5 mb-0" > { item.values[0].value }
                                / {item.values[0].period} <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i > < /span> <
                                /td> <
                                /tr>))}

                                <
                                /tbody> <
                                /table>
                            )
                        }
                    }

                    export default ListTable;