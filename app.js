const express = require('express');
const router = require('./routes');

const app = express();
const http = require('http').createServer(app)

app.use('/', router)
http.listen(3001, () => console.log("listening on 3001"))

module.exports = app;
