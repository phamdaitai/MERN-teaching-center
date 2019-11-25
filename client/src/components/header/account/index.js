import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './style.css';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleRegister: false,
      visibleLogin: false
    };
  }

  showModalRegister = () => {
    this.setState({
      visibleRegister: true,
    });
  };

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

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="header-accout">
        <Link className="header-login" onClick={this.showModalLogin}>Đăng nhập</Link>
        <Link className="header-register" onClick={this.showModalRegister}>Đăng ký</Link><Modal
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
          <Form onSubmit={this.handleSubmit} className="login-form">
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
              <a className="login-form-forgot" href="">
                Quên mật khẩu
          </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Đăng nhập
          </Button>
              <a href="">Đăng ký tài khoản mới!</a>
            </Form.Item>
          </Form>
        </Modal>

      </div>
    );
  }
}

export default Form.create({})(Account);