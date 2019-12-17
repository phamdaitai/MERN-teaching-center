import React, { Component } from 'react';
import { Radio, Icon, Modal } from 'antd';
import './style.css';
import 'antd/dist/antd.css';
import examDetail from '../../dataTest/examDetail.json';

class ExamDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerState: {},
      submitState: false,
      visibleModal: false
    }
  }


  getContentElement = (option, answer) => {
    let index = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let optionMap = option.map((val, key) => {
      return (
        <div className='exam-radio-element'>
          <div className='exam-radio-index'>
            <span>{index[key]} </span>
            <Radio value={key} disabled={this.state.submitState}>
            </Radio>
          </div>
          <div className={`exam-radio-value ${this.state.submitState ? (answer === key ? 'exam-correct-question' : '') : ''}`}>{val}</div>
        </div>
      )
    });
    return optionMap;
  }

  onChange = (e, id) => {
    let { answerState } = this.state
    answerState[id] = e.target.value;

    this.setState({
      answerState
    })
  }

  mapData = () => {
    let examMap = examDetail.content.map((val, key) => {
      return (
        <div className='exam-detail-element'>
          <div className='exam-detail-element-header'>
            <span>
              Câu {key + 1}
            </span>
          </div>
          <div className='exam-detail-element-question'>
            {val.question}
          </div>
          <div className='exam-detail-element-content'>
            <Radio.Group onChange={(e) => this.onChange(e, val.id)} >
              {this.getContentElement(val.option, val.answer)}
            </Radio.Group>
          </div>
        </div >
      )
    })
    return examMap;
  }

  getTime() {
    this.setState({
      countDownState: examDetail.time * 60
    })
  }

  componentDidMount() {
    this.getTime();
    this.countDown();
  }

  countDown = () => {
    let timeInterval = setInterval(() => {
      let { countDownState, submitState } = this.state;
      if (submitState) {
        clearInterval(timeInterval);
      }
      if (countDownState > 0 || countDownState === undefined) {
        let { countDownState } = this.state;
        countDownState--;
        this.setState({
          countDownState
        })
      }
      else {
        clearInterval(timeInterval);
        this.submitExam();
      }
    }, 1000);
  }

  displayClock = () => {
    let { countDownState } = this.state;
    let h, m, s;
    h = Math.floor(countDownState / 3600);
    m = Math.floor((countDownState - h * 3600) / 60);
    s = Math.floor(countDownState - (h * 3600 + m * 60));
    return (
      <div style={{ fontSize: '20px', fontWeight: '600' }}>
        <Icon type="clock-circle" />
        <span style={{ padding: '10px' }}>{h} : {m} : {s}</span>
      </div>
    )
  }

  confirmSubmit = () => {
    this.setState({
      visibleModal: true,
    });
    setTimeout(() => {
      this.setState({
        visibleModal: false,
      });
    }, 10000)
  };

  handleOk = e => {
    this.submitExam();
    this.setState({
      visibleModal: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visibleModal: false,
    });
  };

  showPoint(point) {
    Modal.success({
      content: `Điểm của bạn là: ${point} điểm, vui lòng kiểm tra lại đáp án`,
    });
  }

  submitExam = () => {
    this.setState({
      submitState: true
    })
    //data submit
    let { answerState } = this.state;
    let numberOfCorrect = 0;

    for (let key in answerState) {
      examDetail.content.forEach(val => {
        if (key === val.id) {
          if (answerState[`${key}`] === val.answer) {
            numberOfCorrect++;
          }
        }
      });
    }

    let point = (numberOfCorrect / examDetail.content.length) * 10;
    this.showPoint(point);
  }

  render() {
    return (
      <div className='exam-detail'>
        <div className="exam-detail-inner">
          <div className="exam-detail-header">
            <span>Bài thi</span>
          </div>
          <div className="exam-detail-body">
            {this.mapData()}
            <div className="exam-detail-bottom">
              <div className='exam-detail-submit' onClick={!this.state.submitState ? () => this.confirmSubmit() : null}>
                <div>
                  Nộp bài
                <Icon type="right" />
                </div>
              </div>
              <Modal
                // title="Basic Modal"
                visible={this.state.visibleModal}
                onOk={this.handleOk}
                okText="Đồng ý"
                onCancel={this.handleCancel}
                cancelText="Quay lại"
                width={320}
                closable={false}
              >
                <p style={{ fontSize: '18px' }}>Bạn có chắc chắn muốn nộp bài</p>
              </Modal>
              <div className='exam-detail-time'>
                {this.displayClock()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExamDetail;