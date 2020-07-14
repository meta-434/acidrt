import React, { Component } from 'react';
import AcidrtContext from "../../AcidrtContext";

export default class ReportDisplay extends Component {

    static contextType = AcidrtContext

    state = {
        uniqueReport: undefined,
    }

    componentDidMount() {
        this.context.handleGetUniqueReport([parseInt(this.props.match.params.reportId, 10)])
    }

    handleDelete = (reportId) => {
        this.context.handleDeleteReport(reportId);
        this.props.history.push('/all-reports');
    }

    render(){
        console.log('unique report: ', this.state.uniqueReport);
        if (!!this.state.uniqueReport) {
            const {report_first, last, email, phone, lat, lng, report_type, details, other, time, date, waterBody, id} = this.state.uniqueReport;
            console.log(report_type.forEach(el => console.log(el)));
            return (
                <div>
                    <section>
                        <h2>Report Details</h2>
                    </section>
                    <section>
                        <p>id: {id}</p>
                        <p>Report for incident at lat: {lat} lng: {lng}</p>
                        <div id={'incident-map'}>Incident Type(s): <ul>{report_type.map((el, idx) => <li key={idx}>{el}</li>)}</ul></div>
                        <p>if other, describe type: {other || 'no -other- details'}</p>
                        <p>{(waterBody) ? ('Body of water affected: ' + waterBody) : ('')}</p>
                        <p>Report Submitted By: {report_first + " " + last}</p>
                        <p>Submitter Contact info: {email}, {phone}</p>
                        <p>incident occurred on {date} at {time}</p>
                        <p>extra details: {details}</p>
                        <button onClick={() => this.handleDelete(id)}>Resolve</button>
                        <button>Edit</button>
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