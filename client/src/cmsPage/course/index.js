import React, { Component } from 'react';
import {
  Table, Spin, Tag, Button, Icon, Modal, Select,
  Form, Input, message, Radio, TimePicker, DatePicker
} from 'antd';
import cookie from 'react-cookies';
import axios from 'axios';
import { validateInputNumber, FormatDate, FormatTime } from '../../actions/index';
import { convertURL } from '../../actions/index';
import { Link } from 'react-router-dom';
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
        let coursesOfUser = cookie.load("courses");
        if (this.checkPermission() === "admin") {
          this.setState({
            dataCourse: res.data
          })
        } else {
          let dataCourse = res.data.filter((val, key) => {
            if (coursesOfUser.find(element => val._id === element.courseId)) {
              return val;
            }
          })
          this.setState({
            dataCourse,
            loadingRequestState: false
          })
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loadingRequestState: false
        })
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

  submitNewCourse = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loadingRequestState: true });
        // console.log(values);
        let lessonTime = FormatTime(values.lessonTimeStart) + " - " + FormatTime(values.lessonTimeEnd);
        let courseTime = FormatDate(values.courseTimeStart) + " - " + FormatDate(values.courseTimeEnd);
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
        console.log(data)
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

  checkAuth = () => {
    if (!cookie.load("isAuth")) {
      message.info("Bạn cần phải đăng nhập để vào khóa học");
      this.props.history.push('/');
    }
  }

  checkUserInCourse = (idCourse) => {
    let statusCheck = false;
    let coursesOfUser = cookie.load("courses") || [];
    coursesOfUser.forEach(element => {
      if (idCourse === element.courseId) {
        if (element.status === "accepted") statusCheck = true;
      }
    });
    return statusCheck;
  }

  showNotice = () => {
    message.warning("Bạn chưa được quyền");
  }

  checkPermission = () => {
    let userInfo = cookie.load("info") || {};
    return userInfo.permission;
  }

  changeStateFeatureCourse = (idCourse, featureCourse) => {
    // console.log(`https://fierce-oasis-19381.herokuapp.com/courses/changefeature/${idCourse}?featureCourse=${!featureCourse}`);
    axios({
      method: 'PATCH',
      url: `https://fierce-oasis-19381.herokuapp.com/courses/changefeature/${idCourse}?featureCourse=${!featureCourse}`
    })
      .then((res) => {
        console.log(res.data);
        let { dataCourse } = this.state;
        dataCourse.forEach(element => {
          if (element._id === idCourse) {
            element.featureCourse = !featureCourse;
          }
        })
        this.setState({ dataCourse });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    this.checkAuth();
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
        title: `${this.checkPermission() === "admin" ? "Khóa học nổi bật" : "Trạng thái"}`,
        dataIndex: `${this.checkPermission() === "admin" ? "featureCourse" : "_id"}`,
        align: 'center',
        className: "name-column",
        render: (data, record) => {
          if (this.checkPermission() === "admin") {
            return data ? <Icon theme="twoTone" type="check-square" className="icon-check-square"
              onClick={() => this.changeStateFeatureCourse(record._id, record.featureCourse)} /> :
              <Icon type="close-square" className="icon-close-square"
                onClick={() => this.changeStateFeatureCourse(record._id, record.featureCourse)} />
          }
          return this.checkUserInCourse(data) ? <Icon theme="twoTone" type="check-square" className="icon-check-square" /> :
            <Icon type="close-square" className="icon-close-square" />
        }
      },
      {
        title: 'Bài thi',
        dataIndex: '_id',
        className: "name-column",
        render: (data, record) => {
          return <Link to={this.checkUserInCourse(record._id) ? "/exam/" + convertURL(record.name) + "." + record._id + ".html" : null}
            onClick={!this.checkUserInCourse(record._id) ? () => this.showNotice() : null}>Xem bài thi</Link>
        }
      },
      {
        title: 'Danh sách lớp',
        dataIndex: '_id',
        className: "name-column",
        render: (data, record) => {
          return <Link to={this.checkUserInCourse(record._id) ? "/member-list/" + convertURL(record.name) + "." + record._id + ".html" : null}
            onClick={!this.checkUserInCourse(record._id) ? () => this.showNotice() : null}>Xem danh sách</Link>
        }
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
    console.log(this.state.courses);
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
                      { validator: validateInputNumber }],
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