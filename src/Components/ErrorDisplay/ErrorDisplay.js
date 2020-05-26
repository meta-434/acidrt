import React, { Component } from 'react';
import AcidrtContext from "../../AcidrtContext";
import './ErrorDisplay.css';

export default class errorDisplay extends Component {
    static contextType = AcidrtContext;

    render() {
        const {error} = this.context;
        return (
            <p className={"error"}>{(error) ? (error.error) : ('')}</p>
        );
    }
}