import React, { Component } from 'react';
import './style.css';
import HomeOnTop from './homeOnTop/index';
import HomeMiddle from './homeMiddle/index';
// import HomeBottom from './homeBottom/index';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <HomeOnTop />
        <HomeMiddle />
        {/* <HomeBottom /> */}
      </div>
    );
  }
}

export default Home;