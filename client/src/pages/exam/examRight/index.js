import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import ranks from '../../../dataTest/rank.json';

class ExamRight extends Component {

  mapData = () => {
    let mapRanks = ranks.sort(function (a, b) {
      return b.point - a.point;
    });
    let mapRanksDisplay = mapRanks.map((value, key) => {
      return (
        <div className="rank-element">
          <div className="rank-index">
            <span>{key + 1}</span>
          </div>
          <div className='rank-name'>
            <span>{value.name}</span>
          </div>
          <div className="rank-num-of-exam">
            <span>{value.number}</span>
          </div>
          <div className="rank-total-point">
            <span>{value.point}</span>
          </div>
          <div className="rank-detail">
            <Link>Chi tiết</Link>
          </div>
        </div>
      )
    });
    return mapRanksDisplay
  }

  render() {
    console.log(ranks);
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
              {this.mapData()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExamRight;