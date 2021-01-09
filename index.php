<?php
require("Processor.php");
$data_reference = file_get_contents("data.json");
$data = json_decode($data_reference, true);

$processor = new Processor($data);
