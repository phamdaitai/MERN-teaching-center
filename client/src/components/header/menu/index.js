import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div className="header-menu">
        <Link className="header-inner">Trang chủ</Link>
        <Link className="header-inner">Khóa học</Link>
        <Link className="header-inner">Tài liệu</Link>
        <Link className="header-inner">Trung tâm</Link>
      </div>
    );
  }
}

export default Menu;