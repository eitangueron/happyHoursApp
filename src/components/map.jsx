import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import HappyHourLocation from "./hhLocation";
// const HappyHourBar = ({ text }) => <div width='5px' height='5px'>{text}</div>;

const centerTlv = {lat: 32.0853, lng: 34.7818}

// const zina = { name:'Zina', lat: 32.0921189452, lng: 34.7744750977, rating:4, startHappyHourTime:17, endHappyHourTime:19 }

class Map extends Component {
  
static defaultProps = {
    center: centerTlv,
    zoom: 14,
    greatPlaces: [{name:'Zina', lat: 32.0921189452, lng: 34.7744750977}]
};

  componentDidMount() {
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(pos) {
            this.defaultProps.center = { lat:pos.coords.latitude, lng:pos.coords.longitude }
          });
      }
  }

  render() {

    const hhLocations = this.props.greatPlaces
    .map(location => {
      const {name, ...coords} = location;
      return (
        <HappyHourLocation
          key={name}
          {...coords}
          text={name}
          // use your hover state (from store, react-controllables etc...)
          hover={this.props.hoverKey === name} />
      );
    });
    
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >

            {hhLocations}
            
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;