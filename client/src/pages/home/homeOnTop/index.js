import React, { Component } from 'react';
import { Icon, Carousel } from "antd";
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style.css';
import dataCourses from '../../../dataTest/courses.json';

class HomeOnTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      courses: []
    }
  }


  setDataCourse = (category) => {
    const mapData = dataCourses.filter((value) => {
      if (value.category[0] === category) {
        return value;
      }
    })
    this.setState({ category })
    this.setState({ courses: mapData })
  };

  getDataCourse = () => {
    let { courses } = this.state;
    let topic1, topic2, topic3, topic4;
    let Element1 = [], Element2 = [], Element3 = [], Element4 = [];

    //Get name Topic
    courses.forEach(element => {
      if (!topic1) {
        topic1 = element.topic;
      }
      else if (!topic2 && topic1 !== element.topic) {
        topic2 = element.topic;
      }
      else if (!topic3 && topic1 !== element.topic
        && topic2 !== element.topic) {
        topic3 = element.topic;
      }
      else if (!topic4 && topic1 !== element.topic
        && topic2 !== element.topic && topic3 !== element.topic) {
        topic4 = element.topic;
      }
    });

    //get List Topic
    courses.forEach(element => {
      if (element.topic === topic1) {
        Element1.push(element);
      }
      else if (element.topic === topic2) {
        Element2.push(element);
      }
      else if (element.topic === topic3) {
        Element3.push(element);
      }
      else if (element.topic === topic4) {
        Element4.push(element);
      }
    });

    //Get List topic
    return (
      <div className="home-courses-list">
        <div className="home-courses-topic1 topic-element">
          {topic1 ? (
            <>
              <div className="topic-title">
                <span>{topic1}</span>
              </div>
              <div className="topic-item">{Element1.map((value) => {
                return <Link>{value.subject}</Link>
              })}
              </div>
            </>) : null}
        </div>
        <div className="home-courses-topic2 topic-element">
          {topic2 ? (
            <>
              <div className="topic-title">
                <span>{topic2}</span>
              </div>
              <div className="topic-item">{Element2.map((value) => {
                return <Link>{value.subject}</Link>
              })}
              </div>
            </>) : null}
        </div>
        <div className="home-courses-topic3 topic-element">
          {topic3 ? (
            <>
              <div className="topic-title">
                <span>{topic3}</span>
              </div>
              <div className="topic-item">{Element3.map((value) => {
                return <Link>{value.subject}</Link>
              })}
              </div>
            </>) : null}
        </div>
        <div className="home-courses-topic4 topic-element">
          {topic4 ? (<>
            <div className="topic-title">
              <span>{topic4}</span>
            </div>
            <div className="topic-item">{Element4.map((value) => {
              return <Link>{value.subject}</Link>
            })}
            </div>
          </>) : null}
        </div>
      </div>
    )
  }

  render() {
    console.log(dataCourses);
    return (
      <div className="home-on-top">
        <div className="home-sider">
          <div className="home-sider-header ">
            <Icon type="menu" />
            <span>Danh Mục</span>
          </div>
          <div className="home-sider-menu">
            <li >
              <span>luyện thi vào lớp 10</span>
            </li>
            <li>
              <span>Luyện thi Trung học phổ thông</span>
            </li>
            <li onClick={() => this.setDataCourse("Học thêm lớp 10")}>
              <span>Học thêm lớp 10</span>
            </li>
            <li onClick={() => this.setDataCourse("Học thêm lớp 11")}>
              <span>Học thêm lớp 11</span>
            </li>
            <li>
              <span>Học thêm lớp 12</span>
            </li>
          </div>
        </div>
        <div className="home-courses">
          {!this.state.courses[0] ? (
            <div className="home-slider" >
              <Carousel autoplay dotPosition={"bottom"}>
                <div className="slider">
                  <img src="http://luyentienganh.edu.vn/wp-content/uploads/2018/10/tieu-chi-danh-gia-trung-tam-day-tieng-anh-tot.jpg" alt="anh hoc tap" />
                </div>
                <div className="slider">
                  <img src="http://diem10cong.edu.vn/image/catalog/trungtam/diem10-hinh8.png" alt="anh hoc tap" />
                </div>
                <div className="slider">
                  <img src="http://eduvietglobal.vn//public/media/images/du-hoc-my-chop-co-hoi-hoc-bong-thpt-len-den-50-cung-truong-maine-central-institute-01.jpg" alt="anh hoc tap" />
                </div>
              </Carousel>
            </div>
          ) : (
              <div className="home-courses-content">
                <div className="home-courses-title">
                  {this.state.category}
                </div>

                {this.getDataCourse()}
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default HomeOnTop;