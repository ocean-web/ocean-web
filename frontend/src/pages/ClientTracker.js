import React from 'react'
import MapView from './MapView'
import DetailView from './DetailView'
import io from 'socket.io-client'

class ClientTracker extends React.Component {

  constructor(props) {
    super(props)
    this.state = { activeView: 'MapView', markers: [] }
  }

  handleMarkerClick(activeView) {
    this.setState({activeView})
  }

  componentDidMount(){
    this.props.socket.on('location-changed', (data) => {
      this.setState({refresh: true})
      setTimeout(() => this.setState({refresh: false}), 50)
        this.setState(prevState => {
          const index = prevState.markers.findIndex(marker => marker.client === data.client)
          if(index !== -1){
            prevState.markers[index] = data
          }
          else{
            prevState.markers.push(data)
          }
          return {markers: prevState.markers}
        })
      })
    }

  render() {
    return (
      <div>
        {
          !this.state.refresh &&
          this.state.activeView === 'MapView' ?
            <MapView socket={this.props.socket} markers={this.state.markers} onMarkerClick={() => this.handleMarkerClick('DetailView')}/>
            :
            <DetailView socket={this.props.socket} onPageSwitch={() => this.handleMarkerClick('MapView')}/>
        }
      </div>
    )
  }
}


export default ClientTracker
