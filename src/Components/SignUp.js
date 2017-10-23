import React from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import {db} from '../fire';

export default class SignUp extends React.Component {
  render() {
    return (
      <div>
        <Link to={"/welcome"}>
          <div className={"button"}>Back</div>
        </Link>
        <SignUpWithEmail />
        <div className={"section"}>
          <h2> Or </h2>
          <div
            className={"button"}
            onClick={() => {
              let provider = new firebase.auth.FacebookAuthProvider();
              firebase.auth().signInWithRedirect(provider);
            }}
          >
            Sign Up With Facebook
          </div>
        </div>
        <div className={"section"}>
          <h2> Or </h2>
          <div
            className={"button"}
            onClick={() => {
              let provider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithRedirect(provider);
            }}
          >
            Sign Up With Google
          </div>
        </div>
      </div>
    );
  }
}

class SignUpWithEmail extends React.Component {
  state = {
    email: "",
    errorMessage: "",
    password: ""
  };
  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <div className={"section"}>
        <h2>Sign Up with email:</h2>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              value={email}
              className="input"
              type="email"
              placeholder="Email"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i className="fa fa-check" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              value={password}
              className="input"
              type="password"
              placeholder="Password"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-lock" />
            </span>
          </p>
        </div>
        <div
          className={"wh-signup-error"}
          style={{
            color: "red"
          }}
        >
          {errorMessage ? errorMessage : ""}
        </div>
        <div
          onClick={() => {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password).then(({uid, email}) => {
                return db.collection('users').add({
                  email,
                  uid
                })
              })
              .catch(error => {
                const errorMessage = error.message;
                this.setState({ errorMessage });
                // ...
              });
          }}
          className={"button"}
        >
          Sign Up
        </div>
      </div>
    );
  }
}
