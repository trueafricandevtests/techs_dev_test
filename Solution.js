import { jasonData } from "./Data";


//Snippet to const the number of  unique recipe names
const res = jasonData.filter(o => !this[o.recipe] && (this[o.recipe]=true), {});
    console.log(res.length);

 // Count the number of occurences for each unique recipe
 const result = jasonData.reduce( (acc, o) => (acc[o.recipe] = (acc[o.recipe] || 0)+1, acc), {} );   
  console.log(result);

//Find the postcode with most delivered recipes.

let maxpostcode = jasonData.reduce((maxId, item) => Math.max(maxId, parseInt(item.postcode)) , 0);
    console.log(maxpostcode)

// List the recipe names (alphabetically ordered) that contain in their name one of the following words:

//- Potato
const array = jsonData.filter(item => item.recipe==='potato');
    console.log(array)
//- Veggie
const array1 = jsonData.filter(item => item.recipe==='Veggie');
    console.log(array1)
//- Mushroom
const array2 = jsonData.filter(item => item.recipe==='Mushroom');
    console.log(array2)


