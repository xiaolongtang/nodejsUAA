// var express = require('express');
// var router = express.Router();

// /* GET index page. */

// router.use(function(req,res,next){
//   // console.log('index.html from router - index.js');
//   next();
// });

// router.get('/', function(req, res, next) {
//   res.sendFile('index.html');
// });

// module.exports = router;

var express = require('express');
var auth = require('./auth.js');
var path = require('path');
var router = express.Router();
var app = express();

router.use(function(req,res,next){
  console.log('check for token valid? ' +auth.hasValidSession(req) );
  if (auth.hasValidSession(req)) {
      console.log('valid session');
      console.log('User:'+auth.user);
      next();
  } else {
    console.log('invalid session');
    // console.log(next);
    next(res.sendStatus(403).send('Forbidden'));
  }
});

/* GET Secure resource */
router.get('/', function(req, res, next) {
  console.log('Accessing the secure section ...'+path.join(__dirname + '/secure.html'))
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

router.get('/token_data', function(req, res, next) {
  //console.log('Accessing the secure section ...'+path.join(__dirname + '/secure.html'))
  console.log('Accessing the secure section ...'+auth.getUserToken(req));
  res.json({"authToken":auth.getUserToken(req)});
});

/* GET Secure resource for data */
router.get('/data', function(req, res, next) {
  console.log('Accessing the secure section ...'+path.join(__dirname + '/index.html'));
  res.json(req.app.get('connectedDeviceConfig'));
});

module.exports = router;

