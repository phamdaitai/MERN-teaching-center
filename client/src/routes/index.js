import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home/index';
import Subject from '../pages/subject/index';
import Exam from '../pages/exam/index';
import ExamDetail from '../pages/examDetail/index';
import DocumentManager from '../cmsPage/document/index';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path='/subject' component={Subject} />
        <Route path='/exam' component={Exam} />
        <Route path='/exam-detail' component={ExamDetail} />
        <Route path='/document-manager' component={DocumentManager} />
        <Route path="/" component={Home} />
      </Switch>
    );
  }
}

export default Routes;