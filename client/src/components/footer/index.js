import React, { Component } from 'react';
import './style.css';
import FooterLeft from './footerLeft/index';
import FooterCenter from './footerCenter/index';
import FooterRight from './footerRight/index';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-content container">
          <FooterLeft />
          <FooterCenter />
          <FooterRight />
        </div>
      </div>
    );
  }
}

export default Footer;