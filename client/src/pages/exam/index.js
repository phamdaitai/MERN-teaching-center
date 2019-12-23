import React, { Component } from 'react';
import axios from 'axios';
import ExamLeft from './examLeft/index';
import ExamRight from './examRight/index';
import cookie from 'react-cookies';
import { message } from 'antd';
import './style.css';

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {}
    }
  }

  getExamOfCourse = () => {
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
    this.getExamOfCourse();
  }

  checkAuth = () => {
    if (!cookie.load("isAuth")) {
      message.info("Bạn đã đăng xuất, không thể xem tiếp");
      this.props.history.push('/');
    }
  }

  render() {
    this.checkAuth();
    let { course } = this.state;
    return (
      <div className="exam">
        <div className="exam-inner">
          <ExamLeft
            exams={course.exams}
            courseId={this.props.match.params._id}
            courseName={course.name}
          />
          <ExamRight
            resultExams={course.resultExams}
          />
        </div>
      </div>
    );
  }
}

export default Exam;