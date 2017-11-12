import React from 'react'

const options = [
    { value: 'one', label: 'Buoy 1'},
    { value: 'two', label: 'Buoy 2'},
    { value: 'three', label: 'Ship'},
    { value: 'four', label: 'Rig'},
];

class TrackedClient extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selected: false
    }
  }
  componentDidMount(){
    this.props.socket.emit('location-changed', "Works!")
  }

  activateSocket(label){
    this.setState({selected: true})
    this.props.socket.emit('client-connected', label)
    setInterval(() =>
      navigator.geolocation.getCurrentPosition((position) => {
        debugger
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
