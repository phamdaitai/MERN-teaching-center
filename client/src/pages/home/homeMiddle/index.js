import React, { Component } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { convertURL } from '../../../actions/index';
import './style.css';
import data from '../../../dataTest/courses.json';
const noOfItems = 12;
const noOfCards = 4;
const autoPlayDelay = 5000;

class HomeMiddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
      dataCourses: []
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, autoPlayDelay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }



  tick = () => this.setState(prevState => ({
    activeItemIndex: (prevState.activeItemIndex + 1) % (noOfItems - noOfCards + 1),
  }));

  getCourses = () => {
    let datamap = data.map((value, key) => {
      return (
        <Link className="home-middle-course-element" to={"/subject/" + convertURL(value.name) + "." + value.courseId + ".html"}>
          <div className="home-middle-course-image">
            <div style={{ backgroundImage: 'url(https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-9/s960x960/39935696_1108507199297679_8608710148908646400_o.jpg?_nc_cat=105&_nc_ohc=XRGwH5Giy_cAQkf_mvQA7XzwMg3DcFxTibUsAYNbDKc7VOhqMIdSSy_IA&_nc_ht=scontent.fhan2-4.fna&oh=4716e085757d2288cc29c09a6806cce1&oe=5E8B474E)' }} >
              <div className="home-middle-tag-name">
                <span>GV: </span>
                <span>Nguyễn Chí Thanh</span>
              </div>
            </div>
          </div>
          <div className="home-middle-course-detail">
            <p className="home-middle-course-title">{value.name + " môn " + value.subject}</p>
            <p>Học phí: <span>{value.tuitition}</span> đồng</p>
            <p>Thời gian học: <span>{value.schedule}</span></p>
            <p>Thời gian khóa học: <span>{value.studyTime.courseTime}</span></p>
            <p>Thời gian buổi học: <span>{value.studyTime.lessonTime}</span></p>
            <p className="home-middle-subject"><Icon type="book" /> Môn: <span>{value.subject}</span></p>
          </div>
        </Link>
      )
    })
    return datamap;
  }

  render() {
    return (
      <div className="home-middle">
        <div className="home-middle-title">
          <span>Khóa học nổi bật</span>
        </div>
        <div className="home-middle-content">
          <div className="home-middle-content-inner">
            <div className="home-middle-carouse">
              <ItemsCarousel
                gutter={12}
                slidesToScroll={1}
                numberOfCards={noOfCards}
                activeItemIndex={this.state.activeItemIndex}
                requestToChangeActive={value => this.setState({ activeItemIndex: value })}
                rightChevron={
                  <Button shape="circle">
                    <Icon type="right" />
                  </Button>
                }
                leftChevron={
                  <Button shape="circle">
                    <Icon type="left" />
                  </Button>
                }
              >
                {this.getCourses()}
              </ItemsCarousel>
            </div>
            <div className="home-middle-carouse-respon">
              <ItemsCarousel
                gutter={12}
                slidesToScroll={1}
                numberOfCards={2}
                activeItemIndex={this.state.activeItemIndex}
                requestToChangeActive={value => this.setState({ activeItemIndex: value })}
                rightChevron={
                  <Button shape="circle">
                    <Icon type="right" />
                  </Button>
                }
                leftChevron={
                  <Button shape="circle">
                    <Icon type="left" />
                  </Button>
                }
              >
                {this.getCourses()}
              </ItemsCarousel>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeMiddle;