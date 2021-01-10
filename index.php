<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="api-interview" content="True Africa Software Developer Interview Test">
    <title>Fred Musisi - True Dev Test</title>
  </head>
  
  <body>
    <h1 id="true-title">True Dev Interview</h1>
    <div id="request_buttons">
  <button  onclick="getJsonObject('api/index.php?q=unique_recipe_count')">Unique Recipe Count</button>
  <button onclick="getJsonObject('api/index.php?q=count_recipe_occur')">Count Recipe Occurance</button>
  <button onclick="getJsonObject('api/index.php?q=busy_post_code')">Busiest Post Code </button>
  <form id="search_form" action="" method="get" accept-charset="utf-8">
    <input type="checkbox" name="search_item" id="Potato" value="potato" />Potato <br />
    <input type="checkbox" name="search_item" id="Veggie" value="veggie"/>Veggie <br />
    <input type="checkbox" name="search_item" id="pasta" value="pasta" />Pasta<br />
    <button id="search_btn" >Search</button>
  </form>
    </div>
    <div class="" id="ajax_content">
      
    </div>
    
      <script type="text/javascript" charset="utf-8">
      function getJsonObject(path){
      
      var xhr = new XMLHttpRequest();

     xhr.open('GET', path);

     xhr.responseType = 'json';

     xhr.send();

   xhr.onload = function() {
  var responseObject = xhr.response;

document.getElementById('ajax_content').innerHTML =  JSON.stringify(responseObject.message) ; 
 
   }
	}
 
 
 document.getElementById("search_btn").addEventListener("click", function(event){event.preventDefault()
 
  var checkboxes = document.getElementsByName("search_item");
  var checkboxesChecked = [];
 
  for (var i=0; i<checkboxes.length; i++) {
   
     if (checkboxes[i].checked) {
       
        checkboxesChecked.push(checkboxes[i].value);
     }
  }

  if(checkboxesChecked.length > 0 ){
    
  var data = JSON.stringify(checkboxesChecked);
  }
  else{
    var data = false;
  }
 
   if(data){
     var xhr = new XMLHttpRequest();

     xhr.open('GET', "api/index.php?q=search&data="+data);

     xhr.responseType = 'json';

     xhr.send();

   xhr.onload = function() {
   var responseObject = xhr.response;
   
   document.getElementById('ajax_content').innerHTML = JSON.stringify(responseObject.message) ; 
 
   }
   
   }else{
     document.getElementById('ajax_content').innerHTML = "Please select at least one search item" ;
   }
});
 
  </script>
  </body>

</html>