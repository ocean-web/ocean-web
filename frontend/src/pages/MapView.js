import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// import express from 'express'
import {io, socket} from "socket.io-client"
// import { Server } from 'http'


const buoy1 = {lat:47.350750, lng:-53.113506, image: "images/buoy.png"};
const buoy2 = {lat:47.350881, lng:-53.113446, image: "images/buoy.png"};
const ship  = {lat:47.351112, lng:-53.113617, image: "images/ship.png", clickable: true};
const rig   = {lat:47.350801, lng:-53.113142, image: "images/rig.png"};

// const loadClients = () => {	//
// 	// const socket = ;
// 	// io.on('connection', )

// }
// const app = express()
// const server = Server(app)
// const io = socket(server)
// io.on('connection', (socket) => {
// 	console.log('a user connected')
// })


const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCysVxJ3Ciav_vaMFbTFY0FEDvuUBN9wys&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat:47.3510723, lng:-53.11258 }}
    mapTypeId={'satellite'}
  >
    {props.markers.map((marker, index)=> {
      return (
        <Marker
	      key={index}
          position={marker}
          title="Click to zoom"
          onClick={marker.clickable ? () => props.onMarkerClick() : () => {}}
          icon={marker.image}
        />
      )
    })}
  </GoogleMap>
);

class MapView extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  sendMessage = message => {
  	socket.emit('', message)
  }

  componentDidMount() {
    this.delayedShowMarker()
    // socket.on('connection', () => {
    // 	// this.setState({data})
    // 	console.log("testing connection")
    // })
    // loadClients()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  // handleMarkerClick = () => {
  //   // this.setState({ isMarkerShown: false })
  //   this.delayedShowMarker()
  //
  // }

  render() {
    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={() => this.props.onMarkerClick()}
        markers={this.props.markers}
      />
    )
  }
}

export default MapView
