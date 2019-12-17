import React, { Component } from 'react';
import SubjectLeft from './subjectLeft';
import SubjectRight from './subjectRight';
import SubjectBottom from './subjectBottom';
import './style.css';


class Subject extends Component {
  render() {
    return (
      <div className='subject'>
        <div className='subject-inner'>
          <div className='subject-above'>
            <SubjectLeft />
            <SubjectRight />
          </div>
          <SubjectBottom />
        </div>
      </div>
    );
  }
}

export default Subject;