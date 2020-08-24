import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div className={"footer-div"}>
        <button>
          <Link to={"/"}>Home</Link>
        </button>
        <p>
          made by{" "}
          <a
            href="http://alex-hapgood.info"
            rel="noopener noreferrer"
            target="_blank"
          >
            Alex Hapgood
          </a>{" "}
          for Albemarle County Facilities and Environmental Stewardship
          Department
        </p>
        <p>updated 8/2020</p>
      </div>
    );
  }
}
