import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import HappyHourLocation from "./hhLocation";
const CENTER_TLV = {lat: 32.0853, lng: 34.7818}

class Map extends Component {

constructor(props){
    super(props)
}

// dummyData = [
//     {name:'Zina', lat: 32.0921189452, lng: 34.7744750977, placeType:'bar', startTime:'19:00', endTime:'21:00'},
//     {name:'Shatu Shoal', lat: 32.081472437785, lng: 34.780037160717, placeType:'bar', startTime:'18:00', endTime:'20:00'},
// ]

static defaultProps = {
    center: CENTER_TLV,
    zoom: 14,
    greatPlaces: JSON.parse( sessionStorage.getItem('All_LOCATIONS') ) || []
};


  componentDidMount() {
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(pos) {
            this.defaultProps.center = { lat:pos.coords.latitude, lng:pos.coords.longitude }
          });
      }
  }


  respectedToAppliedFilters(i){
    return (this.props.appliedFilter.placeType ? i.placeType === this.props.appliedFilter.placeType : true)
    && ( this.props.appliedFilter.time ? this.compareTimeLongFormat(i.startTime , this.props.appliedFilter.time )
    && !this.compareTimeLongFormat(i.endTime , this.props.appliedFilter.time ) : true )
    && ( this.props.appliedFilter.name ? i.name === this.props.appliedFilter.name : true)
    
  }

  // return true iff t1<=t2
  compareTimeLongFormat(t1, t2){
    const t1Hours = t1.slice(0,2)
    const t2Hours = t2.slice(0,2)
    const t1Minutes = t1.slice(3)
    const t2Minutes = t2.slice(3)
    if(t1Hours<t2Hours){
        return true
    } else if (t1Hours > t2Hours){
        return false
    } else {
        if(t1Minutes<=t2Minutes){
            return true
        } else {
            return false
        }  
    }
  }


  render() {

    const hhLocations = this.props.greatPlaces
    .filter( location => this.respectedToAppliedFilters(location) )
    .map(location => {
      const {name,placeType,startTime,endTime,lat,long} = location;
      return (
            <HappyHourLocation
            key={name}
            name={name}
            text={name}
            placeType={placeType}
            startTime={startTime}
            endTime={endTime}
            lat={lat}
            lng={long}
            toggleShowOnlySelectedMarker = { () => this.props.appliedFilter.name ? 
                this.props.setAppliedFilters({ ...this.props.appliedFilter, name:""} )
            :  this.props.setAppliedFilters({ ...this.props.appliedFilter, name:name} )}
            />
      );
    });
    
    return (
      <div style={{ height: '90vh', width: '100%' }}>
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