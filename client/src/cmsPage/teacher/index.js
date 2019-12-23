import React, { Component } from 'react';
import { Icon, Table, Spin, Button, message, Form, Modal, Input, Select } from 'antd';
import { checValidation } from '../../actions/index';
import axios from 'axios';
import cookie from 'react-cookies';
import './style.css';
const { Option } = Select;

class TeacherManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      visibleRegister: false,
      loadingRequestState: false
    }
  }

  getAllTeachers = () => {
    axios({
      method: 'GET',
      url: `https://fierce-oasis-19381.herokuapp.com/users/teacher`
    })
      .then((res) => {
        console.log(res.data)
        this.setState({ teachers: res.data })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentWillMount() {
    this.getAllTeachers();
  }

  showModalRegister = () => {
    this.setState({
      visibleRegister: true,
    });
  };

  submitRegiter = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          username: values.username, name: values.name,
          email: values.email, class: values.class, address: values.address,
          password: values.password, permission: 'teacher', phoneNumber: values.phoneNumber
        };
        let { teachers } = this.state;
        teachers.unshift(data);
        this.setState({ teachers });
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

  checkAuth = () => {
    if (!cookie.load("isAuth")) {
      message.info("Bạn cần phải đăng nhập để vào khóa học");
      this.props.history.push('/');
    }
  }

  render() {
    this.checkAuth();
    let { teachers } = this.state;
    const columns = [
      {
        title: 'Ảnh ',
        dataIndex: 'avatar',
        align: 'center',
        className: "name-column",
        render: (data) => <img className="img-teacher-manager" src={`${data}`} alt="Chưa có avatar" />
      },
      {
        title: 'Tên ',
        dataIndex: 'name',
        align: 'center',
        className: "name-column"
      },
      {
        title: 'Số điện thoại ',
        dataIndex: 'phoneNumber',
        align: 'center',
        className: "name-column"
      },
      {
        title: 'Email',
        dataIndex: 'email',
        align: 'center',
        className: "name-column"
      },
      {
        title: 'Địa chỉ ',
        dataIndex: 'address',
        align: 'center',
        className: "name-column"
      }
    ]

    const { getFieldDecorator } = this.props.form;
    let { loadingRequestState, visibleRegister } = this.state;
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

    return (
      <div className="teacher-list">
        <div className="teacher-list-inner">
          <div className="teacher-add">
            <Button type="primary" onClick={this.showModalRegister}>
              <Icon type="user-add" /> Thêm giáo viên
          </Button>
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
          </div>
          {teachers.length ? (<Table
            columns={columns}
            dataSource={teachers}
            bordered
            title={() => `Danh sách giáo viên`}
          />) : (<Spin size="large" />)}
        </div>
      </div>
    );
  }
}

export default Form.create({})(TeacherManager);