import React from 'react'

class TrackedClient extends React.Component{
  componentDidMount(){
    this.props.socket.emit('location-changed', "Works!")
  }
  render(){
    return(
      <div>Hello World</div>
    )
  }
}

export default TrackedClient
