import React, { Component } from 'react';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";
import AcidrtContext from "../../AcidrtContext";
import './Dashboard.css'

export default class Dashboard extends Component {

    static contextType = AcidrtContext;

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        const reports = this.context.handleGetReports();
        this.setState({reports}, () => this.formatDate(reports))
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

        console.log('months? : ', dateData);
        this.setState({dateData})
    }

    render(){
        //const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page b', uv: 600, pv: 2400, amt: 2400}, {name: 'Page c', uv: 300, pv: 2400, amt: 2400}];
        const dateData = this.state.dateData;
        return(
            <div className={'chart1'}>
                <div className={'chart1-wrapper'}>
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

        );
    }
}