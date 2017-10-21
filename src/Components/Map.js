import mapboxgl from "mapbox-gl";

import React from "react";
mapboxgl.accessToken =
"pk.eyJ1Ijoic2FtZGVuaWNvbGEiLCJhIjoiY2o5MDA3a3phMDZ6NzJ4cDRva2FzbGlhdiJ9.IJ4t6Jdf88BVZx2-DFT2uA";

export default class Map extends React.Component {
  state = { 
    lng: 5,
    lat: 34,
    zoom: 1.5
   };
  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom
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
