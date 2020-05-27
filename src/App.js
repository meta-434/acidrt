import React, {Component} from 'react';
import './App.css';
import Nav from './Components/Nav/Nav.js';
import Login from './Components/Login/Login.js';
import Main from './Components/Main/Main.js';
import Form from './Components/Form/Form.js';
import Dashboard from "./Components/Dashboard/Dashboard";
import ReportList from './Components/ReportList/ReportList.js';
import ReportDisplay from './Components/ReportDisplay/ReportDisplay.js';
import AcidrtContext from "./AcidrtContext";
import {Route} from "react-router-dom";

class App extends Component {

    state = {
        reports: [
            {
                id: 0,
                first: 'john',
                last: 'doe',
                email: 'email@email.com',
                lat: 99.0021,
                lng: 12.2341,
                error: undefined,
                date: '2020-02-02',
                time: '12:01',
                phone: '123-123-1234',
                type: ["Suspicious discharge from the pipe into stream"],
                waterBody: 'James River'
            },
            {
                id: 1,
                date: "2020-01-01",
                details: "take 4 lefts.",
                email: "acyrush@gmail.com",
                error: undefined,
                first: "Alexandre",
                last: "Hapgood",
                lat: 38.09802480089654,
                lng: -78.4887256216315,
                other: "lorem ipsum other details",
                phone: "434-249-7488",
                time: "12:34",
                type: ["Suspicious discharge from pipe into stream", "Suspicious suds or other substance floating on water"],
                waterBody: "oh so much water in the lake",
            }
        ],
        authToken: undefined,
        error: undefined,
        username: undefined,
        password: undefined,
    }

    componentDidMount() {
        this.handleGetErrors();
        this.handleGetReports();
    }

    handleGetErrors() {
        this.setState({error: this.context.error})
    }

    handleLogOut = () => {
        this.setState({authToken: undefined});
        sessionStorage.clear();
    }



    // crud methods here
    handlePostAuthenticate = ({ username, password }) => {
        this.setState({ authToken: username })
        sessionStorage.setItem('access-token', 'abc');
        sessionStorage.setItem('username', username);
        this.handleGetReports();
    };

    handlePostReport = (newReport) => {
        console.log({id: 3, ...newReport});

        const currentReports = this.state.reports;
        currentReports.push(newReport);
        this.setState({reports: currentReports});
    }

    handleGetReports = (id) => {
        if (id) {
            return this.state.reports[id];
        }
        return this.state.reports;
    }

    handleDeleteReport = (reportId) => {
        const {reports} = this.state;
        const filteredReports = reports.filter(report => report.id !== reportId);
        console.log('filteredReports', filteredReports);
        this.setState({reports: filteredReports});
    }

    handleEditReport = (reportId, updatedReport) => {
        const { reports } = this.state;
        const filteredReports = reports.filter(report => report.report_id !== reportId);
        filteredReports.push(updatedReport);
        this.setState({reports: filteredReports});
    }

  render() {
    const { reports, authToken, username, error } = this.state;
    const context = {
        reports,
        username,
        authToken,
        error,
        handlePostAuthenticate: this.handlePostAuthenticate,
        handlePostReport: this.handlePostReport,
        handleGetReports: this.handleGetReports,
        handleDeleteReport: this.handleDeleteReport,
        handleEditReport: this.handleEditReport,
        handleLogOut: this.handleLogOut,
        handleGetErrors: this.handleGetErrors,
        handleLatLng: this.handleLatLng,
    }
    return(
        <AcidrtContext.Provider value={(context)}>
            <div className="app">
                <Route path="/" render={routeProps => <Nav {...routeProps} />}/>
                <main className="app-content">
                    <Route exact path="/" render={props => <Main {...props} />}/>
                    <Route path="/login" render={props => <Login {...props} />} />
                    <Route path="/form" render={props => <Form {...props} />} />
                    <Route exact path="/all-reports" render={props => <ReportList {...props} />} />
                    <Route path="/dashboard" render={props => <Dashboard {...props} />} />
                    <Route path="/all-reports/:reportId" render={props => <ReportDisplay {...props} />} />
                </main>
            </div>
        </AcidrtContext.Provider>
    );
  }
}

export default App;
