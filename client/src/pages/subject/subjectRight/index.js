import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import courses from '../../../dataTest/courses.json';
import './style.css';
const course = courses[0];

class SubjectRight extends Component {

  //ham phan cach 3 so co dau phay
  format_curency = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
    return x;
  }

  render() {
    return (
      <div className='subject-right'>
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
                  <span className="subject-right-tuitition-fee">{this.format_curency(course.tuitition)}</span>
                  <span> đồng</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <Button className="subject-register">
          Đăng ký
        </Button>
      </div>
    );
  }
}

export default SubjectRight;