import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import openSocket from 'socket.io-client'
import TrackedClient from './pages/TrackedClient'
import ClientTracker from './pages/ClientTracker'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.socket = openSocket(`http://${window.location.hostname}:3001`)
  }
  render() {
    return (
      <Switch>
        <Route path='/trackedClient'>
          <TrackedClient socket={this.socket}/>
        </Route>
        <Route path='/clientTracker'>
          <ClientTracker socket={this.socket}/>
        </Route>
      </Switch>
    );
  }
}

export default App;
