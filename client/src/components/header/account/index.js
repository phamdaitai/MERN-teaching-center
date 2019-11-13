import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Account extends Component {
  render() {
    return (
      <div className="header-accout">
        <Link className="header-login">Đăng nhập</Link>
        <Link className="header-register">Đăng ký</Link>
      </div>
    );
  }
}

export default Account;