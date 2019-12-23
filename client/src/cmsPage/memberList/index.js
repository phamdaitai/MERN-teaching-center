import React, { Component } from 'react';
import { Table, Spin, Icon } from 'antd';
import axios from 'axios';
import cookie from 'react-cookies';
import './style.css';

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {}
    }
  }

  getCourse = () => {
    axios({
      method: 'GET',
      url: `https://fierce-oasis-19381.herokuapp.com/courses/${this.props.match.params._id}`
    })
      .then((res) => {
        this.setState({ course: res.data })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentWillMount() {
    this.getCourse();
  }

  changeStatus = (studentId, status) => {
    let { course } = this.state;
    let data = {
      courseId: course._id,
      studentId: studentId
    }

    axios({
      method: 'PATCH',
      url: 'https://fierce-oasis-19381.herokuapp.com/users/acceptRequest',
      data
    })
      .then((res) => {
        console.log(res.data);
        course.student.forEach(element => {
          if (element.studentId === studentId) {
            element.status = "accepted";
          }
        })
        this.setState({ course });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  checkPermission = () => {
    let userInfo = cookie.load("info") || {};
    return userInfo.permission;
  }

  render() {
    // console.log(this.props.match.params._id);
    // console.log(this.state.course);
    let { course } = this.state;
    const columns = [
      {
        title: 'Mã học sinh',
        dataIndex: 'studentId',
        className: "name-column",
        align: 'center',
        render: (data) => { return <span>HS_{data}</span> }
      },
      {
        title: 'Tên học sinh',
        dataIndex: 'studentName',
        align: 'center',
        className: "name-column"
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        align: 'center',
        className: "name-column",
        render: (data, record) => {
          return data === "accepted" ? <Icon theme="twoTone" type="check-square" onClick={this.checkPermission() === "teacher" ? () => this.changeStatus(record.studentId, data) : null} /> :
            <Icon type="close-square" className="icon-close-square" onClick={this.checkPermission() === "teacher" ? () => this.changeStatus(record.studentId, data) : null} />
        }
      }
    ]
    return (
      <div className="member-list">
        <div className="member-list-inner">
          {course.student ? (<Table
            columns={columns}
            dataSource={course.student}
            bordered
            title={() => `Danh sách học sinh ${course.name ? (" khóa học " + course.name) : null}`}
          />) : (<Spin size="large" />)}
        </div>
      </div>
    );
  }
}

export default MemberList;