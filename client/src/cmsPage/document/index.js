import React, { Component } from 'react';
import { Icon, Button, Select, Input, Modal, Radio } from 'antd';
import './style.css';
const { Option } = Select;
const { Search } = Input;
const { TextArea } = Input;

class DocumentManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleAddDocument: false,
      addGradeState: "9",
      addSubjectState: 'Toán'
    };
  }

  showAdd = () => {
    this.setState({
      visibleAddDocument: true,
    });
  };

  handleOkAdd = e => {
    console.log(e);
    this.setState({
      visibleAddDocument: false,
    });
  };

  handleCancelAdd = e => {
    console.log(e);
    this.setState({
      visibleAddDocument: false,
    });
  };

  onChangeSelect = () => {

  }

  onChangeRadio = (e, name) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className='document-manager'>
        <div className='document-manager-inner'>
          <div className='document-manager-header'>
            <span>Tài liệu khóa học</span>
            <Button type="primary" onClick={this.showAdd}>
              <Icon type="file-add" /> Thêm tài liệu
              </Button>
            <Modal
              title="Thêm tài liệu mới"
              visible={this.state.visibleAddDocument}
              onOk={this.handleOkAdd}
              okText='Thêm'
              onCancel={this.handleCancelAdd}
              cancelText='Hủy'
              minWidth={300}
            >
              <Input placeholder="Tiêu đề tài liệu..."
                className='document-manager-add-element' />
              <TextArea placeholder="Thêm mô tả tài liệu..." autoSize={{ minRows: 2, maxRows: 6 }}
                className='document-manager-add-element' />
              <div className="document-manager-add-element">
                <span>Chọn lớp</span>
                <Radio.Group onChange={(e) => this.onChangeRadio(e, 'addGradeState')}
                  value={this.state.addGradeState}>
                  <Radio value="9">9</Radio>
                  <Radio value="10">10</Radio>
                  <Radio value="11">11</Radio>
                  <Radio value="12">12</Radio>
                  <Radio value="13">Ôn thi THPT</Radio>
                </Radio.Group>
              </div>
              <div className="document-manager-add-element">
                <span>Chọn môn</span>
                <Radio.Group onChange={(e) => this.onChangeRadio(e, 'addSubjectState')}
                  value={this.state.addSubjectState}>
                  <Radio value="Toán">Toán</Radio>
                  <Radio value="Lý">Lý</Radio>
                  <Radio value="Hóa">Hóa</Radio>
                  <Radio value="Sinh">Sinh</Radio>
                  <Radio value="Anh">Anh</Radio>
                </Radio.Group>
              </div>
            </Modal>
          </div>
          <div className='document-manager-filter'>
            <Select defaultValue="Chọn lớp" style={{ minWidth: 120 }} onChange={this.onChangeSelect}>
              <Option value="9">9</Option>
              <Option value="10">10</Option>
              <Option value="11" >11</Option>
              <Option value="12">12</Option>
              <Option value="13">Ôn thi lại</Option>
            </Select>
            <Select defaultValue="Chọn môn học" style={{ minWidth: 120 }} onChange={this.onChangeSelect}>
              <Option value="Toán">Toán</Option>
              <Option value="Lý">Lý</Option>
              <Option value="Hóa">Hóa</Option>
              <Option value="Sinh">Sinh</Option>
              <Option value="Anh">Anh</Option>
            </Select>
            <Search placeholder="Tìm kiếm đề thi" onSearch={value => console.log(value)}
              enterButton style={{ minWidth: 220 }} />
            <br />
          </div>
          <div className='document-manager-body'>

          </div>
        </div>
      </div>
    );
  }
}

export default DocumentManager;