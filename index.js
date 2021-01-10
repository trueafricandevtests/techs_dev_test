const { count } = require('console');
const fs = require('fs')

// a) Function to load json data
function loadJsonData(filename){
    return JSON.parse(
        fs.existsSync(filename) 
            ? fs.readFileSync(filename).toString() 
            : '" "'
    )
}

// b) function to save json data 
function saveJosnData(filename, gotData){
    return fs.writeFileSync(filename, JSON.stringify(gotData, null, 2))
}

// Main data pool
const data = loadJsonData('data.json');

// count the number of unique recipe names
const uniqueNames = new Set();
data.forEach(recipe => {uniqueNames.add(recipe.recipe)})

console.log(uniqueNames.size)
// const a = [...uniqueNames]

const uniqueRecipesTosave = {"unique_recipe_count": uniqueNames.size}

// b) Coun number of occurrences
const unique = [];
const newData = data.map(item => {
    // console.log(item.recipe === "Mediterranean Baked Veggies")
    if (unique.includes(item.recipe)){
        item["count"] += 1
        return item
    } 
    unique.push(item.recipe)
    item["count"] = 1
    return  item
})

// c) Finding postcode with most delivered recipes
let mapPostcodes = {}
let maxValue = 0;
let maxPostCount = 0;
const highOccur = data.map(value => value.postcode)

// loop through the array
for(let item of highOccur){
    if(mapPostcodes[item] == null){
        mapPostcodes[item] = 1;
    }else{
        mapPostcodes[item]++
    }

    if(mapPostcodes[item] > maxPostCount){
        maxValue = item;
        maxPostCount = mapPostcodes[item];
    }
}
// console.log(`value : ${maxValue}, Count : ${maxPostCount}`)

const busiest_postcode = {
    "busiest_postcode": {
        "postcode" : maxValue,
        "delivery_count" : maxPostCount

    }
}

// d) List recipe names that contain in their name one of the following words
const someKeyWords = data.map(keywords => keywords.recipe)
const containsRecipes = (string) => {
    let newString = string.split(" ")
    return newString.includes("Potato") || newString.includes("Veggie") || newString.includes("Mushroom") 
}
const newMaped = () => someKeyWords.filter(containsRecipes)

const ListOfRecipeWords = {
    "match_by_name": newMaped().sort()
}

// outputs
saveJosnData('uniqueRecipes.json',uniqueRecipesTosave)        // counts number of recipe names
saveJosnData('numberOfOccurrence.json', newData)              // counts number of occurences of @unique recipe
saveJosnData('busiest_postcode.json', busiest_postcode)      // Finds postcode with most delivered recipes
saveJosnData('keyWordList.json', ListOfRecipeWords)          // Listing of recipe names that match


// const xc = {...uniqueRecipesTosave, ...newData, ...busiest_postcode, ...ListOfRecipeWords}
// saveJosnData('all.json', xc)