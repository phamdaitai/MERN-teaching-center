import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home/index';
import Subject from '../pages/subject/index';
import Exam from '../pages/exam/index';
import ExamDetail from '../pages/examDetail/index';
import Personal from '../pages/personal/index';
import DocumentManager from '../cmsPage/document/index';
import CourseMananger from '../cmsPage/course/index';
import ExamManager from '../cmsPage/exam/index';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path='/course-manager' component={CourseMananger} />
        <Route path='/exam' component={Exam} />
        <Route path='/exam-detail' component={ExamDetail} />
        <Route path='/personal' component={Personal} />
        <Route path='/document-manager' component={DocumentManager} />
        <Route path="/exam-manager" component={ExamManager} />
        <Route path='/subject/:slug.:id.html' component={Subject} />
        <Route path="/" component={Home} />
      </Switch>
    );
  }
}

export default Routes;