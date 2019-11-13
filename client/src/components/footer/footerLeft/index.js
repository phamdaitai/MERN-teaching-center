import React, { Component } from 'react';
import './style.css';

class FooterLeft extends Component {
  render() {
    return (
      <div className="footer-left footer-block">
        <div className="footer-left-title footer-title">
          <img alt="logo" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwcHBwcHBwcHBwcHBwoHBwcHBw8ICQcWIBEiIiARExMYHSggGBolGx8fITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBKwMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAABv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJQBNpEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=" />
          <span>Trung tâm dạy học abc</span>
        </div>
        <div className="footer-left-content footer-block-content">
          <span>Địa chỉ: Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</span>
          <span>Văn Phòng: Số 10, Tạ Quang Bửu, Hai Bà Trưng, Hà Nội</span>
          <span>Điện thoại: 0123456789</span>
          <span>Email:trungtamdayhoc@gmail.com</span>
          <span>giấy phép: Số 36 thông tin truyền thông</span>
          <span>Copyright @2019 trungtamdayhoc.edu.vn, offline center</span>
        </div>
      </div>
    );
  }
}

export default FooterLeft;