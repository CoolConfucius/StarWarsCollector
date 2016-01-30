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

  // $add.click(addProduct); 
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




// function addProduct() {
//   console.log("addProduct");
//   var name = $name.val();
//   var description = $description.val();
//   var price = $price.val();
//   var purchaseBy = $purchaseBy.val();
//   var imageurl = $imageurl.val();
//   var category = $category.val();
  
//   $.post('/products', {
//     name: name, description: description, price: price,
//     purchaseBy: purchaseBy, imageurl: imageurl, category: category
//   })
//   .success(function(data) {
//     location.replace('/');
//   })
//   .fail(function(err) {
//     alert('Error. Check console.');
//     console.error("Error:", err);
//   });
// }