import React, { Component } from 'react';
import AcidrtContext from "../../AcidrtContext";
import { Link } from "react-router-dom";
import './Nav.css';

class Nav extends Component {
    static contextType = AcidrtContext;

    logOut = () => {
        this.context.handleLogOut();
        // this.props.history.push('/');
        window.location.href = '/'
    }

    render() {
        return(
            <nav>
                <section className={'title-header'}>
                    <header>
                        <h1 className="nav-h1"><Link to='/'>ACIDRT</Link></h1>
                        <p><b>A</b>lbemarle <b>C</b>ounty <b>I</b>llicit <b>D</b>ischarge <b>R</b>eporting <b>T</b>ool</p>
                    </header>
                </section>
                <section className={'nav-buttons'}>
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
                </section>
            </nav>
        );
    }
}

export default Nav;