import React from 'react'
import MapView from './MapView'
import DetailView from './DetailView'

class ClientTracker extends React.Component {

  constructor(props) {
    super(props)
    this.state = { activeView: 'MapView' }
  }

  handleMarkerClick() {
    this.setState({activeView: 'DetailView'})
  }

  render() {
    return (
      <div>
        {
          this.state.activeView === 'MapView' ?
            <MapView socket={this.props.socket} onMarkerClick={() => this.handleMarkerClick()}/> 
            :
            <DetailView socket={this.props.socket}/>
        }
      </div>
    )
  }
}


export default ClientTracker
