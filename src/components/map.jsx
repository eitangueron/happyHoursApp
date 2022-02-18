import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { defaultProps } from 'react-login-modal';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const centerTlv = {lat: 32.0853, lng: 34.7818}

class Map extends Component {
  
static defaultProps = {
    center: centerTlv,
    zoom: 14
};

  componentDidMount() {
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(pos) {
            this.defaultProps.center = { lat:pos.coords.latitude, lng:pos.coords.longitude }
          });
      }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={32.0853}
            lng={34.7818}
            text="Center TLV"
          />

        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;