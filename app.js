const express = require('express')
const router = require('./routes')
const socketHandler = require('./socketHandler')

const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', (client) => socketHandler(client, io))

app.use('/', router)
http.listen(3001, () => console.log("listening on 3001"))

module.exports = app;
