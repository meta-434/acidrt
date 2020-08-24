import React, { Component } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ReportMap from "../ReportDisplay/ReportMap";
import AcidrtContext from "../../AcidrtContext";
import "./Dashboard.css";
import ReportList from "../ReportList/ReportList";

export default class Dashboard extends Component {
  static contextType = AcidrtContext;

  state = {};

  componentDidMount = async () => {
    await this.context.handleGetReports();
    const reports = this.context.reports || [];

    // callback can be replaced with one setState with all formatted data.
    this.setState({ reports }, () => this.formatData(reports));
  };

  formatData = (reports) => {
    if (!!reports) {
      this.formatDate(reports);
      this.formatType(reports);
      this.formatLatLng(reports);
    } else {
      console.error("no valid reports @ formatDate");
    }
  };

  formatDate = (reports) => {
    const dateData = [];
    const monthsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const monthsName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (reports !== undefined && Array.isArray(reports)) {
      reports.forEach((report) => {
        const mo = Number(report.report_date.slice(5, 7));
        const yr = Number(report.report_date.slice(0, 4));

        if (Number(report.report_date.slice(0, 4)) === 2020) {
          monthsCount[mo - 1] += 1;
        }
      });

      monthsCount.forEach((month, idx) => {
        dateData.push({
          month: monthsName[idx],
          count: month,
        });
      });
      this.setState({ dateData });
    } else {
      console.error(`no valid reports`);
    }
  };

  formatType = (reports) => {
    const typeData = [];
    const typesCount = [0, 0, 0, 0, 0, 0, 0];
    const typesName = [
      "Dumping down a storm drain",
      "Suspicious discharge from pipe into stream",
      "Water in stream is an unusual color",
      "Water in stream smells strange",
      "Suspicious suds or other substance floating on water",
      "Fish or other aquatic creatures appear to have died",
      "other",
    ];
    if (reports !== undefined && Array.isArray(reports)) {
      reports.forEach((report) => {
        const reportTypes = report.report_type.split(",");
        reportTypes.forEach((type, idx) => {
          const typeNameIdx = typesName.indexOf(type);
          if (typeNameIdx !== -1) {
            typesCount[typeNameIdx] += 1;
          }
        });
      });
    } else {
      console.error("no valid reports");
    }
    if (!!typesCount) {
      typesCount.forEach((type, idx) => {
        typeData.push({
          type: typesName[idx],
          count: type,
        });
      });
    } else {
      console.error("no valid types");
    }

    this.setState({ typeData });
  };

  formatLatLng = (reports) => {
    const latLngData = [];
    if (reports !== undefined && Array.isArray(reports)) {
      reports.forEach((report, idx) => {
        const info = `Report id ${report.id} by ${
          report.report_first + " " + report.report_last
        }`;
        latLngData.push({
          info: info || "",
          lat: report.report_lat,
          lng: report.report_lng,
        });
      });
    } else {
      console.error("dashboard report loading error");
    }

    this.setState({ latLngData });
  };

  render() {
    const dateData = this.state.dateData;
    const typeData = this.state.typeData;
    const latLngData = this.state.latLngData;
    return (
      <section className={"charts"}>
        <div className={"chart1"}>
          <div className={"chart1-wrapper"}>
            <h3>Incident Frequency</h3>
            <ResponsiveContainer width="99%" aspect={2}>
              <BarChart
                data={dateData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  interval={1}
                  angle={45}
                  tick={{ stroke: "#112A46", strokeWidth: 0.5 }}
                />
                <YAxis tick={{ stroke: "#112A46", strokeWidth: 0.5 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#112A46" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={"chart2"}>
          <h3>Incident Types</h3>
          <div className={"chart2-wrapper"}>
            <ResponsiveContainer width="99%" aspect={2}>
              <PieChart
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5,
                }}
              >
                <Pie
                  isAnimationActive={false}
                  data={typeData}
                  fill="#112A46"
                  nameKey={"type"}
                  dataKey={"count"}
                  animationEasing={"ease-in-out"}
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={"dashboard-report-list"}>
          <ReportList />
        </div>
        <div className={"marker-map"}>
          <h3>Incident Locations</h3>
          <ReportMap markers={latLngData} />
        </div>
      </section>
    );
  }
}
