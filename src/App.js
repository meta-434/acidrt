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
        fetch(process.env.REACT_APP_SERVER_URL + `/authenticate`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((result) => {
                return result.json();
            })
            .then((resJson) => {
                console.log('hello');
                this.setState({ error: resJson });
                if (!!resJson.token) {
                    this.setState({ authToken: resJson.token, username });
                    sessionStorage.setItem("access-token", this.state.authToken);
                    sessionStorage.setItem("username", username);
                    this.handleGetReports();
                } else {
                    throw new Error(
                        " error in authenticating. check username and password. "
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    handlePostReport = (newReport) => {
        console.log({id: 3, ...newReport});

        const currentReports = this.state.reports;
        currentReports.push(newReport);
        this.setState({reports: currentReports});
    }

    handleGetUniqueReport = (id) => {
        fetch(process.env.REACT_APP_SERVER_URL + `/api/reports/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "access-token": `${
                    this.state.authToken || sessionStorage[`access-token`]
                }`,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success && responseJson.success === false) {
                    throw new Error(`error in getting report ${id}`);
                } else {
                    return responseJson;
                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleGetReports = () => {
        fetch(process.env.REACT_APP_SERVER_URL + `/api/reports`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "access-token": `${
                    this.state.authToken || sessionStorage[`access-token`]
                }`,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success && responseJson.success === false) {
                    throw new Error("error in getting reports");
                } else {
                    this.setState({
                        reports: responseJson,
                    });
                }
            })
            .then(() => console.log('state @ post getReports()', this.state))
            .catch((error) => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleDeleteReport = (reportId) => {
        fetch(process.env.REACT_APP_SERVER_URL + `/api/reports/${reportId}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "access-token": `${
                    this.state.authToken || sessionStorage[`access-token`]
                }`,
            },
        })
            .then((res) => this.handleGetReports())
            .catch((error) => {
                console.error(error);
                this.setState({ error });
            });
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
