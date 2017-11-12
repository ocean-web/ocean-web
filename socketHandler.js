const socketHandler = (client, io) => {
  client.on('location-changed', (data) => {
    io.emit('location-changed', {...data,...clientIcons[data.client]})
    console.log(data)
  })
}

const clientIcons = {
  "buoy1": "images/buoy.png",
  "buoy2": "images/buoy.png",
  "rig": "images/rig.png",
  "ship": "images/ship.png"
}

module.exports = socketHandler
