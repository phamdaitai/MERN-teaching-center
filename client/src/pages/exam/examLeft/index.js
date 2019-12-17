import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';
import exams from "../../../dataTest/exam.json";

class ExamLeft extends Component {
  mapData = () => {
    let dataMap = exams.map((value, key) => {
      return (
        <div className="exam-element">
          <span>{value.name}</span>
          <Button type="primary">
            <Link to='exam-detail'>Vào thi</Link>
          </Button>
        </div>
      )
    });
    return dataMap;
  }

  render() {
    return (
      <div className="exam-left">
        <div className="exam-left-inner">
          <div className="exam-left-header">
            <Icon type="menu" />
            <span>Các bài thi</span>
          </div>
          <div className="exam-left-body">
            {this.mapData()}
          </div>
        </div>
      </div>
    );
  }
}

export default ExamLeft;