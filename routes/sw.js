var express = require('express');
var router = express.Router();
var request = require('request'); 

var authMiddleware = require('../config/auth');
var User = require('../models/user');
var Character = require('../models/character');

var next; 
var everyone = []; 

router.use(authMiddleware);

/* GET home page. */
router.get('/people/:page', function(req, res, next) {
  // show sw by page
  var swPeople = 'http://swapi.co/api/people/?page=' + req.params.page;
  request(swPeople, function( error, response, body) {
    if (!error && response.statusCode === 200) {
      res.render('results', {
        people: JSON.parse(body).results, 
        title: "Showing Star Wars characters",
        page: req.params.page, 
        user: req.user, 
        state: "people"
      }); 
    };
  });
});

router.get('/person/:num', function(req, res, next) {
  var find = req.params.num;
  var swPerson = 'http://swapi.co/api/people/' + find;
  request(swPerson, function( error, response, body) {
    if (!error && response.statusCode === 200) {
      var parsed = JSON.parse(body); 
      request(parsed.homeworld, function(error, response, body1){
        if (!error && response.statusCode === 200) {
          var homeworld = JSON.parse(body1).name;
          var films = film(parsed.films); 
          res.render('results', {
            person: parsed,  
            homeworld: homeworld, 
            films: films, 
            title: "Showing Star Wars character:",
            user: req.user, 
            state: "person", 
            find: find 
          }); 
        };
      });      
    };
  });
});


// add sw to user
// router.post('/add', function(req, res) {
//   console.log("req.user", req.user);

//   var character = new Character(req.body); 
//   console.log("character: ", character);
//   character.save(function(err, savedCharacter) {
//     res.status(err ? 400 : 200).send(err || savedCharacter);
//   });
// });

router.put('/add', function(req, res) {
  User.findById(req.user._id, function(err, user) {
    var character = new Character(req.body); 
    // character.save(function(err, savedCharacter) {
    //   res.status(err ? 400 : 200).send(err || savedCharacter);
    // });
    user.swchars.push(character);
    user.save(function(err, savedUser) {
      res.status(err ? 400 : 200).send(err || savedUser); 
    });
  });
});

router.put('/remove', function(req, res) {
  User.findById(req.user._id, function(err, user) {
    console.log("Remove req body:", req.body);
    var splice_index; 
    user.swchars.forEach(function(entry, index){
      if (entry._id === req.body._id) {
        splice_index = index; 
      };
    });
    if (splice_index) {
      user.swchars.splice(splice_index, 1); 
    };
    user.save(function(err, savedUser) {
      res.status(err ? 400 : 200).send(err || savedUser); 
    });
  });
});



function film(array){
  return array.map(function(entry){
    var number = entry.split('/')[5];
    console.log("number", number);
    var title; 
    switch(number) {
      case '1':
        title = "A New Hope";
        break; 
      case '2':
        title = "The Empire Strikes Back";
        break; 
      case '3':
        title = "Return of the Jedi";
        break; 
      case '4':
        title = "The Phantom Menace";
        break; 
      case '5':
        title = "Attack of the Clones";
        break; 
      case '6':
        title = "Revenge of the Sith";
        break; 
      case '7':
        title = "The Force Awakens";
        break; 
    };
    return title; 
  });
}






module.exports = router;
