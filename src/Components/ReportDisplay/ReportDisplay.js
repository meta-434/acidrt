import React, { Component } from 'react';
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import AcidrtContext from "../../AcidrtContext";
import Form from "../Form/Form";
import './ReportDisplay.css'

export default class ReportDisplay extends Component {

    static contextType = AcidrtContext

    state = {
        uniqueReport: undefined,
        error: undefined,
        editMode: false,
        oldReports: undefined,
    }

    componentDidMount() {
        this.findUniqueReport();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.context.reports !== this.state.oldReports) {
            this.findUniqueReport()
        }
    }

    findUniqueReport = () => {
        const srcId = parseInt(this.props.match.params.reportId, 10);
        const srcResult = this.context.reports.filter(report => report.id === srcId)
        if (srcResult.length === 1) this.setState({uniqueReport: srcResult[0], oldReports: this.context.reports})
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
                            <div className={'report-basics'}>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Basic Info</th>
                                        <th>Value</th>
                                    </tr>
                                    </thead>
                                    <tr>
                                        <td>Report ID</td>
                                        <td>{rep.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Submitter</td>
                                        <td>{rep.report_last + ", " + rep.report_first}</td>
                                    </tr>
                                    <tr>
                                        <td>Incident date</td>
                                        <td>{rep.report_date}</td>
                                    </tr>
                                    <tr>
                                        <td>Incident time</td>
                                        <td>{rep.report_time}</td>
                                    </tr>
                                    <tr>
                                        <td>Submitter email</td>
                                        <td>{rep.report_email}</td>
                                    </tr>
                                    <tr>
                                        <td>Submitter phone</td>
                                        <td>{rep.report_phone}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className={'report-details'}>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Incident Info</th>
                                        <th>Details</th>
                                    </tr>
                                    </thead>
                                    <tr>
                                        <td>Latitude</td><td>{parseInt(rep.report_lat)}</td>
                                    </tr>
                                    <tr>
                                        <td>Longitude</td><td>{parseInt(rep.report_lng, 10)}</td>
                                    </tr>
                                    <tr>
                                        <td>Incident Type(s):</td>
                                        {
                                            (rep.report_type.length > 1)
                                                ? (
                                                    <td>
                                                        {rep.report_type}
                                                    </td>)
                                                : (
                                                    <td>
                                                        <ul>
                                                            {rep.report_type.map((el, idx) => <li key={idx}>{el}</li>)}
                                                        </ul>
                                                    </td>)
                                        }
                                    </tr>
                                    <tr>
                                        <td>if other, describe type</td>
                                        <td> {(rep.report_other !== 'undefined') ? (rep.report_other) : ('no -other- details given')}</td>
                                    </tr>
                                    <tr>
                                        <td>{`Body of water affected: `}</td>
                                        {(rep.report_waterbody) ? (<td>{rep.report_waterbody}</td>) : (<td>{`no body of water given`}</td>)}
                                    </tr>
                                    <tr>
                                        <td>extra details, if any</td>
                                        {(rep.report_details !== "undefined") ? (<td>{rep.report_details}</td>) : (<td>{'no extra details given'}</td>)}
                                    </tr>
                                </table>
                            </div>

                            <button onClick={() => this.handleDelete(rep.id)}>Resolve (delete)</button>
                            <button onClick={this.toggleEdit}>Edit</button>
                        </section>
                    </div>
                );
            } else {
                return (
                    <div>
                        <p><em>edit mode</em></p>
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