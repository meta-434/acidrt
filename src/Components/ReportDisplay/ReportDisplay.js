import React, { Component } from 'react';
import AcidrtContext from "../../AcidrtContext";

export default class ReportDisplay extends Component {

    static contextType = AcidrtContext

    state = {
        uniqueReport: undefined,
    }

    componentDidMount() {

        // console.log(parseInt(this.props.match.params.reportId, 10));
        this.setState({uniqueReport: this.context.reports[parseInt(this.props.match.params.reportId, 10)]})
    }

    render(){
        console.log(this.state.uniqueReport);
        if (!!this.state.uniqueReport) {
            const {first, last, email, phone, lat, lng, type, details, other, time, date, waterBody} = this.state.uniqueReport;
            console.log(type.forEach(el => console.log(el)));
            return (
                <div>
                    <section>
                        <h2>Report Details</h2>
                    </section>
                    <section>
                        <p>Report for incident at lat: {lat} lng: {lng}</p>
                        <div id={'incident-map'}>Incident Type(s): <ul>{type.map((el, idx) => <li key={idx}>{el}</li>)}</ul></div>
                        <p>{(waterBody) ? ('Body of water affected: ' + waterBody) : ('')}</p>
                        <p>Report Submitted By: {first + " " + last}</p>
                        <p>Submitter Contact info: {email}, {phone}</p>
                        <p>Report submitted on {date} at {time}</p>
                    </section>

                </div>
            );
        } else {
            return (
                <p>loading...</p>
            )
        }
    }
}