import React, { Component} from 'react';

export default class Locreview extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
       <div style={{ 
          width: '40vw', 
          height: '40vh', 
          backgroundColor: 'white', 
          justifyContent: 'center',
          alignItems: 'center',
          display: 'grid',
           }}>
           <p>Name: {this.props.name}</p>
           <p>Place Type: {this.props.placeType}</p>
           <p>Happy Hours Time: {this.props.startTime}-{this.props.endTime}</p>
           <button>Close</button>
        </div>
    );
  }
}