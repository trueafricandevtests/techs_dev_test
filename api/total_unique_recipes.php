<?php
header("Content-Type: application/json; charset=UTF-8");

$json = file_get_contents('../data.json');
$jsonData = json_decode($json,true);

//Counting the unique recipes from json data provided
$uniqueRecipes = array_unique(array_column($jsonData,'recipe'));
$uniqueRecipesCount = ["unique_recipe_count" => count($uniqueRecipes)];
print_r(json_encode($uniqueRecipesCount));