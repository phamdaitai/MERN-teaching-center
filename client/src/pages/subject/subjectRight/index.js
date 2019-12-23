import React, { Component } from 'react';
import { Icon, Button, Spin, message } from 'antd';
import cookie from 'react-cookies';
import axios from 'axios';
import './style.css';

class SubjectRight extends Component {

  //ham phan cach 3 so co dau phay
  format_curency = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
    return x;
  }

  registerCourse = () => {
    if (this.checkAuth()) {
      let info = cookie.load("info");
      let { course } = this.props;
      let data = {
        studentId: info._id,
        studentName: info.name,
        courseId: course._id,
        courseName: course.name
      }

      axios({
        method: "POST",
        url: "https://fierce-oasis-19381.herokuapp.com/users/registerCourse",
        data
      })
        .then((res) => {
          message.success("Đăng ký khóa học thành công");
          console.log(res.data);
        })
        .catch((err) => {
          message.success("Bạn đã không được đăng ký khóa học này");
          console.log(err);
        })
    }
  }

  checkCourseValid = () => {
    let courses = cookie.load("courses") || [];
    let { course } = this.props;
    let check = false
    if (courses.length) {
      courses.forEach(element => {
        if (element.courseId === course._id) {
          check = true;
        }
      });
    }
    return check;
  }

  checkTeacherOrAdmin = () => {
    let info = cookie.load("info") || {};
    if (info) {
      if (info.permission === "teacher" || info.permission === "admin") {
        return true;
      } else {
        return false
      }
    }
    return false;
  }

  checkAuth = () => {
    if (!cookie.load("isAuth")) {
      message.info("Bạn cần phải đăng nhập để đăng ký khóa học");
      return false;
    }
    return true;
  }

  render() {
    let { course } = this.props;
    let validChecked = this.checkCourseValid();
    let roleChecked = this.checkTeacherOrAdmin();
    return (
      <div className='subject-right'>
        {course.tuition ? (
          <div className='subject-right-inner'>
            <div className="subject-right-name subject-right-element">
              <div>
                <div className="subject-right-title">
                  <Icon type="solution" />
                  <span>Lớp học</span>
                </div>
                <div className="subject-right-describe">
                  <span>{course.name}</span>
                </div>
              </div>
            </div>
            <div className="subject-right-subject subject-right-element">
              <div>
                <div className="subject-right-title">
                  <Icon type="read" />
                  <span>Môn</span>
                </div>
                <div className="subject-right-describe">
                  <span>{course.subject}</span>
                </div>
              </div>
            </div>
            <div className="subject-right-date subject-right-element">
              <div>
                <div className="subject-right-title">
                  <Icon type="calendar" />
                  <span>Thời gian học</span>
                </div>
                <div className="subject-right-describe">
                  <span>{course.studyTime.courseTime}</span>
                </div>
              </div>
            </div>
            <div className="subject-right-teacher subject-right-element">

            </div>
            <div className="subject-right-tuitition subject-right-element">
              <div>
                <div className="subject-right-title">
                  <Icon type="money-collect" />
                  <span>Học phí</span>
                </div>
                <div className="subject-right-describe">
                  <span>
                    <span className="subject-right-tuitition-fee">{this.format_curency(course.tuition)}</span>
                    <span> đồng</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : <Spin size="large" style={{ paddingLeft: "45%", paddingTop: "15px", paddingBottom: "15px" }} />}
        {!roleChecked ? (<Button className="subject-register" onClick={!validChecked ? () => this.registerCourse() : null}>
          {validChecked ? "Đã đăng ký" : "Đăng ký"}
        </Button>) : null}
      </div>
    );
  }
}

export default SubjectRight;