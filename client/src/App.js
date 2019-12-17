import React, { Component } from 'react';
import './App.css';
import Content from './components/content/index';
import Footer from './components/footer/index';
import Header from './components/header/index';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => {
        this.setState({ data: res.express })
        console.log(this.res.express);
      })
      .catch(err => {
        console.log(err)
      });
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    console.log(this.state.data);
    return (
      <Router>
        <div className="App">
          <Header />
          <Content />
          <Footer />
          {/* <p className="App-intro">{this.state.data}</p> */}
        </div>
      </Router>
    );
  }
}

export default App;