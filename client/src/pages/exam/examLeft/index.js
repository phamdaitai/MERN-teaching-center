import React, { Component } from 'react';
import { Icon, Button, Modal, Form, Input, message, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { validateInputNumber } from '../../../actions/index';
import axios from 'axios';
import cookie from 'react-cookies';
import InputItem from './iputItem/index';
import { convertURL } from '../../../actions/index';
import './style.css';
class ExamLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleAddExam: false,
      keys: [],
      loadingRequestState: false,
      permissionCheck: false,
      examsOfStudent: []
    }
  }

  componentWillMount() {
    let userInfo = cookie.load("info") || {};
    let permissionCheck = (userInfo.permission === "student");
    this.setState({
      permissionCheck,
      examsOfStudent: cookie.load("exams") || []
    })
  }

  checkExamDoneValid = (examId) => {
    let { permissionCheck } = this.state;
    let { examsOfStudent } = this.state;
    let validCheck = true;
    if (permissionCheck) {
      examsOfStudent.forEach((element) => {
        if (element.examId === examId) {
          validCheck = false;
        }
      })
    } else {
      return false;
    }
    return validCheck;
  }

  noticeUnable = () => {
    message.warning("Bạn không thể làm bài thi này, kiểm tra bảng xếp hạng!!!");
  }

  mapData = (exams) => {
    let dataMap = exams.map((value, key) => {
      let checked = this.checkExamDoneValid(value.examId);
      return (
        <div className="exam-element">
          <span>{value.examName}</span>
          <Button type="primary">
            <Link to={checked ? "/exam-detail/" + convertURL(value.examName) + "." + convertURL(this.props.courseName) + "." + value.examId +
              "." + this.props.courseId + ".html" : null} onClick={!checked ? () => this.noticeUnable() : null}>Vào thi</Link>
          </Button>
        </div >
      )
    });
    return dataMap;
  }

  showAdd = () => {
    this.setState({
      visibleAddExam: true,
    });
  };

  handleOkAdd = e => {
    console.log(e);
    this.setState({
      visibleAddExam: false,
    });
  };

  handleCancelAdd = e => {
    this.setState({
      visibleAddExam: false,
    });
  };

  submitNewExam = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { dataState, numItem } = this.state;
        if (dataState !== undefined) {
          let valueData = [];
          for (let numKey of numItem) {
            let value = { question: '', option: [] };
            for (let k in dataState) {
              if (k.indexOf(`item${numKey}`) !== -1) {
                if (k === `item${numKey}input`) {
                  value.question = dataState[k];
                }
                else if (k === `item${numKey}radio`) {
                  value.answer = dataState[k];
                }
                else if (k.indexOf(`item${numKey}textArea`) !== -1) {
                  if (dataState[k] !== '') {
                    value.option.push(dataState[k])
                  };
                }
              }
            }
            if (value.option.length !== 0 || value.question !== '' || value.answer !== null) {
              valueData.push(value);
            }
          }
          // console.log(valueData)
          values['content'] = valueData;
        }
        values.courseId = parseInt(this.props.courseId);
        console.log(values);
        axios({
          method: 'POST',
          url: "https://fierce-oasis-19381.herokuapp.com/tests",
          data: values
        })
          .then((res) => {
            console.log(res.data);
            this.setState({ loadingRequestState: false });
            message.success("Thêm bài thi thành công!");
          })
          .catch((err) => {
            console.log(err);
            this.setState({ loadingRequestState: false });
            message.error("Thêm bài thi không thành công!");
          })
      }
    });
  }

  removeText = (item) => {
    let { dataState } = this.state;
    let tempData = {};

    for (let key in dataState) {
      if (key !== item.name) {
        tempData[key] = dataState[key];
      }
    }
    this.setState({
      dataState: tempData
    });
  }

  removeItem = (item) => {
    let { numItem, dataState } = this.state;
    numItem = numItem.filter(val => val !== item.key);
    dataState[item.name] = undefined;

    let temData = {};
    for (let k in dataState) {
      if (dataState[k]) {
        temData[k] = dataState[k];
      }
    }
    this.setState({
      numItem: numItem,
      dataState: temData
    })
  }

  initItemForm = (item) => {
    this.setState({
      dataState: item.dataState,
      numItem: item.numItem
    })
  }

  getItemForm = (item) => {
    let { dataState } = this.state;
    if (dataState === undefined) {
      let dataState = {};
      dataState[item.name] = item.value;
      this.setState({
        dataState,
        numItem: item.numItem
      })
    }
    else {
      dataState[item.name] = item.value;
      this.setState({
        dataState,
        numItem: item.numItem
      })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    let { valueProps = {}, exams } = this.props;
    let { loadingRequestState } = this.state;
    const loadingIcon = <Icon type="loading" style={{ fontSize: 60 }} spin />;
    // console.log('DATA STATE', this.state.dataState);
    return (
      <div className="exam-left">
        <div className="exam-left-inner">
          <div className="exam-left-header">
            <Icon type="menu" />
            <span>Các bài thi</span>
          </div>
          <div className="exam-left-body">
            <Link to className='exam-add-button'>
              <Button type="primary" onClick={this.showAdd}>
                <Icon type="file-add" /> Thêm bài thi
              </Button>
            </Link>
            <Modal
              title="Thêm bài thi"
              visible={this.state.visibleAddExam}
              onOk={this.handleOkAdd}
              okText='Thêm'
              onCancel={this.handleCancelAdd}
              cancelText='Hủy'
              width={800}
              footer={false}
              className="modal-add-exam"
            >
              <Form {...formItemLayout} onSubmit={this.submitNewExam}>
                <Form.Item label="Tên bài thi">
                  {getFieldDecorator('testName', {
                    rules: [{ required: true, message: 'Vui lòng nhập tên bài thi!' }],
                  })(
                    <Input
                      placeholder="Nhập tên bài thi..."
                    />,
                  )}
                </Form.Item>
                <Form.Item label="Thời gian thi (phút)">
                  {getFieldDecorator('time', {
                    rules: [{ required: true, message: 'Vui lòng nhập vào thời gian thi!' },
                    { validator: validateInputNumber }],
                  })(
                    <Input
                      placeholder="Nhập tên số phút..."
                    />,
                  )}
                </Form.Item>
                <Form.Item label={`Nhập câu hỏi`} key="content">
                  {getFieldDecorator(`content`, {
                    initialValue: `${[]}`,
                  })(
                    <InputItem
                      valueProps={valueProps}
                      getItemForm={(values) => this.getItemForm(values)}
                      values={this.state.values}
                      removeItem={this.removeItem}
                      removeText={this.removeText}
                      initItemForm={this.initItemForm}
                    />)}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="add-exam-form-button"
                    onClick={() => this.setState({ loadingRequestState: true })}>
                    Thêm
                  </Button>
                </Form.Item>
              </Form>
              {loadingRequestState ? (<Spin indicator={loadingIcon} className='add-exam-loading-request' />) : null}
            </Modal>
            {exams ? this.mapData(exams) : <Spin size="large" className='show-exam-left-loading' />}
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create({})(ExamLeft);