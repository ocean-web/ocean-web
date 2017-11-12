import React from 'react'
import MapView from './MapView'
import DetailView from './DetailView'

class ClientTracker extends React.Component {

  constructor(props) {
    super(props)
    this.state = { activeView: 'MapView' }
  }

  handleMarkerClick(activeView) {
    this.setState({activeView})
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
