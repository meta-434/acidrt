import React, { Component } from 'react';
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import AcidrtContext from "../../AcidrtContext";
import Form from "../Form/Form";

export default class ReportDisplay extends Component {

    static contextType = AcidrtContext

    state = {
        uniqueReport: undefined,
        error: undefined,
        editMode: false,
    }

    componentDidMount() {
        this.findUniqueReport();
    }

    findUniqueReport = () => {
        const srcId = parseInt(this.props.match.params.reportId, 10);
        const srcResult = this.context.reports.filter(report => report.id === srcId)
        if (srcResult.length === 1) this.setState({uniqueReport: srcResult[0]})
    }

    handleDelete = (reportId) => {
        this.context.handleDeleteReport(reportId);
        this.props.history.push('/all-reports');
    }

    toggleEdit = () => {
        const isEditMode = this.state.editMode;
        this.setState({editMode: !isEditMode});
    }

    render(){
        const rep = this.state.uniqueReport;
        if (!!this.state.uniqueReport) {
            if (!this.state.editMode) {
                return (
                    <div>
                        {!!this.context.error ? <ErrorDisplay /> : ""}
                        <section>
                            <h2>Report Details</h2>
                        </section>
                        <section>
                            <p>id: {rep.id}</p>
                            <p>Report for incident at lat: {rep.report_lat} lng: {rep.report_lng}</p>
                            <div id={'incident-map'}>
                                Incident Type(s):
                                {
                                    (rep.report_type.length > 1) ? (<p>{rep.report_type}</p>) : (<ul>{rep.report_type.map((el, idx) => <li key={idx}>{el}</li>)}</ul>)
                                }

                            </div>
                            <p>if other, describe type: {rep.report_other || 'no -other- details'}</p>
                            <p>{(rep.report_waterbody) ? ('Body of water affected: ' + rep.report_waterbody) : ('')}</p>
                            <p>Report Submitted By: {rep.report_first + " " + rep.report_last}</p>
                            <p>Submitter Contact info: {rep.report_email}, {rep.report_phone}</p>
                            <p>incident occurred on {rep.report_date} at {rep.report_time}</p>
                            <p>extra details, if any: {rep.report_details}</p>
                            <button onClick={() => this.handleDelete(rep.id)}>Resolve (delete)</button>
                            <button onClick={this.toggleEdit}>Edit</button>
                        </section>
                    </div>
                );
            } else {
                return (
                    <div>
                        <p>edit mode!!</p>
                        <Form defaultVals={this.state.uniqueReport} editMode={this.state.editMode} toggleEdit={() => this.toggleEdit()}/>
                    </div>

                );
            }

        } else {
            return (
                <p>loading...</p>
            )
        }
    }
}