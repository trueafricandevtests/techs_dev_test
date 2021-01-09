<?php
require("Processor.php");
$data_reference = file_get_contents("data.json");
$data = json_decode($data_reference, true);

$processor = new Processor($data);

if (isset($_GET['endpoint'])) {

    $endpoint = $_GET['endpoint'];

    if ($endpoint === 'count_per_recipe') {
        echo json_encode(array("count_per_recipe" => $processor->get_count_per_recipe()));
    }

    if ($endpoint === 'unique_recipe_count') {
        echo json_encode($processor->get_unique_recipe_count());
    }

    if ($endpoint === 'busiest_postcode') {
        echo json_encode(array("busiest_postcode" => $processor->get_busiest_postcode()));
    }

    if ($endpoint === 'match_by_name') {
        if (isset($_GET['name'])) {
            $name = $_GET['name'];
            echo json_encode(array("match_by_name" => $processor->match_by_name($name)));
        } else {
            echo "Please pass a search term like : domain/index.php?endpoint=match_by_name&name=''";
        }
    }
} else {
    $base_url = "http://127.0.0.1/index.php?endpoint=";
    echo '
    <h1>Small Stats API</h1>
    The list of all the callable endpoints.
    <ol>
    <li>   <a href="' . $base_url . 'count_per_recipe">Get count per recipe</a> </li>  
    <li>   <a href="' . $base_url . 'unique_recipe_count">Get total of unique recipes</a></li> 
    <li>   <a href="' . $base_url . 'busiest_postcode">Get busiest postcode</a></li> 
    <li>   <a href="' . $base_url . 'match_by_name&name=Potato">Get all recipes with Potato. Change the name get attribute for different results</a></li> 
    </ol>
    ';
}
