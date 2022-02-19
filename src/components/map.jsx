import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import HappyHourLocation from "./hhLocation";
// import { Link } from 'react-router-dom';
const centerTlv = {lat: 32.0853, lng: 34.7818}

// const zina = { name:'Zina', lat: 32.0921189452, lng: 34.7744750977, rating:4, startHappyHourTime:17, endHappyHourTime:19 }

class Map extends Component {

constructor(props){
    super(props)
}

static defaultProps = {
    center: centerTlv,
    zoom: 14,
    greatPlaces: [
        {name:'Zina', lat: 32.0921189452, lng: 34.7744750977, placeType:'Bar', startTime:'19:00', endTime:'21:00'},
        {name:'Shatu Shoal', lat: 32.081472437785, lng: 34.780037160717, placeType:'Bar', startTime:'18:00', endTime:'20:00'},
    ]
};

// not working ?
  componentDidMount() {
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(pos) {
            this.defaultProps.center = { lat:pos.coords.latitude, lng:pos.coords.longitude }
          });
      }
  }


  respectedToAppliedFilters(i){
    // return true
    return i.placeType === this.props.appliedFilter.placeType && 
    i.startTime <= this.props.appliedFilter.time &&
    i.endTime >= this.props.appliedFilter.time
  }


  render() {

    const hhLocations = this.props.greatPlaces
    .filter( location => this.respectedToAppliedFilters(location) )
    .map(location => {
      const {name,placeType,startTime,endTime, ...coords} = location;
      return (
            <HappyHourLocation
            key={name}
            name={name}
            text={name}
            placeType={placeType}
            startTime={startTime}
            endTime={endTime}
            {...coords}
            />
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