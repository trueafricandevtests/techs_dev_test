Mini documetation of the project:
* The project can be run simply using >node index.js

a) Counting the number of unique recipe names
--------------------------------------------------------------------
1. Start by importing the file module. This will be used to load the json file give,
as well as writing to files to show required outputs.

const fs = require('fs')

2. Create a fnction to load the data give - loadJsonData().
The data is then converted to a string using .toString().

3. Create a function saveJsonData()
This will be used to write to files using writeFileSync

4. Create a data variable that will be the global variable providing access to the 
json file to be used in the project

const data = loadJsonDta('data.json');

5. Count the number of Unique names.
The set() object is used that stores unique values.
add() appends a value to the Set.

6. Unique Recipes count is stored to the uniqueRecipes.json file generated



b) Counting the number of occurences for each unique recipe names 
--------------------------------------------------------------------
1. If a recipe is unique, then it should have a count = 1.

2. Create a list, that will map throught the data to find and give count of recipes
that are unique.

3. Unique recipe count is stored to the numberOfOccurrence.json file generated.



c) Finding the postcode with most delivered recipes
---------------------------------------------------------------------
1. Create an empty object that will hold the postcodes which will be iterated through
to give the postcode with the highest occurrence. mapPostcodes{}.

2. Loop throught the array 'highOccur' to obtain the postcode with highest occurrence 
'maxValue', and the number of post counts 'maxPostCount' that it has.

3. This is stored to the busiest_postcode.json file generated.



d) Listing recipe names which contain atleast one of the given words
---------------------------------------------------------------------
1. Map through the data given to find all the key words in the recipe names.

2. Split method is used to divide the string into an ordered list, thereby creating
and returning an array which include the keywords : 'Potato', 'Veggie', 'Mushroom'.

3. newMapped() is used to filter through the array, and a sort is applied to find the 
items







