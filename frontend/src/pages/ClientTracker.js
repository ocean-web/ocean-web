import React from 'react'
import MapView from './MapView'
import DetailView from './DetailView'
import io from 'socket.io-client'

class ClientTracker extends React.Component {

  constructor(props) {
    super(props)
    this.state = { activeView: 'MapView' }
  }

  handleMarkerClick(activeView) {
    this.setState({activeView})
  }

  componentDidMount(){
    this.props.socket.on('location-changed', () => console.log("location"))
  }

  render() {
    return (
      <div>
        {
          this.state.activeView === 'MapView' ?
            <MapView socket={this.props.socket} onMarkerClick={() => this.handleMarkerClick('DetailView')}/>
            :
            <DetailView socket={this.props.socket} onPageSwitch={() => this.handleMarkerClick('MapView')}/>
        }
      </div>
    )
  }
}


export default ClientTracker
