import mapboxgl from "mapbox-gl";

import React from "react";
mapboxgl.accessToken =
"pk.eyJ1Ijoic2FtZGVuaWNvbGEiLCJhIjoiY2o5MDA3a3phMDZ6NzJ4cDRva2FzbGlhdiJ9.IJ4t6Jdf88BVZx2-DFT2uA";

export default class Map extends React.Component {
  state = { 
    lng: 0,
    lat: 0,
    userLng: null,
    userLat: null,
    userWatchId: null,
    zoom: 1
   };
  componentWillMount() {
    
  } 
  componentWillUnmount() {
    const {userWatchId} = this.state;
    if (userWatchId) navigator.geolocation.clearWatch() //unregister location/error monitoring handlers
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const self = this;
    
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom
    });
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
      //register location monitoring, update state with user's position
      const userWatchId = navigator.geolocation.watchPosition(function(position) { 
        const {latitude, longitude} = position.coords;
        self.setState({userLat: latitude, userLng: longitude, userWatchId: userWatchId})
      })
    } else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }

    const el = document.createElement('div');
    el.id = 'userMarker';

    map.on("load", () => {
      //this assumes map loading takes longer than geolocation tracking (UNSAFE) will need to change this!
      const {userLat, userLng} = this.state;
      if (userLat && userLng) {
      const popup = new mapboxgl.Popup()
          .setText('You are here!');
       new mapboxgl.Marker(el)
         .setLngLat([userLng, userLat])
         .setPopup(popup)
         .addTo(map);
        map.flyTo({center: [userLng, userLat], zoom: 14});
      }
    });

    map.on("move", () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }
  render() {
    const { lng, lat, zoom, loggedIn } = this.state;
    
    return (
      <div className={"map-div"}>
        <div className="">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => (this.mapContainer = el)} className={"map-container"} />
      </div>
    );
  }
}
