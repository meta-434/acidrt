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
        reports: [],
        authToken: undefined,
        error: undefined,
        username: undefined,
        password: undefined,
    }

    componentDidMount() {
        this.handleGetErrors();
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
        const currentReports = this.state.reports;
        currentReports.push(newReport);
        this.setState({reports: currentReports});
    }

    handleGetReports = () => {
        return this.state.reports;
    }

    handleDeleteReport = (reportId) => {
        const {reports} = this.state;
        const filteredReports = reports.filter(report => report.report_id !== reportId);
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
    }
    return(
        <AcidrtContext.Provider value={(context)}>
            <div className="app">
                <Route path="/" render={routeProps => <Nav {...routeProps} />}/>
                <main className="app-content">
                    <Route exact path="/" component={Main} />
                    <Route path="/login" component={Login} />
                    <Route path="/form" component={Form} />
                    <Route path="/all-reports" component={ReportList} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/report-display/:reportId?" component={ReportDisplay} />

                </main>
            </div>
        </AcidrtContext.Provider>
    );
  }
}

export default App;
