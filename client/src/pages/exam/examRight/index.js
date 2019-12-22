import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Spin, Modal } from 'antd';
import axios from 'axios';
import './style.css';

class ExamRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultExams: []
    }
  }

  info = (value) => {
    Modal.info({
      title: `Điểm thi của ${value.studentName}`,
      content: (
        <div className="exam-detail-info">
          {value.exam.map((value, key) => (
            <div className="exam-detail-info-element">
              <div className="exam-detail-info-element-left">
                {value.examName}
              </div>
              <div className="exam-detail-info-element-right">
                <span>{value.point}</span>
                <span> điểm</span>
              </div>
            </div>
          ))}
          <div className="exam-detail-info-element">
            <div className="exam-detail-info-element-left">
              Tổng điểm
              </div>
            <div className="exam-detail-info-element-right">
              {value.exam.length > 1 ? <span>{value.exam.reduce(function (total, currentValue) {
                return total + currentValue.point;
              }, 0)}</span> : <span>{value.exam[0].point}</span>}
              <span> điểm</span>
            </div>
          </div>
        </div>
      ),
      onOk() { },
    });
  }

  mapData = (resultExams) => {
    let mapRanks = resultExams.sort(function (a, b) {
      let a_total = a.exam.length > 1 ? a.exam.reduce(function (total, currentValue) {
        return total + currentValue.point;
      }, 0) : a.exam[0].point;
      let b_total = b.exam.length > 1 ? b.exam.reduce(function (total, currentValue) {
        return total + currentValue.point;
      }, 0) : b.exam[0].point;
      console.log(a_total + '---' + b_total);
      return b_total - a_total;
    });
    let mapRanksDisplay = mapRanks.map((value, key) => {
      return (
        <div className="rank-element">
          <div className="rank-index">
            <span>{key + 1}</span>
          </div>
          <div className='rank-name'>
            <span>{value.studentName}</span>
          </div>
          <div className="rank-num-of-exam">
            <span>{value.exam.length}</span>
          </div>
          <div className="rank-total-point">
            {value.exam.length > 1 ? <span>{value.exam.reduce(function (total, currentValue) {
              return total + currentValue.point;
            }, 0)}</span> : value.exam[0].point}
          </div>
          <div className="rank-detail">
            <Link onClick={() => this.info(value)}>Chi tiết</Link>
          </div>
        </div>
      )
    });
    return mapRanksDisplay
  }

  render() {
    let { resultExams } = this.props;
    return (
      <div className='exam-right'>
        <div className='exam-right-inner'>
          <div className='exam-right-header'>
            <span>Bảng xếp hạng</span>
          </div>

          <div className='exam-right-body'>
            <div className="rank-header">
              <div className="rank-index">
                <span>Hạng</span>
              </div>
              <div className='rank-name'>
                <span>Tên học sinh</span>
              </div>
              <div className="rank-num-of-exam">
                <span>Số bài thi</span>
              </div>
              <div className="rank-total-point">
                <span>Điểm</span>
              </div>
              <div className="rank-detail">
                <span>Xem chi tiết</span>
              </div>
            </div>
            <div className="rank-body">
              {resultExams ? this.mapData(resultExams) : <Spin size="large" className='show-exam-right-loading' />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExamRight;