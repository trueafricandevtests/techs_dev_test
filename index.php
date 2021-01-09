<?php
require("Processor.php");
$data_reference = file_get_contents("data.json");
$data = json_decode($data_reference, true);

$processor = new Processor($data);

?>


<html>

<body>
    <h1>Count per recipe</h1>
    <pre>
    <?php
    print_r($processor->get_count_per_recipe());

    ?>
</pre>


    <h1>Count per recipe</h1>
    <pre>
    <?php
    print_r($processor->get_unique_recipe_count());

    ?>
</pre>

</body>

</html>