import React, { Component } from 'react';
import AcidrtContext from "../../AcidrtContext";
import {Link} from "react-router-dom";

export default class ReportList extends Component {

    static contextType = AcidrtContext

    componentDidMount() {
        this.context.handleGetReports();
    }


    render(){
        const { reports } = this.context;
        console.log('reports?', reports);
        return(
            <>
                <section>
                    <header>
                        <h3>All Reports</h3>
                    </header>
                </section>
                <section>
                    {
                        (!!reports && Array.isArray(reports))
                        ? (reports.map((report, idx) => {
                                return (
                                    <div className='reportList-item' key={idx + 1}>
                                        <p id={idx}>{'report for incident at ' + report.report_time + ' on ' + report.report_date + ' by ' + report.report_first + " " + report.report_last}</p>
                                        <p><Link to={`/all-reports/${report.id}`}>view this report's details</Link></p>
                                    </div>
                                )
                            }))
                        : (<p>loading reports...</p>)
                        }
                </section>
            </>
        );
    }
}