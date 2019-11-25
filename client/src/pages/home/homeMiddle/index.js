import React, { Component } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Button, Icon } from 'antd';
import './style.css';

const noOfItems = 12;
const noOfCards = 5;
const autoPlayDelay = 2000;

class HomeMiddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0
    }
  }

  state = {
    activeItemIndex: 0,
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, autoPlayDelay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => this.setState(prevState => ({
    activeItemIndex: (prevState.activeItemIndex + 1) % (noOfItems - noOfCards + 1),
  }));

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
                requestToChangeActive={this.onChange}
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
                <div>a</div>
                <div>b</div>
                <div>c</div>
                <div>d</div>
                <div>e</div>
                <div>f</div>
                <div>c</div>
                <div>d</div>
                <div>e</div>
                <div>f</div>
              </ItemsCarousel>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeMiddle;