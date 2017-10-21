import React, { Component } from 'react';
import './App.css';
import fire from './fire';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZGVuaWNvbGEiLCJhIjoiY2o5MDA3a3phMDZ6NzJ4cDRva2FzbGlhdiJ9.IJ4t6Jdf88BVZx2-DFT2uA';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      messages: [],
      lng: 5,
      lat: 34,
      zoom: 1.5
     }; // <- set up react state
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
  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });
    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div className="app">
        <div className="app-header">
          
        </div>
        <div className="app-body">
          <div className="app-title">wheels</div>
          <p className="app-intro">
            a community for those on wheels
          </p>
          <div className={'map-div'}>
            <div className="">
              <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
            </div>
            <div ref={el => this.mapContainer = el}  className={'map-container'}/>
          </div>

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