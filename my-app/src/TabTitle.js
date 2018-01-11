import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';

class TabTitle extends Component {
  render() {
    return (
  <div className="TabTitle">
       <h2><br/> {this.props.name} </h2>
  </div>
    );
  }
}

export default TabTitle;
