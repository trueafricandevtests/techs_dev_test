<?php 
//
/**
 * Logger function used in testing and debugging of php code.
 * @params $data, $comment
 * @returns => written data to Logged.json file inside the api folder
 * */
function Logger($data, $comment = " Default comment"){
  $fp = fopen("Logged.json", 'a');
  
 $data = [
    "data" => $data, 
   "comment" => $comment
   ];
  $d = json_encode($data);
  fwrite($fp, $d);
  
  fclose($fp);
}

// check if the url contained a query string "q" which specifies the api end point
if(isset($_GET['q'])){
  // assign it to query variable 
  $query = $_GET['q'];
  // initialize the data array
  $data = [];
  
  //if query string is equal to search, perform the search operation and assign data to the empty data array.
  if($query == 'search'){
    
    //Exit if no query data has been passed along with the search end point query string
    if(!$_GET['data']){
      exit();
    }
    //Else convert query data to an array
    $dataItemsArray = json_decode($_GET['data']);
    //Check size of the array
    $size = sizeof($dataItemsArray);
    
    //if size is false or equal to zero, exit
    if(!$size){
      exit();
    }
    //if search item is equal to one, prepare to search for that single item
    if($size == 1){
      $dataQuery = $dataItemsArray[0];
      
      //Else convert the search keys into a single string
    }else{
      $dataQuery = implode("|",$dataItemsArray);
    }
    
    
    // Create a search pattern 
   $pattern = '/'. $dataQuery .'/i';
  
  //Read file content
    $dataFromFile = file_get_contents("../data.json");
    
    // Convert read data to an array
      $arrayData = json_decode($dataFromFile, true);
      
      //initialize empty arrays for use in search operation
       $matches = array ();
       $matched = array();
       
       // Loop through each array object searching for the pattern specified
     foreach ($arrayData as $singleData){
  
         if (preg_match_all($pattern, $singleData["recipe"], $matches)){
           
           //store the recipe name if a match is found on that item
           if($matches){
             array_push($matched,$singleData['recipe']);
           }
}
}

//Function for sorting the recipes searched 
function sort_data( $array )
{
  // Sort it
  sort($array);

  // return sorted array
  return $array;
}
// Assign search results to data array and return the search results.

    $data = [
      "status" => 200,
      "message" => [
        "matched_by_name" => sort_data($matched) 
        ]
      ];
  }
  
  //if the string query end point is equivalent to unique_recipe_count, process this code
  if($query == "unique_recipe_count"){
    
    //Read file content
   $dataFromFile = file_get_contents("../data.json");
   
       // Convert read data to an array
      $arrayData = json_decode($dataFromFile, true);
      //get unique recipe names 
    $countUnique = array_count_values(array_column($arrayData, 'recipe'));
    
    //count the unique recipe names
     $totalUnique = sizeof($countUnique);
   
   // Assign search results to data array and return the count
    $data = [
      "status" => 200,
      "message" => [
            "unique_recipe_count" => $totalUnique
        ]
      ];
  }
  
  
  //if query string is equivalent to count_recipe_occur, process this code.
  if($query == "count_recipe_occur"){
    
      //Read file content
    $dataFromFile = file_get_contents("../data.json");
    
    
    // Convert read data to an array
      $arrayData = json_decode($dataFromFile, true);
      
     //Get each recipe with the number of times it appears in the array
    $countUnique = array_count_values(array_column($arrayData, 'recipe'));
    //initialize array to staore new structured data
    $countedRecipe = array();
    
    
    //loop through the areay of data from read file
    foreach ($countUnique as $name => $countTotal){
      
      //structure each array item
     $newData = [
     "recipe" => $name,
     "count" => $countTotal
     ];
     
     //add structured item to the final array
      $countedRecipe[] = $newData;
    }
   
       // Assign search results to data array and return the data
    $data = [
      "status" => 200,
      "message" => [
        "count_per_recipe" => $countedRecipe
        ]
      ];
  }
  
  
  
  if($query == "busy_post_code"){
    
    $dataFromFile = file_get_contents("../data.json");
      $arrayData = json_decode($dataFromFile, true);
      
    //Extract postcodes from the read data array
   $countPostCode  = array_count_values(array_column($arrayData, 'postcode'));
   
   //Get unique postcodes 
     $uniqueCodes = array_unique($countPostCode);
     
    //Get the last value of the unique postcode array
     $postCode = array_search(sizeof($uniqueCodes),$uniqueCodes);
    
    //Get last key of the unique postcode array
    $deliveryArray = array_slice($uniqueCodes,sizeof($uniqueCodes)-1);
    
//Get number of times the postcode got deliveries
    $deliveryCounts = $deliveryArray[0];
    
 // Assign results to data array and return the data
    $data = [
      "status" => 200,
      "message" =>  [
       "busiest_postcode" => [
          "postcode" => $postCode,
         "delivery_count" => $deliveryCounts
   ]
   ]
    ];
     
  }
  //If no end point specified in the query string, return 404 error
}else{
  $data =[
    'status' => 404,
    'message' => "End point requested cannot be located on this server"
    ];
    


}
echo json_encode($data);

?>