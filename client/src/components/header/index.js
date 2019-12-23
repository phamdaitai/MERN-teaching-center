import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Icon, Button, Drawer } from "antd";
import './style.css';
import Menu from './menu/index';
import Search from './search/index';
import Account from './account/index';

class Header extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="header">
        <div className="header-content container">
          <div className="header-logo">
            <Link to="/">
              <img className='header-logo-img' alt="logo" src="data:image/png;base64,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" />
            </Link>
          </div>
          <div className="header-sub">
            <Menu />
            <Search />
            <Account />
          </div>
          <div className="header-sub-repon">
            <Button className="collapse-button" onClick={this.showDrawer}>
              <Icon type="menu" />
            </Button>
            <Drawer className="header-drawer"
              width={300}
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <Search />
              <Menu />
              <Account />
            </Drawer>
          </div>
        </div>
      </div >
    );
  }
}

export default Header;