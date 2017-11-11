const socketHandler = (client) => {
  client.on('location-changed', (data) => {
    console.log('location changed!')
  })
}
