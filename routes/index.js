const express = require('express');
const path = require('path')

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("http://localhost:3000")
});

module.exports = router;
