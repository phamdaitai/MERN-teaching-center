import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Menu extends Component {
  render() {
    return (
      <div className="header-menu">
        <Link className="header-inner" to="/">Trang chủ</Link>
        <Link className="header-inner" to="subject">Khóa học</Link>
        <Link className="header-inner" to="exam">Bài thi</Link>
        <Link className="header-inner">Tài liệu</Link>
        <div className="header-inner header-dropdown" to>
          <span>Quản lý</span>
          <div className="header-dropdown-content">
            <Link to='/document-manager' className=""><span>Tài liệu</span></Link>
            <Link className=""><span>Bài thi</span></Link>
            <Link className=""><span>Khóa học</span></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;