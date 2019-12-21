import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Avatar } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import './style.css';

class PersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {}
    }
  }

  getInfo = () => {
    axios({
      method: 'GET',
      url: 'https://fierce-oasis-19381.herokuapp.com/users/me',
      headers: { Authorization: `Bearer ${cookie.load('token')}` }
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          info: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentWillMount() {
    this.getInfo();
  }
  render() {
    console.log("info", this.state.info);
    let { info } = this.state;
    return (
      <div className='personal'>
        <div className='personal-inner'>
          <div className='personal-avatar'>
            {info.avatar ? <img src={`data:image/png;base64, ${info.avatar.data}`} alt="avatar" /> :
              <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />}
          </div>
          <div className='personal-info'>

          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.changeUserLogin
  }
}
export default connect(mapStateToProps)(PersonalPage);