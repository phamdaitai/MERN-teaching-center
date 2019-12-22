import React, { Component } from 'react';
import SubjectLeft from './subjectLeft';
import SubjectRight from './subjectRight';
import SubjectBottom from './subjectBottom';
import axios from 'axios';
import './style.css';


class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {}
    }
  }

  getCourse = () => {
    axios({
      method: 'GET',
      url: `https://fierce-oasis-19381.herokuapp.com/courses/${this.props.match.params._id}`
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ course: res.data })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentWillMount() {
    this.getCourse();
  }

  render() {
    let { course } = this.state;
    return (
      <div className='subject'>
        <div className='subject-inner'>
          <div className='subject-above'>
            <SubjectLeft
              course={course}
            />
            <SubjectRight
              course={course}
            />
          </div>
          <SubjectBottom />
        </div>
      </div>
    );
  }
}

export default Subject;