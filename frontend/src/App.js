import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import TrackedClient from './pages/TrackedClient'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Route path='/trackedClient'>
        <TrackedClient/>
      </Route>
    );
  }
}

export default App;
