import React, { Component } from 'react';
import './style.css';
import { Input, Button, Spin } from 'antd';
const { TextArea } = Input;

class SubjectLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderState: 1
    }
  }

  getRender = () => {
    let { course } = this.props;
    switch (this.state.renderState) {
      case 1:
        return (
          <div className="subject-describe">
            {course.description ? (
              <div className="subject-describe-inner">
                <div className="subject-describe-title">
                  <span>Mô tả khóa học</span>
                </div>
                <div className="subject-describe-content">
                  <p>
                    {course.description}
                  </p>
                </div>
              </div>
            ) : <Spin size="large" style={{ paddingLeft: "45%", paddingTop: "15px", paddingBottom: "15px" }} />}
          </div>
        );
      case 2:
        return (
          <div className="subject-notice">
            {course.description ? (
              <div className="subject-notice-inner">
                Không có thông báo nào
            </div>) : <Spin size="large" style={{ paddingLeft: "45%", paddingTop: "15px", paddingBottom: "15px" }} />}
          </div>
        );
      case 3:
        return (
          <div className="subject-comment">
            {course.description ? (
              <div className="subject-comment-inner">
                <div className="subject-comment-input">
                  <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
                  <Button>Bình luận</Button>
                </div>
              </div>
            ) : <Spin size="large" style={{ paddingLeft: "45%", paddingTop: "15px", paddingBottom: "15px" }} />}
          </div>
        );
      default: return null;
    }
  }

  render() {
    let { course } = this.props;
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