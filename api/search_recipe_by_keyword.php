<?php
header("Content-Type: application/json; charset=UTF-8");

$json = file_get_contents('../data.json');
$jsonData = json_decode($json,true);
$recipes = array_column($jsonData,'recipe');

if(isset($_GET['keyword']) && $_GET['keyword'] !== ""){
    // Filter recipes containing the keyword entered by user
    $recipesFound = searchKeyWordInRecipe($_GET["keyword"],$recipes);
    sort($recipesFound); // sorting the recipes in alphabetic order
    $matchByName = array("match_by_name" => $recipesFound);
    print_r(json_encode($matchByName));
}else{
    // Filter recipes containing the name potato,Veggie and Mushroom
    $potatoRecipe = searchKeyWordInRecipe("Potato",$recipes); 
    $veggieRecipe = searchKeyWordInRecipe("Veggie",$recipes);
    $mushRoomRecipe = searchKeyWordInRecipe("Mushroom",$recipes);
    $result = array_merge($veggieRecipe,$potatoRecipe,$mushRoomRecipe); //merging all recipes into one array
    sort($result); // sorting the recipes in alphabetic order
    $matchByName = array("match_by_name" => $result);
    print_r(json_encode($matchByName));
}

function searchKeyWordInRecipe($searchWord,$array){
    return array_values(array_unique(array_filter($array, function($key) use($searchWord){
        if(stristr($key,$searchWord)){
            return $key;
        }
    },ARRAY_FILTER_USE_BOTH)));
}


