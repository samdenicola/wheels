import React, { Component } from 'react';
import './App.css';
import fire from './fire';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <div className="app">
        <div className="app-header">
          
        </div>
        <div className="app-body">
          <div className="app-title">wheels</div>
          <p className="app-intro">
            a community for those on wheels
          </p>
          <form onSubmit={this.addMessage.bind(this)}>
            <input type="text" ref={ el => this.inputEl = el }/>
            <input type="submit"/>
            <div>
              { /* Render the list of messages */
                this.state.messages.map( message => <p key={message.id}>{message.text}</p> )
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;