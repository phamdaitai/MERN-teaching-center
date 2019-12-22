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
        <Route path='/exam/:slug.:_id.html' component={Exam} exact />
        <Route path='/exam-detail/:slug.:courseName.:_id.:courseId.html' component={ExamDetail} exact />
        <Route path='/personal' component={Personal} />
        <Route path='/document-manager' component={DocumentManager} />
        <Route path="/exam-manager" component={ExamManager} />
        <Route path='/subject/:slug.:_id.html' component={Subject} />
        <Route path="/" component={Home} />
        <Route path="*" component={<div>Not Found</div>} />
      </Switch>
    );
  }
}

export default Routes;