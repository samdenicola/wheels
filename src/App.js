import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import firebase from 'firebase';
// import Header from "./Components/Header";
import SplashScreen from "./Components/SplashScreen";
// import Map from "./Components/Map";
// import Footer from "./Components/Footer";
import MainPage from "./Components/MainPage";
import  './fire';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Settings from './Components/Settings';
import AddVehicle from './Components/AddVehicle';
import "./App.css";

// let currentUser 
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {debugger}
//   currentUser = user
//   console.log('currentUser:',currentUser)
// });


class App extends Component {
  state = {
    user: undefined
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user)=> {
      this.setState({user})
    });
  }
  
  render() {
    const {user} = this.state
    return (
      <BrowserRouter>
        <div className="app">
        <PrivateRoute user={user} exact path={"/"} component={MainPage} />
        <PrivateRoute user={user} path={"/settings"} component={Settings} />
        <PrivateRoute user={user} path={"/addvehicle"} component={AddVehicle} />
          {/* <Route path={"/login"} component={SplashScreen} /> */}
          <LoginRoute user={user} path={"/welcome"} component={SplashScreen} />
          <LoginRoute user={user} path={"/login"} component={ Login} />
          <LoginRoute user={user} path={"/signup"} component={ SignUp} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


const LoginRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={props => {
    return (!user) ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  
  }}/>
)
const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={props => {
    console.log('props:',props)
    return (user) ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/welcome',
        state: { from: props.location }
      }}/>
    )
  
  }}/>
)