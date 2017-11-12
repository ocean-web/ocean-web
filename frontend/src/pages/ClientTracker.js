import React from 'react'
import MapView from './MapView'
import DetailView from './DetailView'

class ClientTracker extends React.Component {
  render() {
    return (
      <div>
        <MapView socket={this.props.socket}/>
        <DetailView socket={this.props.socket}/>
      </div>
    )
  }
}


export default ClientTracker
