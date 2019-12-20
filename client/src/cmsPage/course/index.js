import React, { Component } from 'react';
import {
  Table, Spin, Tag, Button, Icon, Modal, Select,
  Form, Input, message, Radio, TimePicker, DatePicker
} from 'antd';
import cookie from 'react-cookies';
import axios from 'axios';
import './style.css';
const { Option } = Select;
const { TextArea } = Input;

class CourseManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCourse: [],
      visibleAddCourse: false,
      loadingRequestState: false
    }
  }

  getDataCourse = () => {
    axios({
      method: 'GET',
      url: 'https://fierce-oasis-19381.herokuapp.com/courses'
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          dataCourse: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentWillMount() {
    this.getDataCourse();
  }

  showAdd = () => {
    this.setState({
      visibleAddCourse: true,
    });
  };

  handleOkAdd = e => {
    console.log(e);
    this.setState({
      visibleAddCourse: false,
    });
  };

  handleCancelAdd = e => {
    console.log(e);
    this.setState({
      visibleAddCourse: false,
    });
  };

  FormatDate = (date) => {
    let d = new Date(date);
    let dateFormat = `${d.getUTCDate()}/` + `${d.getUTCMonth() + 1}/` + `${d.getFullYear()}`;
    return dateFormat;
  }

  FormatTime = (date) => {
    let d = new Date(date);
    let hour = d.getUTCHours();
    let min = d.getUTCMinutes();
    let timeFormat = `${hour + 7}:` + `${min > 10 ? min : '0' + min}`;
    return timeFormat;
  }

  submitNewCourse = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loadingRequestState: true });
        console.log(values);
        let lessonTime = this.FormatTime(values.lessonTimeStart) + " - " + this.FormatTime(values.lessonTimeEnd);
        let courseTime = this.FormatDate(values.courseTimeStart) + " - " + this.FormatDate(values.courseTimeEnd);
        let tuition = parseInt(values.tuition)
        let userInfo = cookie.load('info') || {};
        let data = {
          name: values.name, content: [], schedule: values.schedule,
          categories: [values.categories], topic: values.topic,
          teacher: { teacherId: userInfo._id, teacherName: userInfo.name },
          studyTime: { lessonTime: lessonTime, courseTime: courseTime },
          tuition: tuition, subject: values.subject, description: values.description,
          student: [], exams: []
        };
        console.log(data);
        axios({
          method: 'POST',
          url: 'https://fierce-oasis-19381.herokuapp.com/courses',
          data
        })
          .then((res) => {
            this.setState({
              loadingRequestState: false,
              visibleAddCourse: false
            });
            message.success('Tạo khóa học thành công');
          })
          .catch((err) => {
            this.setState({ loadingRequestState: false });
            console.log(err);
            message.error('Tạo khóa học thất bại');
          })
      }
      else {
        message.error('Vui lòng nhập đầy đủ thông tin');
      }
    });
  }

  validateInputNumber = (rule, value, callback) => {
    if (value[0] === "0") {
      callback("Số tiền đầu bằng chữ số khác 0!");
    }
    for (let i = 0; i < value.length; i++) {
      if (value[i].charCodeAt(0) < 48 || value[i].charCodeAt(0) > 57) {
        callback("Số tiền phải là chữ số");
      }
    }
    callback();
  }

  render() {
    let { dataCourse, loadingRequestState } = this.state;
    const loadingIcon = <Icon type="loading" style={{ fontSize: 60 }} spin />;
    const columns = [
      {
        title: 'Tên',
        dataIndex: 'name',
        className: "name-column"
      },
      {
        title: 'Môn',
        dataIndex: 'subject',
        className: "name-column"
      },
      {
        title: 'Thời gian',
        dataIndex: 'studyTime.lessonTime',
        className: "name-column"
      },
      {
        title: 'Lịch',
        dataIndex: 'schedule',
        className: "name-column",
        render: (data) => { return <>{data.map((value) => <Tag color="magenta">{value}</Tag>)}</> }
      },
      {
        title: 'Thời gian dự kiến',
        dataIndex: 'studyTime.courseTime',
        className: "name-column"
      },
      {
        title: 'Bài thi',
        dataIndex: '',
        className: "name-column"
      }
    ]
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
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='course-manager'>
        <div className='course-manager-inner'>
          <div className='course-add'>
            <Button type="primary" onClick={this.showAdd}>
              <Icon type="file-add" /> Thêm khóa học
              </Button>
            <Modal
              title="Thêm khóa học"
              visible={this.state.visibleAddCourse}
              onOk={this.handleOkAdd}
              okText='Thêm'
              onCancel={this.handleCancelAdd}
              cancelText='Hủy'
              minWidth={300}
              footer={false}
              className="modal-add-course"
            >
              <Form {...formItemLayout} onSubmit={this.submitNewCourse}>
                <Form.Item label="Tên khóa học">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Vui lòng nhập tên khóa học!' }],
                  })(
                    <Input
                      placeholder="Nhập tên khóa học..."
                    />,
                  )}
                </Form.Item>
                <Form.Item label="Môn">
                  {getFieldDecorator('subject', {
                    rules: [{ required: true, message: 'Vui lòng chọn môn học!' }],
                  })(
                    <Radio.Group>
                      <Radio value="Toán">Toán</Radio>
                      <Radio value="Lý">Lý</Radio>
                      <Radio value="Hóa">Hóa</Radio>
                      <Radio value="Sinh">Sinh</Radio>
                      <Radio value="Anh">Anh</Radio>
                    </Radio.Group>,
                  )}
                </Form.Item>
                <Form.Item label="Học phí" hasFeedback>
                  {getFieldDecorator('tuition', {
                    rules: [
                      { required: true, message: 'Vui lòng nhập vào học phí!' },
                      { validator: this.validateInputNumber }],
                  })(
                    <Input
                      placeholder="Ví dụ: 1000000"
                    />,
                  )}
                </Form.Item>
                <Form.Item label="Các ngày học">
                  {getFieldDecorator('schedule', {
                    rules: [{ required: true, message: 'Vui lòng chọn ngày học!' }],
                  })(
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Chọn ngày"
                    >
                      <Option key={2} value="Monday">Thứ 2</Option>
                      <Option key={3} value="Tuesday">Thứ 3</Option>
                      <Option key={4} value="Wednesday">Thứ 4</Option>
                      <Option key={5} value="Thursday">Thứ 5</Option>
                      <Option key={6} value="Friday">Thứ 6</Option>
                      <Option key={7} value="Saturday">Thứ 7</Option>
                      <Option key={8} value="Sunday">Chủ Nhật</Option>
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item label="Bắt đầu vào lớp lúc">
                  {getFieldDecorator('lessonTimeStart', {
                    rules: [{ required: true, message: 'Vui lòng nhập vào thời gian bắt đầu!' }],
                  })(
                    <TimePicker format="HH:mm" />,
                  )}
                </Form.Item>
                <Form.Item label="Tan lớp lúc">
                  {getFieldDecorator('lessonTimeEnd', {
                    rules: [{ required: true, message: 'Vui lòng nhập thời gian tan lớp!' }],
                  })(
                    <TimePicker format="HH:mm" />,
                  )}
                </Form.Item>
                <Form.Item label="Khóa học bắt đầu từ">
                  {getFieldDecorator('courseTimeStart', {
                    rules: [{ required: true, message: 'Vui lòng chọn thời gian bắt đầu khóa học!' }],
                  })(
                    <DatePicker format='DD/MM/YYYY' />,
                  )}
                </Form.Item>
                <Form.Item label="Khóa học kết thúc lúc">
                  {getFieldDecorator('courseTimeEnd', {
                    rules: [{ required: true, message: 'Vui lòng chọn thời gian kết thúc khóa học' }],
                  })(
                    <DatePicker format='DD/MM/YYYY' />,
                  )}
                </Form.Item>
                <Form.Item label="Thể loại">
                  {getFieldDecorator('categories', {
                    rules: [{ required: true, message: 'Vui lòng nhập tên khóa học!' }],
                  })(
                    <Radio.Group>
                      <Radio value="Luyện thi vào lớp 10">Luyện thi vào lớp 10</Radio>
                      <Radio value="Luyện thi trung học phổ thông">Luyện thi trung học phổ thông</Radio>
                      <Radio value="Học thêm lớp 10">Học thêm lớp 10</Radio>
                      <Radio value="Học thêm lớp 11">Học thêm lớp 11</Radio>
                      <Radio value="Học thêm lớp 12">Học thêm lớp 12</Radio>
                    </Radio.Group>,
                  )}
                </Form.Item>
                <Form.Item label="Chủ đề">
                  {getFieldDecorator('topic', {
                    rules: [{ required: true, message: 'Vui lòng nhập tên khóa học!' }],
                  })(
                    <Radio.Group>
                      <Radio value="Bổ trợ kiến thức">Bổ trợ kiến thức</Radio>
                      <Radio value="Nâng cao thức">Nâng cao thức</Radio>
                      <Radio value="Dạy kèm">Dạy kèm</Radio>
                      <Radio value="Ôn tập nhanh">Ôn tập nhanh</Radio>
                    </Radio.Group>,
                  )}
                </Form.Item>
                <Form.Item label="Mô tả">
                  {getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Vui lòng nhập tên khóa học!' }],
                  })(
                    <TextArea
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      placeholder="Nhập tên khóa học..."
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="add-course-form-button">
                    Thêm
                  </Button>
                </Form.Item>
              </Form>
              {loadingRequestState ? (<Spin indicator={loadingIcon} className='add-course-loading-request' />) : null}
            </Modal>
          </div>
          {dataCourse.length ? (<Table
            columns={columns}
            dataSource={dataCourse}
            bordered
            title={() => 'Các khóa học'}
          />) : (<Spin size="large" />)}
        </div>
      </div>
    );
  }
}

export default Form.create({})(CourseManager);