import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class FooterCenter extends Component {
  render() {
    return (
      <div className="footer-center footer-block">
        <div className="footer-center-title footer-title">
          <span>Trợ giúp</span>
        </div>
        <div className="footer-center-content footer-block-content">
          <Link>Trang chủ</Link>
          <Link>Giáo viên</Link>
          <Link>Tài liệu</Link>
          <Link>Chính sách</Link>
        </div>
      </div>
    );
  }
}

export default FooterCenter;