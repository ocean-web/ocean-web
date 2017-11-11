const socketHandler = (client) => {
  client.on('location-changed', (data) => {
    console.log('location changed!')
    console.log(data)
  })
}

module.exports = socketHandler
