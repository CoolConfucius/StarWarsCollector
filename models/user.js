'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var userSchema = new mongoose.Schema({
  uid: String,
  email: String,
  swchars: [{
    name: String, 
    find: String
  }]
});

// instance method
userSchema.methods.generateToken = function() {
    // console.log("Payload this: ", this);
  var payload = {
    uid: this.uid,
    _id: this._id, 
    email: this.email
  };
  var token = jwt.encode(payload, JWT_SECRET);

  return token;
};

var User = mongoose.model('User', userSchema);

module.exports = User;
