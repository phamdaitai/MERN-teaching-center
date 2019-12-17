import React, { Component } from 'react';
import './style.css';
import { Input, Button } from 'antd';
import courses from '../../../dataTest/courses.json';
const course = courses[0];
const { TextArea } = Input;

class SubjectLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderState: 1
    }
  }

  getRender = () => {
    switch (this.state.renderState) {
      case 1:
        return (
          <div className="subject-describe">
            <div className="subject-describe-inner">
              <div className="subject-describe-title">
                <span>Mô tả khóa học</span>
              </div>
              <div className="subject-describe-content">
                <p>
                  {course.describe}
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="subject-notice">
            <div className="subject-notice-inner">
              Không có thông báo nào
            </div>
          </div>
        );
      case 3:
        return (
          <div className="subject-comment">
            <div className="subject-comment-inner">
              <div className="subject-comment-input">
                <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
                <Button>Bình luận</Button>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className='subject-left'>
        <div className='subject-header'>
          <div className='subject-title-name'>
            <span>{course.topic}</span>
          </div>
          <div className='subject-nav'>
            <div className='subject-nav-element' onClick={() => this.setState({ renderState: 1 })}>
              <span>Nội dung khóa học</span>
            </div>
            <div className='subject-nav-element' onClick={() => this.setState({ renderState: 2 })}>
              <span>Thông báo khóa học</span>
            </div>
            <div className='subject-nav-element' onClick={() => this.setState({ renderState: 3 })}>
              <span>Bình luận</span>
            </div>
          </div>
        </div>
        {this.getRender()}
      </div>
    );
  }
}

export default SubjectLeft;