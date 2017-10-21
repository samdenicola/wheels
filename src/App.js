import React, { Component } from "react";
import Header from "./Components/Header";
import SplashScreen from "./Components/SplashScreen";
import Map from "./Components/Map";
import Footer from './Components/Footer';
import "./App.css";


class App extends Component {
  render() {
    if (true) {
      // if (!loggedIn) {
      return <SplashScreen />;
    }

    return (
      <div className="app">
        <Header/>
        <div className="app-body">
          
          <Map />
        </div>
        <Footer/>
        <div className="app-footer">footer</div>
      </div>
    );
  }
}

export default App;
