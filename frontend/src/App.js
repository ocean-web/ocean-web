import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
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
          <ClientTracker/>
        </Route>
      </Switch>
    );
  }
}

export default App;
