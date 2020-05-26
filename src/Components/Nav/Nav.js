import React, { Component } from 'react';
import AcidrtContext from "../../AcidrtContext";
import { Link } from "react-router-dom";
import './Nav.css';

class Nav extends Component {
    static contextType = AcidrtContext;

    logOut = () => {
        this.context.handleLogOut();
        this.props.history.push('/');
    }

    render() {
        return(
            <nav>
                <h1 className="nav-h1"><Link to='/'>ACIDRT</Link></h1>
                {(!!this.context.authToken || sessionStorage[`access-token`])
                    ? <>
                        <p>Welcome, {sessionStorage[`username`] || this.context.username}</p>
                        <button><Link to='/form'>Form</Link></button>
                        <button><Link to='/all-reports/'>All Reports</Link></button>
                        <button><Link to='/dashboard'>Dashboard</Link></button>
                        <button onClick={this.logOut}>Log Out</button>
                    </>
                    : <>
                        <button><Link to='/form'>Form</Link></button>
                        <button><Link to='/login'>Log In</Link></button>
                    </>
                }
            </nav>
        );
    }
}

export default Nav;