'use strict';

var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
  name: { type: String}, 
  find: { type: String}, 
  addedAt: { type: Date, default: Date.now() }
});

var Character = mongoose.model('Character', characterSchema); 

module.exports = Character; 