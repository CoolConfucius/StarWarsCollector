var express = require('express');
var router = express.Router();
var request = require('request'); 

var authMiddleware = require('../config/auth');
console.log("swjs");

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
  var swPerson = 'http://swapi.co/api/people/' + req.params.num;
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
            state: "person"
          }); 
        };
      });      
    };
  });
});







router.post('/', function(req, res, next) {
  // add sw to user
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
