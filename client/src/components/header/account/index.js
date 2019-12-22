import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Form, Icon, Input, Button, Checkbox, message, Avatar, Spin, Select } from 'antd';
import cookie from 'react-cookies';
import axios from 'axios';
import 'antd/dist/antd.css';
import './style.css';
import { connect } from 'react-redux';
import { saveUserLogin, checValidation } from '../../../actions/index';
const { Option } = Select;

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleRegister: false,
      visibleLogin: false,
      loadingRequestState: false,
      infoState: {},
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

  getInfo = () => {
    axios({
      method: 'GET',
      url: 'https://fierce-oasis-19381.herokuapp.com/users/me',
      headers: { Authorization: `Bearer ${cookie.load('token')}` }
    })
      .then((res) => {
        // console.log(res.data);
        this.setState({
          infoState: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentWillMount() {
    if (cookie.load('isAuth')) {
      this.getInfo();
    }
  }

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
            // console.log(res.data);
            res.data.user.avatar = [];
            cookie.save('info', res.data.user, {
              path: '/'
            })
            cookie.save('isAuth', true, {
              path: '/'
            })
            cookie.save('token', res.data.token, {
              path: '/'
            })
            this.setState({
              visibleLogin: false,
            });
            this.setState({ loadingRequestState: false });
            this.getInfo();
            message.success('Đăng nhập thành công');
            // let { addUserLogin } = this.props;
            // addUserLogin(res.data.user);
          })
          .catch((err) => {
            this.setState({ loadingRequestState: false });
            console.log(err);
            message.error('Tên người dùng hoặc mật khẩu không đúng');
          })
      }
    });
  }

  submitRegiter = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          username: values.username, name: values.name,
          email: values.email, class: values.class, address: values.address,
          password: values.password, permission: 'student', phoneNumber: values.phoneNumber
        };

        // console.log("data:", data);

        axios({
          method: 'POST',
          url: 'https://fierce-oasis-19381.herokuapp.com/users',
          data
        })
          .then((res) => {
            this.setState({
              loadingRequestState: false,
              visibleRegister: false,
              visibleLogin: true
            });
            message.success('Đăng ký thành công');
          })
          .catch((err) => {
            this.setState({ loadingRequestState: false });
            console.log(err);
            message.error('Đăng ký không thành công');
          })
      }
    });
  }

  logout = () => {
    cookie.remove('isAuth');
    cookie.remove('token');
    cookie.remove('info');
    let { addUserLogin } = this.props;
    addUserLogin({});

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

  //CHECK INPUT PASSWORD
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Hai mật khẩu không khớp nhau!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    // console.log(value);
    if (!checValidation(value)) {
      callback('Mật khẩu phải bắt đầu bằng chữ hoa, có ít nhất 1 chữ số,1 ký tự đặc biệt và nhiều hơn 8 chữ');
    }
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let isAuth = cookie.load('isAuth') || null;
    // const { userInfo } = this.props;
    let userInfo = cookie.load('info') || {};
    let { loadingRequestState, visibleLogin, visibleRegister } = this.state;
    // console.log(userInfo);
    const loadingIcon = <Icon type="loading" style={{ fontSize: 60 }} spin />;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    // console.log(this.state.infoState);
    return (
      <div className="header-accout">
        {isAuth ? (<Link to='personal'> <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
          <span style={{ paddingLeft: '10px' }}>{userInfo.name}</span></Link>) :
          (<Link className="header-login" onClick={this.showModalLogin}>Đăng nhập</Link>)}
        {isAuth ? (<Link onClick={this.logout}>Đăng xuất</Link>) : (<Link className="header-register" onClick={this.showModalRegister}>Đăng ký</Link>)}
        {visibleRegister ? (
          <Modal
            title="Đăng ký tài khoản"
            visible={this.state.visibleRegister}
            onOk={this.handleOkRegister}
            onCancel={this.handleCancelRegister}
            footer={null}
            className='modal-register'
          >
            <Form {...formItemLayout} onSubmit={(e) => this.submitRegiter(e)}>
              <Form.Item label="Tên đăng nhập">
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Nhập tên đăng nhập..."
                  />,
                )}
              </Form.Item>
              <Form.Item label="Tên hiển thị">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Vui lòng nhập tên hiển thị!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Nhập tên hiển thị..."
                  />,
                )}
              </Form.Item>
              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'Email là trường bắt buộc!',
                    },
                    {
                      required: true,
                      message: 'Vui lòng nhập E-mail!',
                    },
                  ],
                })(<Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Nhập email..."
                />)}
              </Form.Item>
              <Form.Item label="Lớp">
                {getFieldDecorator('class', {
                  rules: [{ required: true, message: 'Vui lòng chọn lớp!' }],
                })(
                  <Select
                    placeholder="Chọn lớp..."
                    onChange={this.handleSelectChange}
                  >
                    <Option value="9">9</Option>
                    <Option value="10">10</Option>
                    <Option value="11">11</Option>
                    <Option value="12">12</Option>
                    <Option value="13">13</Option>
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="Mật khẩu" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu của bạn!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Nhập mật khẩu..."
                />)}
              </Form.Item>
              <Form.Item label="Xác nhận mật khẩu" hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng xác nhận mật khẩu!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input.Password onBlur={this.handleConfirmBlur}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Xác nhận mật khẩu..."
                />)}
              </Form.Item>
              <Form.Item label="Địa chỉ">
                {getFieldDecorator('address', {
                  rules: [{ required: true, message: 'Vui lòng nhập địa chỉ!' }],
                })(
                  <Input
                    prefix={<Icon type="heat-map" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Nhập địa chỉ..."
                  />,
                )}
              </Form.Item>
              <Form.Item label="Số điện thoại">
                {getFieldDecorator('phoneNumber', {
                  rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }],
                })(
                  <Input
                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Số điện thoại..."
                  />,
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" onClick={() => { this.setState({ loadingRequestState: true }) }}>
                  Đăng ký
              </Button >
              </Form.Item>
            </Form>
            {loadingRequestState ? (<Spin indicator={loadingIcon} className='register-loading-request' />) : null}
          </Modal>) : null}
        {visibleLogin ? (<Modal
          title="Đăng nhập"
          visible={this.state.visibleLogin}
          onOk={this.handleOkLogin}
          onCancel={this.handleCancelLogin}
          width={400}
          footer={null}
          className='modal-login'
        >
          <Form onSubmit={this.submitLogin} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Vui lòng nhập tên người dùng!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Nhập số điện thoại hoặc email..."
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }],
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
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => { this.setState({ loadingRequestState: true }) }}>
                Đăng nhập
          </Button>
              <a href>Đăng ký tài khoản mới!</a>
            </Form.Item>
          </Form>
          {loadingRequestState ? (<Spin indicator={loadingIcon} className='login-loading-request' />) : null}
        </Modal>) : null}
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