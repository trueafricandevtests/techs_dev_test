<?php
header("Content-Type: application/json; charset=UTF-8");

$json = file_get_contents('../data.json');

$jsonData = json_decode($json,true);

//Finding the post code with the most delivered recipes
$busiestPostCodes = array_count_values(array_column($jsonData,'postcode'));
$keyWithMaxValue = array_keys($busiestPostCodes,max($busiestPostCodes));
foreach($busiestPostCodes as $key => $value){
    if($key === $keyWithMaxValue[0]){
        $busiestPostCode = array("busiest_postcode"=>["postcode"=>$key ,"delivery_count"=>$value]);
    }
}
print_r(json_encode($busiestPostCode));