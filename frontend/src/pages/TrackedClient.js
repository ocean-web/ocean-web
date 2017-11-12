import React from 'react'
import Select from 'react-select'

const options = [
    { value: 'one', label: 'Buoy 1'},
    { value: 'two', label: 'Buoy 2'},
    { value: 'three', label: 'Ship'},
    { value: 'four', label: 'Rig'},
];

function logChange(val) {
  console.log('Selected: ' + val);
}

class TrackedClient extends React.Component{
  componentDidMount(){
    this.props.socket.emit('location-changed', "Works!")
  }
<<<<<<< HEAD
  render(){
    return(
      <div>Hello World</div>
=======

  render(){
    return(
      <div>
        <h3>Select a client</h3>
        <Select
          name="select-client"
          value="one"
          options={options}
          onChange={logChange}
        />
      </div>
>>>>>>> 2d00c2a8cc1b1cd497e7c1c2fa7092c6c7630857
    )
  }
}

export default TrackedClient
