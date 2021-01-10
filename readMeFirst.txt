Instructions

1. Install the latest php version on computer.
2. Check php version installed on computer.
3. Run php -S localhost:<port_number> without angle brackets to start php server

The api endpoints are as follows:

1. localhost:port_number/api/count_unique_recipenames.php
   Gets the number of unique recipe names. 

2. localhost:port_number/api/busiest_postcode.php
   Gets the number of occurences for each unique recipe name (alphabetically ordered by recipe name)

3. localhost:port_number/api/total_unique_recipes.php
   Finds the postcode with most delivered recipes.

4. localhost:port_number/api/search_recipe_by_keyword.php?keyword=<your keyword> 
   To search for a keyword in recipe type on your browser without angle brackets 

5. localhost:port_number/api/search_recipe_by_keyword.php
   To list the recipe names (alphabetically ordered) that contain in their name one of the following words: type 

 