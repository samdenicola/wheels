import React from "react";
import {Link} from 'react-router-dom';
import "./SplashScreen.css";

export default class SplashScreen extends React.Component {
  render() {
    // const {} = this.props
    return (
      <div className={"splashscreen"}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: 20
          }}
          className={"login-header"}
        >
        <Link to={"/login"}>
          <div className={"button is-transparent"}>Log In</div>
        </Link >
        <Link to={"/signup"}>
          <div className={"button is-primary"}>Sign Up</div>
        </Link>
        </div>
        <div
          style={{
            margin: 20,
            marginTop: 100,
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div className="app-title">wheels</div>
          <p className="app-intro">a community for those on wheels</p>
        </div>
      </div>
    );
  }
}
