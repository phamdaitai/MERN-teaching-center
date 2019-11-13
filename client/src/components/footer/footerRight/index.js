import React, { Component } from 'react';
import './style.css';

class FooterRight extends Component {
  render() {
    return (
      <div className="footer-right footer-block">
        <div className="footer-right-title footer-title">
          <span>Liên hệ với chúng tôi</span>
        </div>
        <div className="footer-right-content footer-block-content">
          <a href="https://www.facebook.com/boy.it.hust">
            <img alt="facebook" src="https://upload.wikimedia.org/wikipedia/commons/1/16/Facebook-icon-1.png" />
          </a>
          <a href="zalo.com">
            <img alt="zalo" src="https://stc-zaloprofile.zdn.vn/pc/v1/images/favicon.ico" />
          </a>
          <a href="https://www.youtube.com/watch?v=cBClD7jylos">
            <img alt="youtube" src="https://cdn.pixabay.com/photo/2016/07/03/18/36/youtube-1495277__340.png" />
          </a>
        </div>
      </div>
    );
  }
}

export default FooterRight;