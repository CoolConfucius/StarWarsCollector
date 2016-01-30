'use strict';

var obj = {}; 

$(function() {
  obj.email = $('#email');
  obj.password = $('#password');
  obj.password2 = $('#password2');
  obj.newpassword = $('#newpassword'); 
  
  var $go = $('#go');
  
  if ($go.hasClass('changepassword')){
    obj.state = 'changepassword'
  } else {
    obj.state = $go.hasClass('register') ? 'register' : 'login';
  }
  
  $('form').on('submit', go);
});

function go(e) {
  e.preventDefault();
  var email = obj.email.val();
  var password = obj.password.val();
  var password2 = obj.password2.val();
  var newpassword = obj.newpassword.val();

  if(obj.state === 'register' && password !== password2) {
    $('.password').val('');
    return alert('Passwords must match.');
  }

  if (obj.state === "changepassword") {
    obj.url = '/users/changepassword'; 
  } else {
    obj.url = obj.state === "register" ? '/users/register' : '/users/login'; 
  }

  $.post(obj.url, {email: email, password: password, newpassword: newpassword})
  .success(function() {
    location.href = obj.state === "register" ? '/login' : '/';
  })
  .fail(function(err) {
    alert('Error.  Check console.');
    console.log('err:', err);
  });
}
