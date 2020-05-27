import React, { Component } from 'react';
import AcidrtContext from "../../AcidrtContext";
import {Link} from "react-router-dom";

export default class ReportList extends Component {

    static contextType = AcidrtContext

    componentDidMount() {
        console.log(this.context.reports);
    }

    render(){
        const { reports } = this.context;
        return(
            <>
                <section>
                    <header>
                        <h3>All Reports</h3>
                    </header>
                </section>
                <section>
                    {reports.map((report, idx) => {
                        return (
                            <div className='reportList-item' key={idx}>
                                <p id={idx}>{'report for incident at ' + report.time + ' on ' + report.date + ' by ' + report.first + " " + report.last}</p>
                                <p><Link to={`/all-reports/${idx}`}>view this report's details</Link></p>
                            </div>
                        )
                    })}
                </section>
            </>
        );
    }
}