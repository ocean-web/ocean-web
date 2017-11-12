const socketHandler = (client) => {
  client.on('location-changed', (data) => {
    console.log('location changed!')
    console.log(data)
  })
}

<<<<<<< HEAD
module.exports = socketHandler
=======
module.exports = socketHandler;
>>>>>>> 2d00c2a8cc1b1cd497e7c1c2fa7092c6c7630857
