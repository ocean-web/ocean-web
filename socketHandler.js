const socketHandler = (client, io) => {
  client.on('location-changed', (data) => {
    io.emit('location-changed', data)
    console.log(data)
  })
}

module.exports = socketHandler
