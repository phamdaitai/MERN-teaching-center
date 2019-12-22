import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Avatar, Button, Input, Select, message, Spin, Form, Modal, Icon } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import { checValidation } from '../../actions/index';
import './style.css';
const { Option } = Select;

class PersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      infoEdit: {},
      loadingSubmitEdit: false,
      editState: false,
      loadingRequestState: false,
      visibleChangePassword: false
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
          info: res.data,
          infoEdit: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentWillMount() {
    this.getInfo();
  }

  isChange = (e) => {
    let { info, infoEdit } = this.state;
    let value = e.target.value;
    let name = e.target.name;
    infoEdit[name] = value;
    this.setState({ info, infoEdit });
  }

  isChangeSelect = (val) => {
    let { infoEdit } = this.state;
    infoEdit["class"] = val;
    this.setState({ infoEdit });
  }

  submitChangeInfo = () => {
    this.setState({ loadingSubmitEdit: true });
    let { info, infoEdit } = this.state;
    let data = {
      name: infoEdit.name, address: infoEdit.address,
      phoneNumber: infoEdit.phoneNumber, email: infoEdit.email,
      class: infoEdit.class
    }
    axios({
      method: "PATCH",
      url: `https://fierce-oasis-19381.herokuapp.com/users/me`,
      headers: { Authorization: `Bearer ${cookie.load('token')}` },
      data
    })
      .then((res) => {
        this.getInfo();
        this.setState({ loadingSubmitEdit: false, editState: false });
        message.success("Đã thay đổi thông tin");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loadingSubmitEdit: false });
        message.error("Thông tin không được thay đổi");
      })
  }


  //CHANGE PASSWORD
  showChangePassword = () => {
    this.setState({
      visibleChangePassword: true,
    });
  };

  handleOkChangePassword = e => {
    this.setState({
      visibleChangePassword: false,
    });
  };

  handleCancelChangePassword = e => {
    this.setState({
      visibleChangePassword: false,
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
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

  submitChangePassword = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword
        };
        if (data.oldPassword !== data.newPassword) {
          axios({
            method: 'PATCH',
            url: 'https://fierce-oasis-19381.herokuapp.com/users/changePass',
            headers: { Authorization: `Bearer ${cookie.load("token")}` },
            data
          })
            .then((res) => {
              this.setState({
                loadingRequestState: false,
                visibleChangePassword: false
              });
              message.success('Đổi mật khẩu thành công');
            })
            .catch((err) => {
              message.error('Mật khẩu không đúng');
              this.setState({ loadingRequestState: false });
              console.log(err);
            })
        }
        else {
          message.warning("Mật khẩu mới phải khác mật khẩu cũ");
          this.setState({ loadingRequestState: false });
        }
      }
    });
  }

  render() {
    let { info, infoEdit, editState } = this.state;
    const { getFieldDecorator } = this.props.form;
    let { loadingRequestState } = this.state;
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
    return (
      <div className='personal'>
        <div className='personal-inner'>
          <div className='personal-avatar'>
            {info.avatar ? <img src={`data:image/png;base64, ${info.avatar.data}`} alt="avatar" /> :
              <Avatar size={80} style={{ backgroundColor: '#87d068', fontSize: "50px" }} icon="user" />}
          </div>
          <div className='personal-info'>
            <div className="personal-info-element">
              <div className="personal-info-element-left"><span>Tên</span></div>
              <div className="personal-info-element-right">
                {!editState ? <span>{info.name}</span> :
                  <Input placeholder="Nhập vào tên..." name="name" value={infoEdit.name} onChange={(e) => this.isChange(e)} />}
              </div>
            </div>
            <div className="personal-info-element">
              <div className="personal-info-element-left"><span>Tên người dùng</span></div>
              <div className="personal-info-element-right">
                <span>{info.username}</span>
              </div>
            </div>
            <div className="personal-info-element">
              <div className="personal-info-element-left"><span>email</span></div>
              <div className="personal-info-element-right">
                {!editState ? <span>{info.email}</span> :
                  <Input placeholder="Nhập vào email..." name="email" value={infoEdit.email} onChange={(e) => this.isChange(e)} />}
              </div>
            </div>
            <div className="personal-info-element">
              <div className="personal-info-element-left"><span>Số điện thoại</span></div>
              <div className="personal-info-element-right">
                {!editState ? <span>{info.phoneNumber}</span> :
                  <Input placeholder="Nhập vào số điện thoại..." name="phoneNumber" value={infoEdit.phoneNumber} onChange={(e) => this.isChange(e)} />}
              </div>
            </div>
            <div className="personal-info-element">
              <div className="personal-info-element-left"><span>Lớp</span></div>
              <div className="personal-info-element-right">
                {!editState ? <span>{info.class}</span> :
                  (
                    <Select defaultValue={infoEdit.class} style={{ minWidth: 120 }} onChange={(e) => this.isChangeSelect(e)} name="class">
                      <Option value="9">9</Option>
                      <Option value="10">10</Option>
                      <Option value="11">11</Option>
                      <Option value="12">12</Option>
                      <Option value="13">13</Option>
                    </Select>
                  )
                }
              </div>
            </div>
            <div className="personal-info-element">
              <div className="personal-info-element-left"><span>Địa chỉ</span></div>
              <div className="personal-info-element-right">
                {!editState ? <span>{info.address}</span> :
                  <Input placeholder="Nhập vào địa chỉ..." name="address" value={infoEdit.address} onChange={(e) => this.isChange(e)} />}
              </div>
            </div>
            <div className="personal-info-element">
              <div className="personal-info-element-left"><span>Quyền</span></div>
              <div className="personal-info-element-right">
                <span>{info.permission}</span>
              </div>
            </div>
            <div className="personal-info-button">
              <div className="personal-info-button-change">
                {!editState ? (<>
                  <Button type="primary" onClick={() => this.setState({ editState: true })}>Sửa thông tin</Button>
                  <Button type="primary" onClick={() => this.showChangePassword()}>Đổi mật khẩu</Button>
                </>) : (<>
                  <Button type="danger" onClick={() => this.setState({ editState: false })}>Hủy</Button>
                  <Button type="primary" onClick={() => this.submitChangeInfo()}>Cập nhật</Button>
                </>)}
                {this.state.loadingSubmitEdit ? <Spin size="large" className="icon-loading-change-info" /> : null}
                <Modal
                  title="Đăng ký tài khoản"
                  visible={this.state.visibleChangePassword}
                  onOk={this.handleOkChangePassword}
                  onCancel={this.handleCancelChangePassword}
                  footer={null}
                  className='modal-register'
                >
                  <Form {...formItemLayout} onSubmit={(e) => this.submitChangePassword(e)}>
                    <Form.Item label="Mật khẩu cũ" hasFeedback>
                      {getFieldDecorator('oldPassword', {
                        rules: [
                          {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu cũ của bạn!',
                          }
                        ],
                      })(<Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Nhập mật khẩu cũ..."
                      />)}
                    </Form.Item>
                    <Form.Item label="Mật khẩu mới" hasFeedback>
                      {getFieldDecorator('newPassword', {
                        rules: [
                          {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu mới của bạn!',
                          },
                          {
                            validator: this.validateToNextPassword,
                          },
                        ],
                      })(<Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Nhập mật khẩu mới..."
                      />)}
                    </Form.Item>
                    <Form.Item label="Xác nhận mật khẩu" hasFeedback>
                      {getFieldDecorator('confirm', {
                        rules: [
                          {
                            required: true,
                            message: 'Vui lòng xác nhận mật khẩu mới!',
                          },
                          {
                            validator: this.compareToFirstPassword,
                          },
                        ],
                      })(<Input.Password onBlur={this.handleConfirmBlur}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Xác nhận mật khẩu mới..."
                      />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit" onClick={() => { this.setState({ loadingRequestState: true }) }}>
                        Đổi mật khẩu
              </Button >
                    </Form.Item>
                  </Form>
                  {loadingRequestState ? (<Spin indicator={loadingIcon} className='change-password-loading-request' />) : null}
                </Modal>
              </div>
            </div>
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
export default Form.create({})(connect(mapStateToProps)(PersonalPage));