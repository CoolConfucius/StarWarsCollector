'use strict'; 

$(document).ready(init); 

var $name, $description, $price, $purchaseBy, $imageurl, $category, $add;

function init() {
  // $name = $('#name'); 
  // $description = $('#description'); 
  // $price = $('#price'); 
  // $purchaseBy = $('#purchaseBy'); 
  // $imageurl = $('#imageurl'); 
  // $category = $('#category'); 
  // $add = $('#add'); 

  $('#add').click(addCharacter); 
  $('#search').click(search); 

}

function search(){
  var text = $('#input').val();
  $.get('/sw/people', function( data ) {
    console.log(data, "data");
    location.replace('/sw/people/');
    console.log(data.body, "DATA BODY!!!");
  });
}




function addCharacter() {
  console.log("addCharacter");
  var name = $('#name').text(); 
  var find = $(this).data('find'); 
  // alert("Find"+ find);
  
  // $.post('/sw/add', {
  //   name: name, find: find
  // })
  // .success(function(data) {
  //   location.replace('/');
  // })
  // .fail(function(err) {
  //   alert('Error. Check console.');
  //   console.error("Error:", err);
  // });

  $.ajax({
    url: "/sw/add",
    method: "PUT",
    data: {
    name: name, find: find, addedAt: Date.now()
  }
  })
  .success(function(data) {
    location.replace('/users/profile');
  })
  .fail(function(err) {
    alert('Error. Check console.');
    console.error("Error:", err);
  });;

}