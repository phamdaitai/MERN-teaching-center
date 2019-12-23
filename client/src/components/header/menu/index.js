import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Menu extends Component {
  render() {
    return (
      <div className="header-menu">
        <Link className="header-inner" to="/">Trang chủ</Link>
        <Link className="header-inner" to="/course-manager">Khóa học</Link>
        <Link className="header-inner" to="/document-manager">Tài liệu</Link>
        <Link className="header-inner" to="/teacher">Giáo viên</Link>
        {/* <div className="header-inner header-dropdown" to>
          <span>Quản lý</span>
          <div className="header-dropdown-content">
            <Link to='/document-manager' className=""><span>Tài liệu</span></Link>
            <Link className=""><span>Bài thi</span></Link>
            <Link to='/course-manager' className=""><span>Khóa học</span></Link>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Menu;