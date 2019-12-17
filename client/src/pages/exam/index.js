import React, { Component } from 'react';
import ExamLeft from './examLeft/index';
import ExamRight from './examRight/index';
import './style.css';

class Exam extends Component {
  render() {
    return (
      <div className="exam">
        <div className="exam-inner">
          <ExamLeft />
          <ExamRight />
        </div>
      </div>
    );
  }
}

export default Exam;