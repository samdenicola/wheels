import React from "react";
import Header from './Header';
import Footer from './Footer';
import Map from './Map';
import "./SplashScreen.css";
export default class SplashScreen extends React.Component {
  render() {
    // const {} = this.props
    return (
      <div className={"mainPage"}>
        <Header/>
        <div className="app-body">
          
          <Map />
        </div>
        <Footer/>
      </div>
    );
  }
}
