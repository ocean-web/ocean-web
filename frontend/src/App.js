import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import openSocket from 'socket.io-client'
import TrackedClient from './pages/TrackedClient'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.socket = openSocket(`http://${window.location.hostname}:3001`)
  }
  render() {
    return (
      <Route path='/trackedClient'>
        <TrackedClient socket={this.socket}/>
      </Route>
    );
  }
}

export default App;
