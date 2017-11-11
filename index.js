const express = require('express')
const router = require('./routes')

const app = express()
const http = require('http').Server(app)

app.use('/', router)

http.listen(3000, () => console.log('listening on port 3000'))
