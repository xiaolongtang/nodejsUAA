var express = require('express');
var auth = require('./auth.js');
var path = require('path');
var router = express.Router();
var app = express();

router.get('/', function(req, res, next) {
  res.json(auth.user);
});

module.exports = router;