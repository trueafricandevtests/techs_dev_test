<?php
header("Content-Type: application/json; charset=UTF-8");

$json = file_get_contents('../data.json');

$jsonData = json_decode($json,true);

//Counting the unique recipes from json data provided
$uniqueRecipes = array_unique(array_column($jsonData,'recipe'));
$uniqueRecipesCount = ["unique_recipe_count" => count($uniqueRecipes)];
// print_r(json_encode($uniqueRecipesCount));

//Counting the unique recipes from json data provided
$allRecipes = array_count_values(array_column($jsonData,'recipe'));
$temp = [];
foreach($allRecipes as $key => $value){
    $temp[] = ["recipe"=>$key,"count"=>$value];
}
sort($temp);
$uniqueRecipesCounts = array("count_per_recipe" =>$temp);

print_r(json_encode($uniqueRecipesCounts));  
