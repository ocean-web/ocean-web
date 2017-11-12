import React from 'react'

const options = [
    { value: 'one', label: 'buoy1'},
    { value: 'two', label: 'buoy2'},
    { value: 'three', label: 'ship'},
    { value: 'four', label: 'rig'},
];

class TrackedClient extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selected: false
    }
  }

  activateSocket(label){
    this.setState({selected: true})
    this.props.socket.emit('client-connected', label)
    setInterval(() =>
      navigator.geolocation.getCurrentPosition((position) => {
        this.props.socket.emit('location-changed', {
          client: label,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }, (err) => console.log(err)), 1000)
  }

  render(){
    const {selected} = this.state
    return(
      <div>
        <h3>Select a client</h3>
        {
          !selected &&
          options.map(option => (
            <button key={option.value}
                    onClick={() => this.activateSocket(option.label)}
            >{option.label}</button>
          ))
        }
      </div>
    )
  }
}

export default TrackedClient
