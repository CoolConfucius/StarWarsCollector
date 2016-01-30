var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

/* GET home page. */
router.get('/', authMiddleware, function(req, res, next) {
  console.log("User: ", req.user);
  res.render('index', { title: "Star Wars Collector", user: req.user});
});

router.get('/login', function(req, res, next) {
  res.render('form', {state: 'login', title: "Login"});
});

router.get('/register', function(req, res, next) {
  res.render('form', {state: 'register', title: "Register"});
});

router.get('/secret', authMiddleware, function(req, res, next) {
  console.log('req.user:', req.user);
  res.send('Wooo!  Secret stuff!!!');
});

router.get('/addChar', authMiddleware, function(req, res, next) {
  res.render('addChar', { title: "Star Wars Collector", user: req.user});
})

module.exports = router;
