import React, { Component } from "react";
import "./App.css";
import Nav from "./Components/Nav/Nav.js";
import Login from "./Components/Login/Login.js";
import Main from "./Components/Main/Main.js";
import Form from "./Components/Form/Form.js";
import Dashboard from "./Components/Dashboard/Dashboard";
import ReportList from "./Components/ReportList/ReportList.js";
import ReportDisplay from "./Components/ReportDisplay/ReportDisplay.js";
import AcidrtContext from "./AcidrtContext";
import { Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";

class App extends Component {
  state = {
    reports: [],
    authToken: undefined,
    error: undefined,
    username: undefined,
    password: undefined,
  };

  componentDidMount() {
    this.handleGetErrors();
  }

  handleGetErrors() {
    this.setState({ error: this.context.error });
  }

  clearError = () => {
    this.setState({ error: undefined });
  };

  handleLogOut = () => {
    this.setState({ authToken: undefined });
    sessionStorage.clear();
  };

  handlePostAuthenticate = ({ username, password }) => {
    return fetch(process.env.REACT_APP_SERVER_URL + `/authenticate`, {
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
        this.setState({ error: resJson });
        if (!!resJson.token) {
          this.setState({ authToken: resJson.token, username });
          sessionStorage.setItem("access-token", resJson.token);
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
    return fetch(process.env.REACT_APP_SERVER_URL + `/submit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReport),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("error: ", error);
      });
  };

  handleGetUniqueReport = (id) => {
    return fetch(process.env.REACT_APP_SERVER_URL + `/api/reports/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": `${
          sessionStorage[`access-token`] || this.state.authToken
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
  };

  handleGetReports = async () => {
    return fetch(process.env.REACT_APP_SERVER_URL + `/api/reports`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": `${
          sessionStorage[`access-token`] || this.state.authToken
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
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };

  handleDeleteReport = (reportId) => {
    return fetch(
      process.env.REACT_APP_SERVER_URL + `/api/reports/${reportId}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "access-token": `${
            this.state.authToken || sessionStorage[`access-token`]
          }`,
        },
      }
    )
      .then((res) => this.handleGetReports())
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };

  handleEditReport = (reportId, updatedReport) => {
    return fetch(
      process.env.REACT_APP_SERVER_URL + `/api/reports/${reportId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "access-token": `${
            this.state.authToken || sessionStorage[`access-token`]
          }`,
        },
        body: JSON.stringify(updatedReport),
      }
    )
      .then((res) => {
        if (res && res.ok) {
          return res;
        } else {
          throw new Error("Error in updating report");
        }
      })
      .then((res) => res.json())
      .then((resJson) => {
        this.handleGetReports();
        return resJson;
      })
      .catch((error) => console.error("error", error));
  };

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
      handleGetUniqueReport: this.handleGetUniqueReport,
      handleDeleteReport: this.handleDeleteReport,
      handleEditReport: this.handleEditReport,
      handleLogOut: this.handleLogOut,
      handleGetErrors: this.handleGetErrors,
      handleLatLng: this.handleLatLng,
      clearError: this.clearError,
    };
    return (
      <AcidrtContext.Provider value={context}>
        <div className="app">
          <Nav />
          <main className="app-content">
            <Route exact path="/" render={(props) => <Main {...props} />} />
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Route path="/form" render={(props) => <Form {...props} />} />
            <Route
              exact
              path="/all-reports"
              render={(props) => <ReportList {...props} />}
            />
            <Route
              path="/dashboard"
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path="/all-reports/:reportId"
              render={(props) => <ReportDisplay {...props} />}
            />
          </main>
          <Footer />
        </div>
      </AcidrtContext.Provider>
    );
  }
}

export default App;
