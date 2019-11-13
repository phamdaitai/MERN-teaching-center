import React, { Component } from 'react';
import Routes from '../../routes/index';
import './style.css';

class Content extends Component {
  render() {
    return (
      <div className="content background-image-content">
        <div className="container">
          <Routes />
        </div>
      </div>

    );
  }
}

export default Content;