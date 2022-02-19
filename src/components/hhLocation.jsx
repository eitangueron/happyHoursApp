import React, { Component} from 'react';
import {greatPlaceStyle, greatPlaceStyleHover} from './hhLocationStyle';
import Locreview from './locReview'

export default class HappyHourLocation extends Component {

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      displayInfo:false
    }
  }

  toggleView(){
    this.setState( {
      displayInfo: !this.state.displayInfo
    })
  }

  render() {
    const style = this.props.hover ? greatPlaceStyleHover : greatPlaceStyle;

    return (
      <>
      <div style={style} onClick={() => this.toggleView() }>
        { this.state.displayInfo ? 
        <Locreview {...this.props}></Locreview>
        : <div>{this.props.text}</div>
        }
      </div>
      </>
    );
  }
}