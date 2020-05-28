import React, { Component } from 'react';
import {BarChart, Bar,PieChart, Pie, Sector, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";
import ReportMap from "../ReportDisplay/ReportMap";
import AcidrtContext from "../../AcidrtContext";
import './Dashboard.css'
import ReportList from "../ReportList/ReportList";

export default class Dashboard extends Component {

    static contextType = AcidrtContext;

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        const reports = this.context.handleGetReports();
        this.setState({reports}, () => this.formatData(reports))
    }

    formatData = (reports) => {
        this.formatDate(reports);
        this.formatType(reports);
        this.formatLatLng(reports);
    }

    formatDate = (reports) => {
        const dateData = [];
        const monthsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        reports.forEach(report => {
            const mo = Number(report.date.slice(5, 7));
            const yr = Number(report.date.slice(0, 4));

            if (Number(report.date.slice(0, 4)) === 2020) {
                monthsCount[mo - 1] += 1;
            } else {
                console.log('bad yr', yr);
            }
        })

        monthsCount.forEach((month, idx) => {
            dateData.push(
                {
                    month: monthsName[idx],
                    count: month,
                }
            )
        })
        this.setState({dateData})
    }

    formatType = (reports) => {
        const typeData = [];
        const typesCount = [0,0,0,0,0,0,0];
        const typesName = [
            'Dumping down a storm drain',
            'Suspicious discharge from pipe into stream',
            'Water in stream is an unusual color',
            'Water in stream smells strange',
            'Suspicious suds or other substance floating on water',
            'Fish or other aquatic creatures appear to have died',
            'other'
        ];
        reports.forEach(report => {
            const reportTypes = report.type;
            reportTypes.forEach((type, idx) => {
                const typeNameIdx = typesName.indexOf(type);
                if (typeNameIdx !== -1) {
                    console.log('hit!')
                    typesCount[typeNameIdx] += 1;
                }
            })
        })
        console.log(typesCount);
        typesCount.forEach((type, idx) => {
            typeData.push(
                {
                    type: typesName[idx],
                    count: type,
                }
            )
        })
        console.log(typeData);
        this.setState({ typeData })
    }

    formatLatLng = (reports) => {
        const latLngData = [];
        console.log(reports);
        reports.forEach((report, idx) => {
            const info = `Report id ${report.id} by ${report.first + ' ' + report.last}`
            latLngData.push(
                {
                    info: info,
                    lat: report.lat,
                    lng: report.lng,
                }
            )
        })

        this.setState({latLngData});
    }

    render(){
        const dateData = this.state.dateData;
        const typeData = this.state.typeData;
        const latLngData = this.state.latLngData;

        return(
            <section className={'charts'}>
                <div className={'chart1'}>
                    <div className={'chart1-wrapper'}>
                        <h3>Incident Frequency</h3>
                        <ResponsiveContainer width="99%" aspect={3}>
                            <BarChart
                                data={dateData}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" interval={0}/>
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className={'chart2'}>
                    <h3>Incident Types</h3>
                    <div className={'chart2-wrapper'}>
                        <ResponsiveContainer width="99%" aspect={3}>
                            <PieChart
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}>
                                <Pie isAnimationActive={false} data={typeData} fill="#8884d8" nameKey={'type'} dataKey={'count'} label/>
                                <Tooltip/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className={'dashboard-report-list'} >
                    <ReportList />
                </div>
                <div className={'marker-map'}>
                    <h3>Incident Locations</h3>
                    <ReportMap markers={latLngData}/>
                </div>
            </section>
        );
    }
}