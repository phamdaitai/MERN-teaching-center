import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Form, Icon, Input, Button, Checkbox, message, Avatar } from 'antd';
import cookie from 'react-cookies';
import axios from 'axios';
import 'antd/dist/antd.css';
import './style.css';
import { connect } from 'react-redux';
import { saveUserLogin } from '../../../actions/index';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleRegister: false,
      visibleLogin: false,
      infoLogin: {
        userName: '',
        password: ''
      }
    };
  }

  showModalRegister = () => {
    this.setState({
      visibleRegister: true,
    });
  };

  submitLogin = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = { username: values.username, password: values.password };
        axios({
          method: 'POST',
          url: 'https://fierce-oasis-19381.herokuapp.com/users/login',
          data
        })
          .then((res) => {
            let { addUserLogin } = this.props;
            addUserLogin(res.data.user);
            cookie.save('isAuth', true, {
              maxAge: 7200,
              path: '/'
            })
            cookie.save('token', res.data.token, {
              maxAge: 7200,
              path: '/'
            })
            this.setState({
              visibleLogin: false,
            });
            message.success('Đăng nhập thành công');
          })
          .catch((err) => {
            console.log(err);
            message.error('Tên người dùng hoặc mật khẩu không đúng');
          })
      }
    });
  }

  handleOkRegister = e => {
    this.setState({
      visibleRegister: false,
    });
  };

  handleCancelRegister = e => {
    this.setState({
      visibleRegister: false,
    });
  };

  showModalLogin = () => {
    this.setState({
      visibleLogin: true,
    });
  };

  handleOkLogin = e => {
    this.setState({
      visibleLogin: false,
    });
  };

  handleCancelLogin = e => {
    this.setState({
      visibleLogin: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  logout = () => {
    cookie.remove('token', { path: '/' });
    cookie.remove('isAuth', { path: '/' });
    // this.props.history.push('/')
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let isAuth = cookie.load('isAuth') || null;
    const { userInfo } = this.props;
    console.log(userInfo);
    return (
      <div className="header-accout">
        {isAuth ? (<Link> <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
          <span style={{ paddingLeft: '10px' }}>{userInfo.name}</span></Link>) :
          (<Link className="header-login" onClick={this.showModalLogin}>Đăng nhập</Link>)}
        {isAuth ? (<Link onClick={this.logout}>Đăng xuất</Link>) : (<Link className="header-register" onClick={this.showModalRegister}>Đăng ký</Link>)}
        <Modal
          title="Đăng ký tài khoản"
          visible={this.state.visibleRegister}
          onOk={this.handleOkRegister}
          onCancel={this.handleCancelRegister}
          footer={null}
        >
          <p></p>
        </Modal>
        <Modal
          title="Đăng nhập"
          visible={this.state.visibleLogin}
          onOk={this.handleOkLogin}
          onCancel={this.handleCancelLogin}
          width={400}
          footer={null}
        >
          <Form onSubmit={this.submitLogin} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Nhập số điện thoại hoặc email..."
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Nhập mật khẩu..."
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Nhớ mật tài khoản</Checkbox>)}
              <a className="login-form-forgot" href>
                Quên mật khẩu
          </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Đăng nhập
          </Button>
              <a href>Đăng ký tài khoản mới!</a>
            </Form.Item>
          </Form>
        </Modal>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.changeUserLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserLogin: (userInfo) => {
      dispatch(saveUserLogin(userInfo));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({})(Account));