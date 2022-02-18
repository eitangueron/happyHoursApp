import React, { Component} from 'react';
import {greatPlaceStyle, greatPlaceStyleHover} from './hhLocationWithContollableHoverStyle';

export default class HappyHourLocation extends Component {

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const style = this.props.hover ? greatPlaceStyleHover : greatPlaceStyle;

    return (
       <div style={style}>
          <div>{this.props.text}</div>
       </div>
    );
  }
}